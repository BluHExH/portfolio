import { useInView } from '../hooks/useInView'

const timeline = [
  { year: '2024–Now', title: 'Open source & security tools', desc: 'Building pentest toolkits, LocalVulnAI, exploit research utilities. Active GitHub contributor.' },
  { year: '2025–2026', title: 'LocalVulnAI & MediaForge', desc: 'Shipped offline AI vulnerability scanner with Ollama and started FFmpeg-based multimedia framework work.' },
  { year: '2024–2025', title: 'Termux security suite', desc: 'Hex-pentest, number-to-location, and related utilities for mobile red-team workflows.' },
  { year: 'Ongoing', title: 'Community & learning', desc: 'Exploring new stacks and shipping practical open source software.' },
]

export default function Experience() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Journey</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Path so far</h2>
        <div className={`timeline stagger ${inView ? 'visible' : ''}`}>
          {timeline.map((t, i) => (
            <div key={i} className="timeline-item">
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
        .timeline { margin-top: 40px; position: relative; padding-left: 28px; }
        .timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--border)); border-radius: 2px; }
        .timeline-item { position: relative; margin-bottom: 16px; }
        .timeline-marker { position: absolute; left: -28px; top: 24px; width: 12px; height: 12px; border-radius: 50%; background: #fff; border: 3px solid var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
        .timeline-content { padding: 20px 22px; }
        .timeline-year { font-size: 12px; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.04em; }
        .timeline-title { font-size: 18px; font-weight: 700; margin: 4px 0 6px; letter-spacing: -0.02em; }
        .timeline-desc { color: var(--text-secondary); font-size: 14px; line-height: 1.6; }
      `}</style>
    </section>
  )
}
