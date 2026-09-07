import { useEffect, useRef, useState } from 'react'

const USER = 'BluHExH'

type Profile = {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
  location: string | null
}

export default function IdCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/users/${USER}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setProfile(d))
      .catch(() => {})
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const ry = (x - 0.5) * 22
    const rx = (0.5 - y) * 18
    setTilt({ rx, ry, gx: x * 100, gy: y * 100 })
  }

  const onLeave = () => {
    setHover(false)
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 })
  }

  const p = profile
  const since = p?.created_at ? new Date(p.created_at).getFullYear() : '2024'
  const avatar = p?.avatar_url || `https://github.com/${USER}.png`

  return (
    <div className="id-scene">
      <div
        ref={cardRef}
        className={`id-card ${hover ? 'hot' : ''}`}
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hover ? 1.03 : 1})`,
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
      >
        <div
          className="id-shine"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.22), transparent 55%)`,
          }}
        />
        <div className="id-hologram" />

        <div className="id-top">
          <div className="id-brand">
            <span className="id-mark">⚡</span>
            <span>GITHUB ID</span>
          </div>
          <span className="id-chip">OPEN SOURCE</span>
        </div>

        <div className="id-body">
          <div className="id-photo-wrap">
            <img className="id-photo" src={avatar} alt={USER} />
            <span className="id-status" title="Active" />
          </div>
          <div className="id-info">
            <p className="id-name">{p?.name || 'Hacker Hex'}</p>
            <p className="id-handle">@{p?.login || USER}</p>
            <p className="id-bio">{p?.bio || 'Security · Tools · Builder'}</p>
          </div>
        </div>

        <div className="id-stats">
          <div><b>{p?.public_repos ?? '—'}</b><span>Repos</span></div>
          <div><b>{p?.followers ?? '—'}</b><span>Followers</span></div>
          <div><b>{p?.following ?? '—'}</b><span>Following</span></div>
          <div><b>{since}</b><span>Since</span></div>
        </div>

        <div className="id-foot">
          <div className="id-barcode" aria-hidden>
            {Array.from({ length: 28 }).map((_, i) => (
              <i key={i} style={{ width: i % 3 === 0 ? 2 : 1, opacity: 0.35 + (i % 5) * 0.1 }} />
            ))}
          </div>
          <a className="id-link" href={p?.html_url || `https://github.com/${USER}`} target="_blank" rel="noopener noreferrer">
            View profile →
          </a>
        </div>
      </div>

      <style>{`
        .id-scene {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }
        .id-card {
          position: relative;
          width: 100%;
          max-width: 340px;
          border-radius: 18px;
          padding: 20px;
          background: linear-gradient(145deg, #1A1A1E 0%, #121214 55%, #0E0E10 100%);
          border: 1px solid rgba(255, 90, 31, 0.25);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.04) inset;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.25s ease;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
        }
        .id-card.hot {
          box-shadow:
            0 28px 60px rgba(0,0,0,0.55),
            0 0 40px rgba(255, 90, 31, 0.12),
            0 0 0 1px rgba(255, 90, 31, 0.2) inset;
        }
        .id-shine {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 2;
          mix-blend-mode: soft-light;
        }
        .id-hologram {
          pointer-events: none;
          position: absolute;
          inset: -40% -20%;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255,90,31,0.03) 8px,
            rgba(255,90,31,0.03) 16px
          );
          animation: holoShift 8s linear infinite;
          z-index: 1;
        }
        @keyframes holoShift {
          from { transform: translateX(0); }
          to { transform: translateX(40px); }
        }
        .id-top, .id-body, .id-stats, .id-foot {
          position: relative;
          z-index: 3;
        }
        .id-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .id-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }
        .id-mark {
          width: 22px; height: 22px;
          display: grid; place-items: center;
          background: #FF5A1F;
          color: #fff;
          border-radius: 6px;
          font-size: 11px;
        }
        .id-chip {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: #FF5A1F;
          background: rgba(255,90,31,0.12);
          border: 1px solid rgba(255,90,31,0.25);
          padding: 4px 8px;
          border-radius: 999px;
        }
        .id-body {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 18px;
        }
        .id-photo-wrap { position: relative; flex-shrink: 0; }
        .id-photo {
          width: 72px;
          height: 72px;
          border-radius: 16px;
          object-fit: cover;
          border: 2px solid rgba(255,90,31,0.35);
          box-shadow: 0 8px 20px rgba(0,0,0,0.35);
        }
        .id-status {
          position: absolute;
          right: -2px;
          bottom: -2px;
          width: 14px;
          height: 14px;
          background: #4ADE80;
          border: 2px solid #121214;
          border-radius: 50%;
        }
        .id-name {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #F4F4F2;
          margin: 0 0 2px;
        }
        .id-handle {
          font-family: var(--mono);
          font-size: 12px;
          color: #FF5A1F;
          margin: 0 0 6px;
        }
        .id-bio {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .id-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 14px;
        }
        .id-stats div { text-align: center; }
        .id-stats b {
          display: block;
          font-size: 15px;
          font-weight: 800;
          color: #F4F4F2;
        }
        .id-stats span {
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .id-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .id-barcode {
          display: flex;
          align-items: flex-end;
          gap: 1.5px;
          height: 22px;
          flex: 1;
        }
        .id-barcode i {
          display: block;
          height: 100%;
          background: #A1A1A0;
          border-radius: 1px;
        }
        .id-barcode i:nth-child(odd) { height: 70%; }
        .id-barcode i:nth-child(3n) { height: 100%; }
        .id-link {
          font-size: 12px;
          font-weight: 700;
          color: #FF5A1F;
          white-space: nowrap;
        }
        .id-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .id-card { max-width: 100%; }
        }
      `}</style>
    </div>
  )
}
