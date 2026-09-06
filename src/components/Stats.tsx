import { useEffect, useState } from 'react'
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
}

type Activity = {
  id: string
  type: string
  repo: string
  date: string
  detail: string
}

function StatCard({ label, value, suffix, active }: { label: string; value: number; suffix?: string; active: boolean }) {
  const n = useCountUp(value, active, 1400)
  return (
    <div className="stat-card card">
      <div className="stat-num">{n}{suffix || ''}</div>
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
      return { id, type: e.type.replace('Event', ''), repo, date, detail: e.type.replace('Event', '') }
  }
}

export default function Stats() {
  const { ref, inView } = useInView(0.15)
  const [user, setUser] = useState<GhUser | null>(null)
  const [stars, setStars] = useState(0)
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
          fetch(`https://api.github.com/users/${USER}/events/public?per_page=12`),
        ])
        if (!uRes.ok) throw new Error('user')
        const u: GhUser = await uRes.json()
        const repos = rRes.ok ? await rRes.json() : []
        const events = eRes.ok ? await eRes.json() : []
        const totalStars = Array.isArray(repos)
          ? repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0)
          : 0
        const acts = (Array.isArray(events) ? events : [])
          .map(formatEvent)
          .filter(Boolean) as Activity[]
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
    : 2

  const cards = [
    { label: 'Public repos', value: user?.public_repos ?? 66, suffix: '' },
    { label: 'Total stars', value: stars, suffix: '' },
    { label: 'Followers', value: user?.followers ?? 0, suffix: '' },
    { label: 'Years on GitHub', value: years, suffix: '' },
  ]

  return (
    <section id="stats" className="section gh-stats" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>GitHub · Live</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Stats & activity</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          Live data from github.com/{USER} — updates when you ship.
        </p>

        <div className={`stats-grid stagger ${inView ? 'visible' : ''}`}>
          {cards.map((s) => (
            <StatCard key={s.label} {...s} active={inView && !loading} />
          ))}
        </div>

        <div className={`gh-panels stagger ${inView ? 'visible' : ''}`}>
          <div className="card gh-cards">
            <h3 className="panel-title">Profile stats</h3>
            <div className="gh-img-wrap">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${USER}&show_icons=true&theme=github_dark&bg_color=161618&title_color=FF5A1F&icon_color=FF5A1F&text_color=D8D8D5&hide_border=true&border_radius=12`}
                alt="GitHub stats"
                loading="lazy"
              />
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${USER}&layout=compact&theme=github_dark&bg_color=161618&title_color=FF5A1F&text_color=D8D8D5&hide_border=true&border_radius=12`}
                alt="Top languages"
                loading="lazy"
              />
            </div>
            <a className="gh-link" href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer">
              Open GitHub profile →
            </a>
          </div>

          <div className="card gh-activity">
            <div className="activity-head">
              <h3 className="panel-title">Recent activity</h3>
              <span className="live-dot" title="Public events" />
            </div>
            {loading && <p className="activity-empty">Loading activity…</p>}
            {error && !loading && <p className="activity-empty">Could not load activity right now.</p>}
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

        <div className={`gh-streak reveal reveal-delay-3 ${inView ? 'visible' : ''}`}>
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${USER}&theme=dark&background=161618&ring=FF5A1F&fire=FF5A1F&currStreakLabel=FF5A1F&sideLabels=A1A1A0&currStreakNum=F4F4F2&sideNums=D8D8D5&dates=6B6B6A&hide_border=true&border_radius=12`}
            alt="GitHub streak"
            loading="lazy"
          />
        </div>
      </div>

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 36px; }
        .stat-card { text-align: center; padding: 28px 16px; }
        .stat-num { font-size: clamp(32px, 4vw, 42px); font-weight: 800; color: var(--accent); letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
        .gh-panels { display: grid; grid-template-columns: 1.15fr 1fr; gap: 16px; margin-top: 20px; }
        .panel-title { font-size: 14px; font-weight: 700; margin-bottom: 14px; color: var(--text); }
        .gh-img-wrap { display: flex; flex-direction: column; gap: 12px; }
        .gh-img-wrap img { width: 100%; height: auto; border-radius: 12px; display: block; }
        .gh-link { display: inline-block; margin-top: 14px; font-size: 13px; font-weight: 600; color: var(--accent); }
        .gh-link:hover { text-decoration: underline; }
        .activity-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ADE80; animation: livePulse 2s infinite; }
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.45); }
          70% { box-shadow: 0 0 0 8px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        .activity-list { list-style: none; display: flex; flex-direction: column; gap: 10px; max-height: 340px; overflow-y: auto; }
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
        .activity-empty { font-size: 13px; color: var(--text-muted); padding: 20px 0; }
        .gh-streak { margin-top: 20px; text-align: center; }
        .gh-streak img { max-width: 100%; height: auto; border-radius: 12px; }
        @media (max-width: 900px) { .gh-panels { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}
