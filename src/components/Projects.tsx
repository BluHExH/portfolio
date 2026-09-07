import { useInView } from '../hooks/useInView'

const projects = [
  { name: 'LocalVulnAI', description: 'Local AI-powered vulnerability scanner using Ollama offline.', language: 'Python', stars: 0, url: 'https://github.com/BluHExH/LocalVulnAI', tag: 'AI / Security' },
  { name: 'Hex-pentest', description: 'EliteHex — penetration testing toolkit for Termux on Android.', language: 'Python', stars: 3, url: 'https://github.com/BluHExH/Hex-pentest', tag: 'Pentest' },
  { name: 'HEX-Number-to-location', description: 'Number-to-location automation for OSINT-style lookups on Termux.', language: 'Python', stars: 3, url: 'https://github.com/BluHExH/HEX-Number-to-location', tag: 'OSINT' },
  { name: 'HEX-exploit-maker', description: 'Exploit engine for research, red-team training, and payload analysis.', language: 'Python', stars: 2, url: 'https://github.com/BluHExH/HEX-exploit-maker', tag: 'Research' },
  { name: 'knitout-3d-visualizer', description: 'Interactive 3D knitout visualizer with live code editing.', language: 'TypeScript', stars: 0, url: 'https://github.com/BluHExH/knitout-3d-visualizer', demo: 'https://knitout-3d-viz.vercel.app', tag: '3D / Web' },
  { name: 'MediaForge', description: 'Open-source multimedia framework based on FFmpeg.', language: 'C / Python', stars: 0, url: 'https://github.com/BluHExH/MediaForge', tag: 'Multimedia' },
  { name: 'portfolio', description: 'Personal developer portfolio — dark theme, animated sections.', language: 'TypeScript', stars: 0, url: 'https://github.com/BluHExH/portfolio', demo: 'https://bluhexx.github.io/portfolio/', tag: 'Web' },
  { name: 'GitHub-Profile-Builder', description: 'HEX Forge — AI-powered GitHub profile and README builder platform.', language: 'TypeScript', stars: 0, url: 'https://github.com/BluHExH/GitHub-Profile-Builder-Platform-', tag: 'AI / Platform' },
]

const css = `
.projects-section { overflow: hidden; }
.slider-wrap {
  position: relative; margin-top: 40px; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
}
.slider-track {
  display: flex; gap: 16px; width: max-content;
  animation: slideLeft 40s linear infinite;
}
.slider-track:hover { animation-play-state: paused; }
@keyframes slideLeft {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.slide-card {
  flex: 0 0 300px; width: 300px; display: flex; flex-direction: column; gap: 10px;
  padding: 22px; background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); box-shadow: var(--shadow-sm);
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}
.slide-card:hover {
  border-color: var(--accent); transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(255, 90, 31, 0.12);
}
.slide-top { display: flex; justify-content: space-between; align-items: center; }
.slide-tag { font-size: 11px; font-weight: 600; color: var(--accent); background: var(--accent-soft); padding: 4px 10px; border-radius: 999px; }
.slide-stars { font-size: 12px; color: var(--text-muted); }
.slide-name { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: var(--text); }
.slide-desc {
  font-size: 13px; color: var(--text-secondary); line-height: 1.55; flex: 1;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.slide-foot {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 12px; border-top: 1px solid var(--border); margin-top: 4px;
}
.slide-lang { font-size: 12px; color: var(--text-muted); font-weight: 500; }
.slide-links { display: flex; gap: 12px; align-items: center; }
.slide-demo {
  font-size: 12px; font-weight: 700; color: #4ADE80;
  border: 1px solid rgba(74,222,128,0.35); padding: 2px 8px; border-radius: 999px;
}
.slide-open { font-size: 12px; font-weight: 600; color: var(--accent); }
.projects-cta { margin-top: 36px; text-align: center; }
@media (max-width: 600px) {
  .slide-card { flex-basis: 260px; width: 260px; }
  .slider-track { animation-duration: 32s; }
}
`

function ProjectCard({ p }: { p: (typeof projects)[0] & { demo?: string } }) {
  return (
    <div className="slide-card">
      <div className="slide-top">
        <span className="slide-tag">{p.tag}</span>
        <span className="slide-stars">★ {p.stars}</span>
      </div>
      <h3 className="slide-name">{p.name}</h3>
      <p className="slide-desc">{p.description}</p>
      <div className="slide-foot">
        <span className="slide-lang">{p.language}</span>
        <span className="slide-links">
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="slide-demo">
              Live
            </a>
          )}
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="slide-open">
            Code →
          </a>
        </span>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, inView } = useInView(0.1)
  const loop = [...projects, ...projects]
  const vis = inView ? ' visible' : ''

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        <p className={'section-label reveal' + vis}>Projects</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Selected work</h2>
        <p className={'section-desc reveal reveal-delay-2' + vis}>
          Auto-scrolling showcase — hover any card to pause.
        </p>
      </div>

      <div className={'slider-wrap reveal reveal-delay-2' + vis}>
        <div className="slider-track">
          {loop.map((p, idx) => (
            <ProjectCard key={p.name + '-' + idx} p={p} />
          ))}
        </div>
      </div>

      <div className="container">
        <div className={'projects-cta reveal reveal-delay-3' + vis}>
          <a
            href="https://github.com/BluHExH?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            See all repositories →
          </a>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
