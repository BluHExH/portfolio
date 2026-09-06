import { useInView } from '../hooks/useInView'

const timeline = [
  { year: '2024–Now', title: 'Open Source & Security Tools', desc: 'Building pentest toolkits, LocalVulnAI, exploit research utilities. Active GitHub contributor focused on practical security software.' },
  { year: '2025–2026', title: 'LocalVulnAI & MediaForge', desc: 'Shipped offline AI vulnerability scanner with Ollama and started long-term FFmpeg-based multimedia framework work.' },
  { year: '2024–2025', title: 'Termux Security Suite', desc: 'Hex-pentest, number-to-location, brute-force utilities designed for mobile red-team workflows on Android.' },
  { year: 'Ongoing', title: 'Community & Learning', desc: 'Exploring new stacks, mentoring juniors, and shipping educational content around security and open source.' },
]

export default function Experience() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>// JOURNEY</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Path So Far</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          From first scripts to shipping tools people actually use.
        </p>
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
        .timeline { margin-top: 48px; position: relative; padding-left: 28px; }
        .timeline::before { content: ""; position: absolute; left: 7px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(to bottom, var(--accent), var(--border-subtle)); }
        .timeline-item { position: relative; margin-bottom: 20px; }
        .timeline-marker { position: absolute; left: -28px; top: 22px; width: 11px; height: 11px; border-radius: 50%; background: var(--bg-void); border: 2px solid var(--accent); box-shadow: 0 0 12px var(--accent-glow); }
        .timeline-content { padding: 22px 24px; transition: border-color 0.25s, transform 0.25s; }
        .timeline-content:hover { border-color: var(--accent); transform: translateX(4px); }
        .timeline-year { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--accent); }
        .timeline-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; margin: 6px 0 8px; }
        .timeline-desc { color: var(--text-secondary); font-size: 14px; line-height: 1.65; }
      `}</style>
    </section>
  )
}
