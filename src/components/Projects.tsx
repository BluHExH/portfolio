const projects = [
  {
    name: 'LocalVulnAI',
    description:
      'Local AI-powered vulnerability scanner. Scan code and websites offline using Ollama. Find common vulnerabilities with explanations and suggested fixes.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/BluHExH/LocalVulnAI',
    tag: 'AI / Security',
  },
  {
    name: 'Hex-pentest',
    description:
      'EliteHex — a comprehensive penetration testing toolkit designed specifically for Termux on Android. Multiple security assessment capabilities in one tool.',
    language: 'Python',
    stars: 3,
    url: 'https://github.com/BluHExH/Hex-pentest',
    tag: 'Pentest',
  },
  {
    name: 'HEX-Number-to-location',
    description:
      'Termux number-to-location automation script. Practical utility for OSINT-style lookups on mobile.',
    language: 'Python',
    stars: 3,
    url: 'https://github.com/BluHExH/HEX-Number-to-location',
    tag: 'OSINT',
  },
  {
    name: 'HEX-exploit-maker',
    description:
      'High-intensity exploit engine built for deep vulnerability research, red-team training, and advanced payload behavior analysis.',
    language: 'Python',
    stars: 2,
    url: 'https://github.com/BluHExH/HEX-exploit-maker',
    tag: 'Research',
  },
  {
    name: 'knitout-3d-visualizer',
    description:
      'Interactive 3D visualizer for knitout files with live code editing. Built with React + React Three Fiber.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/BluHExH/knitout-3d-visualizer',
    demo: 'https://knitout-3d-viz.vercel.app',
    tag: '3D / Web',
  },
  {
    name: 'MediaForge',
    description:
      'Long-term production-quality open-source multimedia framework based on FFmpeg. Focus on correctness, security, performance and DX.',
    language: 'C / Python',
    stars: 0,
    url: 'https://github.com/BluHExH/MediaForge',
    tag: 'Multimedia',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <p className="section-label">// PROJECTS</p>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-desc">
          Tools and experiments I build in the open. Most of them live on GitHub
          and are free to use, fork, and improve.
        </p>

        <div className="project-grid">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card project-card"
            >
              <div className="project-top">
                <span className="project-tag">{p.tag}</span>
                <span className="project-stars">★ {p.stars}</span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="project-footer">
                <span className="project-lang">
                  <span className="lang-dot" />
                  {p.language}
                </span>
                {p.demo && (
                  <span
                    className="project-demo"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(p.demo, '_blank')
                    }}
                  >
                    Live Demo →
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="projects-cta">
          <a
            href="https://github.com/BluHExH?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            See All Repositories →
          </a>
        </div>
      </div>

      <style>{`
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.15s, transform 0.15s;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .project-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .project-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid var(--accent);
          padding: 3px 8px;
          border-radius: 2px;
        }
        .project-stars {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .project-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .project-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
        }
        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }
        .project-lang {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .lang-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }
        .project-demo {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          cursor: pointer;
        }
        .project-demo:hover {
          text-decoration: underline;
        }
        .projects-cta {
          margin-top: 40px;
          text-align: center;
        }
      `}</style>
    </section>
  )
}
