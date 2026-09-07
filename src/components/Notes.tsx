import { useInView } from '../hooks/useInView'

const posts = [
  {
    title: 'Why local AI beats cloud scanners for learning security',
    date: '2026-08-12',
    tag: 'Security',
    blurb: 'Cloud tools are fine until you cannot ship your homework code off-device. Local models keep the feedback loop tight.',
    href: 'https://github.com/BluHExH/LocalVulnAI',
  },
  {
    title: 'Building pentest utilities that actually run on Termux',
    date: '2026-06-03',
    tag: 'Termux',
    blurb: 'Mobile shells are constrained. Design for low RAM, few dependencies, and clear CLI output.',
    href: 'https://github.com/BluHExH/Hex-pentest',
  },
  {
    title: 'Open source is a classroom with no walls',
    date: '2026-04-18',
    tag: 'Open source',
    blurb: 'Shipping public tools forces clarity. If someone cannot run it at 2 AM, the docs are not done.',
    href: 'https://github.com/BluHExH',
  },
]

const css = `
.notes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
.note-card { display: flex; flex-direction: column; gap: 10px; transition: border-color .2s, transform .2s; }
.note-card:hover { border-color: var(--accent); transform: translateY(-3px); }
.note-meta { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); }
.note-tag { color: var(--accent); font-weight: 600; }
.note-card h3 { font-size: 17px; font-weight: 700; line-height: 1.35; margin: 0; color: var(--text); }
.note-card p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; flex: 1; margin: 0; }
.note-more { font-size: 13px; font-weight: 600; color: var(--accent); }
@media (max-width: 800px) { .notes-grid { grid-template-columns: 1fr; } }
`

export default function Notes() {
  const { ref, inView } = useInView(0.12)
  const vis = inView ? ' visible' : ''
  return (
    <section id="notes" className="section" ref={ref}>
      <div className="container">
        <p className={'section-label reveal' + vis}>Notes</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Writing and thinking</h2>
        <p className={'section-desc reveal reveal-delay-2' + vis}>
          Short notes on security, tooling, and building in public.
        </p>
        <div className={'notes-grid stagger' + vis}>
          {posts.map((p) => (
            <a key={p.title} className="card note-card" href={p.href} target="_blank" rel="noopener noreferrer">
              <div className="note-meta">
                <span className="note-tag">{p.tag}</span>
                <time>{p.date}</time>
              </div>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <span className="note-more">Read more →</span>
            </a>
          ))}
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
