import { useInView } from '../hooks/useInView'

const projects = [
  {
    name: 'LocalVulnAI',
    description: 'Needed a scanner that does not phone home. Runs with Ollama, explains findings in plain words.',
    language: 'Python',
    stars: 0,
    url: 'https://github.com/BluHExH/LocalVulnAI',
    tag: 'built for myself',
  },
  {
    name: 'Hex-pentest',
    description: 'Pentest helpers that actually fit Termux. Not a 40MB framework — just modules I use.',
    language: 'Python',
    stars: 3,
    url: 'https://github.com/BluHExH/Hex-pentest',
    tag: 'Termux',
  },
  {
    name: 'HEX-Number-to-location',
    description: 'Quick number → location path for OSINT practice. CLI first, excuses later.',
    language: 'Python',
    stars: 3,
    url: 'https://github.com/BluHExH/HEX-Number-to-location',
    tag: 'OSINT',
  },
  {
    name: 'HEX-exploit-maker',
    description: 'Research playground for payloads and edge cases. For learning, not for random targets.',
    language: 'Python',
    stars: 2,
    url: 'https://github.com/BluHExH/HEX-exploit-maker',
    tag: 'research',
  },
  {
    name: 'knitout-3d-visualizer',
    description: 'A 3D visualizer I shipped when I got tired of imagining knit structures in my head.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/BluHExH/knitout-3d-visualizer',
    demo: 'https://knitout-3d-viz.vercel.app',
    tag: 'side quest',
  },
  {
    name: 'MediaForge',
    description: 'FFmpeg wrapper experiments. Multimedia is messy; this tries to be less messy.',
    language: 'C / Python',
    stars: 0,
    url: 'https://github.com/BluHExH/MediaForge',
    tag: 'wip',
  },
  {
    name: 'GitHub-Profile-Builder',
    description: 'HEX Forge — because writing READMEs by hand gets old after the 20th profile.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/BluHExH/GitHub-Profile-Builder-Platform-',
    tag: 'platform',
  },
  {
    name: 'portfolio',
    description: 'This site. Dark, a bit loud, still being shaped by feedback.',
    language: 'TypeScript',
    stars: 0,
    url: 'https://github.com/BluHExH/portfolio',
    tag: 'meta',
  },
]

const css = `
.projects-section { overflow: hidden; }
.slider-wrap {
  position: relative; margin-top: 36px; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
}
.slider-track {
  display: flex; gap: 16px; width: max-content;
  animation: slideLeft 42s linear infinite;
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
.projects-cta { margin-top: 36px; text-align: left; }
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
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Things I actually shipped</h2>
        <p className={'section-desc reveal reveal-delay-2' + vis}>
          Hover a card to pause. Some are polished. Some are honest experiments.
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
            Full repo list on GitHub →
          </a>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
