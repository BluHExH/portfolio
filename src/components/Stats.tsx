import { useEffect, useMemo, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const USER = 'BluHExH'

type GhUser = {
  public_repos: number
  followers: number
  following: number
  created_at: string
  avatar_url: string
  bio: string | null
  name: string | null
  html_url: string
}

type Activity = { id: string; type: string; repo: string; date: string; detail: string }
type LangRow = { name: string; bytes: number; pct: number }

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  C: '#555555',
  'C++': '#F34B7D',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#DEA584',
}

function StatCard({ label, value, active }: { label: string; value: number; active: boolean }) {
  const n = useCountUp(value, active, 1400)
  return (
    <div className="stat-card card">
      <div className="stat-num">{n}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function formatEvent(e: any): Activity | null {
  const repo = e.repo?.name?.replace(`${USER}/`, '') || e.repo?.name || 'repo'
  const date = (e.created_at || '').slice(0, 10)
  const id = e.id
  switch (e.type) {
    case 'PushEvent': {
      const commits = e.payload?.commits?.length || e.payload?.size || 1
      return { id, type: 'Push', repo, date, detail: `Pushed ${commits} commit${commits > 1 ? 's' : ''}` }
    }
    case 'CreateEvent':
      return { id, type: 'Create', repo, date, detail: `Created ${e.payload?.ref_type || 'repo'}` }
    case 'ForkEvent':
      return { id, type: 'Fork', repo, date, detail: 'Forked repository' }
    case 'WatchEvent':
      return { id, type: 'Star', repo, date, detail: 'Starred repository' }
    case 'IssuesEvent':
      return { id, type: 'Issue', repo, date, detail: `${e.payload?.action || 'updated'} issue` }
    case 'PullRequestEvent':
      return { id, type: 'PR', repo, date, detail: `${e.payload?.action || 'updated'} pull request` }
    case 'PublicEvent':
      return { id, type: 'Public', repo, date, detail: 'Made repository public' }
    default:
      return { id, type: String(e.type || 'Event').replace('Event', ''), repo, date, detail: String(e.type || '').replace('Event', '') }
  }
}

export default function Stats() {
  const { ref, inView } = useInView(0.12)
  const [user, setUser] = useState<GhUser | null>(null)
  const [stars, setStars] = useState(0)
  const [forks, setForks] = useState(0)
  const [langs, setLangs] = useState<LangRow[]>([])
  const [topRepos, setTopRepos] = useState<{ name: string; stars: number; lang: string; url: string }[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [uRes, rRes, eRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${USER}/events/public?per_page=15`),
        ])
        if (!uRes.ok) throw new Error('user')
        const u: GhUser = await uRes.json()
        const repos: any[] = rRes.ok ? await rRes.json() : []
        const events: any[] = eRes.ok ? await eRes.json() : []

        const own = Array.isArray(repos) ? repos.filter((r) => !r.fork) : []
        const totalStars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0)
        const totalForks = own.reduce((s, r) => s + (r.forks_count || 0), 0)

        const langMap: Record<string, number> = {}
        for (const r of own) {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1
        }
        const langTotal = Object.values(langMap).reduce((a, b) => a + b, 0) || 1
        const langRows = Object.entries(langMap)
          .map(([name, bytes]) => ({ name, bytes, pct: (bytes / langTotal) * 100 }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 6)

        const tops = [...own]
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 5)
          .map((r) => ({
            name: r.name,
            stars: r.stargazers_count || 0,
            lang: r.language || 'Code',
            url: r.html_url,
          }))

        const acts = events.map(formatEvent).filter(Boolean) as Activity[]
        const seen = new Set<string>()
        const unique: Activity[] = []
        for (const a of acts) {
          const key = `${a.type}-${a.repo}-${a.detail}`
          if (seen.has(key)) continue
          seen.add(key)
          unique.push(a)
          if (unique.length >= 8) break
        }

        if (!cancelled) {
          setUser(u)
          setStars(totalStars)
          setForks(totalForks)
          setLangs(langRows)
          setTopRepos(tops)
          setActivity(unique)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const years = user
    ? Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear())
    : 1

  const cards = useMemo(() => [
    { label: 'Public repos', value: user?.public_repos ?? 0 },
    { label: 'Total stars', value: stars },
    { label: 'Followers', value: user?.followers ?? 0 },
    { label: 'Years on GitHub', value: years },
  ], [user, stars, years])

  return (
    <section id="stats" className="section gh-stats" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>GitHub · Live API</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Stats & activity</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          Custom dashboard powered by the GitHub API — no third-party image cards.
        </p>

        <div className={`stats-grid stagger ${inView ? 'visible' : ''}`}>
          {cards.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} active={inView && !loading} />
          ))}
        </div>

        <div className={`gh-panels stagger ${inView ? 'visible' : ''}`}>
          <div className="card panel">
            <div className="profile-row">
              {user?.avatar_url && (
                <img className="avatar" src={user.avatar_url} alt={USER} width={56} height={56} />
              )}
              <div>
                <h3 className="panel-title tight">{user?.name || USER}</h3>
                <p className="profile-bio">{user?.bio || 'Open source · Security · Builder'}</p>
                <a className="gh-link" href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer">
                  github.com/{USER} →
                </a>
              </div>
            </div>
            <div className="mini-grid">
              <div className="mini"><span className="mini-n">{user?.following ?? 0}</span><span className="mini-l">Following</span></div>
              <div className="mini"><span className="mini-n">{forks}</span><span className="mini-l">Forks</span></div>
              <div className="mini"><span className="mini-n">{langs.length}</span><span className="mini-l">Languages</span></div>
              <div className="mini"><span className="mini-n">{stars}</span><span className="mini-l">Stars</span></div>
            </div>
          </div>

          <div className="card panel">
            <h3 className="panel-title">Top languages</h3>
            {loading && <p className="muted">Loading…</p>}
            {!loading && langs.length === 0 && <p className="muted">No language data</p>}
            <div className="lang-list">
              {langs.map((l) => (
                <div key={l.name} className="lang-row">
                  <div className="lang-head">
                    <span className="lang-dot" style={{ background: LANG_COLORS[l.name] || '#FF5A1F' }} />
                    <span className="lang-name">{l.name}</span>
                    <span className="lang-pct">{l.pct.toFixed(1)}%</span>
                  </div>
                  <div className="lang-bar">
                    <i style={{ width: `${l.pct}%`, background: LANG_COLORS[l.name] || '#FF5A1F' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card panel">
            <h3 className="panel-title">Top repositories</h3>
            <ul className="repo-list">
              {topRepos.map((r) => (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="repo-link">
                    <span className="repo-name">{r.name}</span>
                    <span className="repo-meta">
                      <span>{r.lang}</span>
                      <span>★ {r.stars}</span>
                    </span>
                  </a>
                </li>
              ))}
              {!loading && topRepos.length === 0 && <li className="muted">No repos found</li>}
            </ul>
          </div>

          <div className="card panel">
            <div className="activity-head">
              <h3 className="panel-title tight">Recent activity</h3>
              <span className="live-dot" />
            </div>
            {loading && <p className="muted">Loading activity…</p>}
            {error && !loading && <p className="muted">Could not load GitHub data right now.</p>}
            {!loading && !error && (
              <ul className="activity-list">
                {activity.map((a) => (
                  <li key={a.id} className="activity-item">
                    <span className={`badge badge-${a.type.toLowerCase()}`}>{a.type}</span>
                    <div className="activity-body">
                      <a
                        href={`https://github.com/${USER}/${a.repo.includes('/') ? a.repo.split('/')[1] : a.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="activity-repo"
                      >
                        {a.repo.includes('/') ? a.repo.split('/')[1] : a.repo}
                      </a>
                      <span className="activity-detail">{a.detail}</span>
                    </div>
                    <span className="activity-date">{a.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 36px; }
        .stat-card { text-align: center; padding: 28px 16px; }
        .stat-num { font-size: clamp(32px, 4vw, 42px); font-weight: 800; color: var(--accent); letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
        .gh-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px; }
        .panel { padding: 22px; }
        .panel-title { font-size: 15px; font-weight: 700; margin-bottom: 14px; color: var(--text); }
        .panel-title.tight { margin-bottom: 6px; }
        .profile-row { display: flex; gap: 14px; align-items: flex-start; margin-bottom: 18px; }
        .avatar { width: 56px; height: 56px; border-radius: 14px; border: 1px solid var(--border); }
        .profile-bio { font-size: 13px; color: var(--text-secondary); margin: 4px 0 8px; line-height: 1.5; }
        .gh-link { font-size: 13px; font-weight: 600; color: var(--accent); }
        .gh-link:hover { text-decoration: underline; }
        .mini-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .mini { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 10px; padding: 12px 8px; text-align: center; }
        .mini-n { display: block; font-size: 18px; font-weight: 800; color: var(--text); }
        .mini-l { font-size: 11px; color: var(--text-muted); }
        .lang-list { display: flex; flex-direction: column; gap: 12px; }
        .lang-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .lang-dot { width: 8px; height: 8px; border-radius: 50%; }
        .lang-name { font-size: 13px; font-weight: 600; color: var(--text); }
        .lang-pct { margin-left: auto; font-family: var(--mono); font-size: 12px; color: var(--text-muted); }
        .lang-bar { height: 6px; background: #262628; border-radius: 99px; overflow: hidden; }
        .lang-bar i { display: block; height: 100%; border-radius: 99px; transition: width 0.8s ease; }
        .repo-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .repo-link { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--border); background: rgba(255,255,255,0.02); transition: border-color 0.2s; }
        .repo-link:hover { border-color: var(--accent); }
        .repo-name { font-size: 13px; font-weight: 600; color: var(--text); }
        .repo-meta { display: flex; gap: 12px; font-size: 12px; color: var(--text-muted); }
        .activity-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; animation: livePulse 2s infinite; }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.45); }
          70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
        .activity-list { list-style: none; display: flex; flex-direction: column; max-height: 280px; overflow-y: auto; }
        .activity-item { display: grid; grid-template-columns: auto 1fr auto; gap: 10px; align-items: start; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .activity-item:last-child { border-bottom: none; }
        .badge { font-family: var(--mono); font-size: 10px; font-weight: 600; text-transform: uppercase; padding: 3px 7px; border-radius: 6px; background: var(--accent-soft); color: var(--accent); white-space: nowrap; }
        .badge-push { background: rgba(96,165,250,0.12); color: #60A5FA; }
        .badge-create { background: rgba(74,222,128,0.12); color: #4ADE80; }
        .badge-star { background: rgba(250,204,21,0.12); color: #FACC15; }
        .badge-pr { background: rgba(192,132,252,0.12); color: #C084FC; }
        .activity-repo { display: block; font-size: 13px; font-weight: 600; color: var(--text); }
        .activity-repo:hover { color: var(--accent); }
        .activity-detail { display: block; font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .activity-date { font-family: var(--mono); font-size: 11px; color: var(--text-muted); white-space: nowrap; }
        .muted { font-size: 13px; color: var(--text-muted); }
        @media (max-width: 900px) { .gh-panels { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .mini-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  )
}
