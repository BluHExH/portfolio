import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    name: 'LocalVulnAI',
    tag: 'AI / Security',
    language: 'Python',
    description:
      'Local AI-powered vulnerability scanner using Ollama offline. Explains findings in plain language without sending code to the cloud.',
    points: ['Runs fully offline', 'Human-readable fixes', 'Built for low-resource machines'],
    url: 'https://github.com/BluHExH/LocalVulnAI',
  },
  {
    name: 'Hex-pentest',
    tag: 'Pentest',
    language: 'Python',
    description:
      'EliteHex — a penetration testing toolkit designed for Termux on Android. Practical modules for real mobile workflows.',
    points: ['Termux-first design', 'Practical red-team tools', 'Lightweight dependencies'],
    url: 'https://github.com/BluHExH/Hex-pentest',
  },
  {
    name: 'knitout-3d-visualizer',
    tag: '3D / Web',
    language: 'TypeScript',
    description:
      'Interactive 3D knitout visualizer with live code editing. See structure change as you type.',
    points: ['Live 3D preview', 'Code-driven geometry', 'Deployed on Vercel'],
    url: 'https://github.com/BluHExH/knitout-3d-visualizer',
    demo: 'https://knitout-3d-viz.vercel.app',
  },
  {
    name: 'HEX-Number-to-location',
    tag: 'OSINT',
    language: 'Python',
    description:
      'Number-to-location automation for OSINT-style lookups on Termux. Fast CLI path from input to insight.',
    points: ['OSINT helper', 'Termux friendly', 'Automation focused'],
    url: 'https://github.com/BluHExH/HEX-Number-to-location',
  },
  {
    name: 'GitHub-Profile-Builder',
    tag: 'AI / Platform',
    language: 'TypeScript',
    description:
      'HEX Forge — AI-powered GitHub profile and README builder. Ship a sharper public presence faster.',
    points: ['AI-assisted READMEs', 'Profile polish', 'Builder workflow'],
    url: 'https://github.com/BluHExH/GitHub-Profile-Builder-Platform-',
  },
]

export default function FeaturedScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      if (total <= 0) return
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      const p = scrolled / total
      setProgress(p)
      const i = Math.min(projects.length - 1, Math.floor(p * projects.length))
      setIndex(i)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const p = projects[index]

  return (
    <section id="featured" className="pin-section" ref={sectionRef}>
      <div className="pin-sticky">
        <div className="container pin-inner">
          <div className="pin-head">
            <p className="section-label">Featured</p>
            <h2 className="section-title">Deep dive</h2>
            <p className="section-desc">
              Scroll here — 5 projects stay in place and change one by one. After the last, the page continues.
            </p>
          </div>

          <div className="pin-stage">
            <div className="pin-side">
              <div className="pin-steps">
                {projects.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    className={'pin-step' + (i === index ? ' active' : i < index ? ' done' : '')}
                    onClick={() => {
                      const el = sectionRef.current
                      if (!el) return
                      const total = el.offsetHeight - window.innerHeight
                      const target = el.offsetTop + (i / projects.length) * total + 2
                      window.scrollTo({ top: target, behavior: 'smooth' })
                    }}
                  >
                    <span className="pin-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pin-step-name">{item.name}</span>
                  </button>
                ))}
              </div>
              <div className="pin-bar">
                <i style={{ height: progress * 100 + '%' }} />
              </div>
            </div>

            <div className="pin-card" key={p.name}>
              <div className="pin-card-top">
                <span className="pin-tag">{p.tag}</span>
                <span className="pin-lang">{p.language}</span>
              </div>
              <h3 className="pin-name">{p.name}</h3>
              <p className="pin-desc">{p.description}</p>
              <ul className="pin-points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="pin-actions">
                <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
                  View on GitHub →
                </a>
                {p.demo && (
                  <a className="btn btn-secondary" href={p.demo} target="_blank" rel="noopener noreferrer">
                    Live demo
                  </a>
                )}
              </div>
              <p className="pin-count">
                {index + 1} / {projects.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}

const css = `
.pin-section {
  position: relative;
  height: 500vh;
}
.pin-sticky {
  position: sticky;
  top: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0 48px;
  background: transparent;
}
.pin-inner { width: 100%; }
.pin-head { margin-bottom: 28px; max-width: 560px; }
.pin-stage {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 28px;
  align-items: stretch;
}
.pin-side {
  display: flex;
  gap: 14px;
  align-items: stretch;
}
.pin-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.pin-step {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  color: var(--text-muted);
  transition: all 0.2s ease;
}
.pin-step:hover { color: var(--text); background: rgba(255,255,255,0.03); }
.pin-step.active {
  color: var(--text);
  border-color: rgba(255, 90, 31, 0.35);
  background: rgba(255, 90, 31, 0.08);
}
.pin-step.done { color: var(--text-secondary); }
.pin-num {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--accent);
  min-width: 22px;
}
.pin-step-name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pin-bar {
  width: 3px;
  border-radius: 99px;
  background: #262628;
  position: relative;
  overflow: hidden;
  min-height: 180px;
}
.pin-bar i {
  position: absolute;
  left: 0; top: 0; width: 100%;
  background: linear-gradient(180deg, #FF5A1F, #FF9A5C);
  border-radius: 99px;
  transition: height 0.05s linear;
}
.pin-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 32px;
  box-shadow: var(--shadow);
  min-height: 340px;
  display: flex;
  flex-direction: column;
  animation: pinIn 0.35s ease;
}
@keyframes pinIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: none; }
}
.pin-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.pin-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 4px 10px;
  border-radius: 999px;
}
.pin-lang {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}
.pin-name {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 14px;
  color: var(--text);
}
.pin-desc {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 18px;
  max-width: 520px;
}
.pin-points {
  margin: 0 0 24px;
  padding-left: 18px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}
.pin-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
}
.pin-count {
  margin-top: 18px;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}
@media (max-width: 800px) {
  .pin-section { height: 420vh; }
  .pin-stage { grid-template-columns: 1fr; }
  .pin-side { order: 2; }
  .pin-steps { flex-direction: row; flex-wrap: wrap; }
  .pin-bar { display: none; }
  .pin-card { min-height: 300px; padding: 24px; }
  .pin-step-name { max-width: 120px; }
}
`
