import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const items = [
  { label: 'Public repos', value: 65, suffix: '+' },
  { label: 'Security tools', value: 12, suffix: '+' },
  { label: 'Languages', value: 5, suffix: '' },
  { label: 'Years building', value: 3, suffix: '+' },
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
    <section id="stats" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Stats</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>By the numbers</h2>
        <div className={`stats-grid stagger ${inView ? 'visible' : ''}`}>
          {items.map((s) => (
            <StatCard key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 36px; }
        .stat-card { text-align: center; padding: 28px 16px; }
        .stat-num { font-size: clamp(32px, 4vw, 42px); font-weight: 800; color: var(--accent); letter-spacing: -0.03em; line-height: 1; margin-bottom: 8px; }
        .stat-label { font-size: 13px; font-weight: 500; color: var(--text-muted); }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}
