import { useInView } from '../hooks/useInView'

const projects = [
  { name: 'LocalVulnAI', description: 'Local AI-powered vulnerability scanner. Scan code and websites offline using Ollama with explanations and fixes.', language: 'Python', stars: 0, url: 'https://github.com/BluHExH/LocalVulnAI', tag: 'AI / Security' },
  { name: 'Hex-pentest', description: 'EliteHex — comprehensive penetration testing toolkit for Termux on Android.', language: 'Python', stars: 3, url: 'https://github.com/BluHExH/Hex-pentest', tag: 'Pentest' },
  { name: 'HEX-Number-to-location', description: 'Termux number-to-location automation for practical OSINT-style lookups.', language: 'Python', stars: 3, url: 'https://github.com/BluHExH/HEX-Number-to-location', tag: 'OSINT' },
  { name: 'HEX-exploit-maker', description: 'Exploit engine for vulnerability research, red-team training, and payload analysis.', language: 'Python', stars: 2, url: 'https://github.com/BluHExH/HEX-exploit-maker', tag: 'Research' },
  { name: 'knitout-3d-visualizer', description: 'Interactive 3D visualizer for knitout files with live editing (React + R3F).', language: 'TypeScript', stars: 0, url: 'https://github.com/BluHExH/knitout-3d-visualizer', demo: 'https://knitout-3d-viz.vercel.app', tag: '3D / Web' },
  { name: 'MediaForge', description: 'Open-source multimedia framework based on FFmpeg — correctness, security, performance.', language: 'C / Python', stars: 0, url: 'https://github.com/BluHExH/MediaForge', tag: 'Multimedia' },
]

export default function Projects() {
  const { ref, inView } = useInView(0.1)
  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Projects</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Selected work</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>Tools I build in the open — free to use, fork, and improve.</p>
        <div className={`project-grid stagger ${inView ? 'visible' : ''}`}>
          {projects.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="card project-card">
              <div className="project-top">
                <span className="project-tag">{p.tag}</span>
                <span className="project-stars">★ {p.stars}</span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-footer">
                <span className="project-lang">{p.language}</span>
                {p.demo && (
                  <span className="project-demo" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(p.demo!, '_blank') }}>
                    Live demo →
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
        <div className={`projects-cta reveal reveal-delay-3 ${inView ? 'visible' : ''}`}>
          <a href="https://github.com/BluHExH?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">See all repositories →</a>
        </div>
      </div>
      <style>{`
        .project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-top: 36px; }
        .project-card { display: flex; flex-direction: column; gap: 10px; }
        .project-top { display: flex; justify-content: space-between; align-items: center; }
        .project-tag { font-size: 12px; font-weight: 600; color: var(--accent); background: var(--accent-soft); padding: 4px 10px; border-radius: 999px; }
        .project-stars { font-size: 13px; color: var(--text-muted); }
        .project-name { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
        .project-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.6; flex: 1; }
        .project-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border); margin-top: 4px; }
        .project-lang { font-size: 13px; color: var(--text-muted); font-weight: 500; }
        .project-demo { font-size: 13px; font-weight: 600; color: var(--accent); cursor: pointer; }
        .projects-cta { margin-top: 36px; text-align: center; }
      `}</style>
    </section>
  )
}
