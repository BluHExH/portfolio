import { useInView } from '../hooks/useInView'

const timeline = [
  {
    year: 'Now',
    title: 'Shipping offline tools',
    desc: 'LocalVulnAI, MediaForge experiments, and cleaning up the security scripts people actually clone.',
  },
  {
    year: '2024–25',
    title: 'Termux era',
    desc: 'Hex-pentest and OSINT helpers. Learned that mobile constraints force better design.',
  },
  {
    year: 'Earlier',
    title: 'Break → learn → publish',
    desc: 'Lots of small repos. Some abandoned. Some still useful. All public on purpose.',
  },
]

export default function Experience() {
  const { ref, inView } = useInView(0.15)
  const vis = inView ? ' visible' : ''

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <p className={'section-label reveal' + vis}>Timeline</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Rough path</h2>
        <div className={'timeline stagger' + vis}>
          {timeline.map((t) => (
            <div key={t.title} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content card">
                <span className="timeline-year">{t.year}</span>
                <h3 className="timeline-title">{t.title}</h3>
                <p className="timeline-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .timeline { margin-top: 40px; position: relative; padding-left: 28px; max-width: 640px; }
        .timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--border)); border-radius: 2px; }
        .timeline-item { position: relative; margin-bottom: 16px; }
        .timeline-marker { position: absolute; left: -28px; top: 24px; width: 12px; height: 12px; border-radius: 50%; background: #0B0B0C; border: 3px solid var(--accent); }
        .timeline-content { padding: 20px 22px; }
        .timeline-year { font-size: 12px; font-weight: 700; color: var(--accent); letter-spacing: 0.04em; }
        .timeline-title { font-size: 18px; font-weight: 700; margin: 4px 0 6px; letter-spacing: -0.02em; }
        .timeline-desc { color: var(--text-secondary); font-size: 14px; line-height: 1.65; }
      `}</style>
    </section>
  )
}
