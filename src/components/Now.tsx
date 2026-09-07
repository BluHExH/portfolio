import { useInView } from '../hooks/useInView'

const items = [
  { label: 'Building', text: 'LocalVulnAI — offline vulnerability explanations with Ollama' },
  { label: 'Learning', text: 'Deeper web exploitation paths and secure-by-default CLI UX' },
  { label: 'Shipping', text: 'Portfolio polish, open tools, and clearer docs for every repo' },
  { label: 'Exploring', text: 'Practical OSINT helpers and Termux-first security workflows' },
]

export default function Now() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="now" className="section" ref={ref}>
      <div className="container now-inner">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Now</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>What I'm focused on</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          A live snapshot of current work — updated as priorities shift.
        </p>
        <div className={`now-grid stagger ${inView ? 'visible' : ''`}>
          {items.map((it) => (
            <div key={it.label} className="card now-card">
              <span className="now-label">{it.label}</span>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .now-inner { max-width: 900px; }
        .now-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 32px; }
        .now-card { padding: 18px 20px; }
        .now-label { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .now-card p { margin: 0; font-size: 14px; color: var(--text-secondary); line-height: 1.55; }
        @media (max-width: 600px) { .now-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
