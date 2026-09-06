import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const items = [
  { label: 'PUBLIC REPOS', value: 65, suffix: '+' },
  { label: 'SECURITY TOOLS', value: 12, suffix: '+' },
  { label: 'LANGUAGES', value: 5, suffix: '' },
  { label: 'YEARS BUILDING', value: 3, suffix: '+' },
]

function StatCard({ label, value, suffix, active }: { label: string; value: number; suffix: string; active: boolean }) {
  const n = useCountUp(value, active)
  return (
    <div className="stat-card card">
      <div className="stat-num">{n}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView(0.2)
  return (
    <section id="stats" className="section stats" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>// STATS</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>By The Numbers</h2>
        <div className={`stats-grid stagger ${inView ? 'visible' : ''}`}>
          {items.map((s) => (
            <StatCard key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
        .stat-card { text-align: center; padding: 32px 16px; transition: border-color 0.25s, transform 0.25s; }
        .stat-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .stat-num { font-family: var(--font-display); font-size: clamp(36px, 5vw, 48px); font-weight: 700; color: var(--accent); line-height: 1; margin-bottom: 10px; }
        .stat-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--text-muted); }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}
