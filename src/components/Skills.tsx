import { useInView } from '../hooks/useInView'

const skillGroups = [
  { title: 'I write', items: ['Python', 'TypeScript', 'Bash', 'a little C'] },
  { title: 'I break / study', items: ['Pentest basics', 'OSINT flows', 'Termux tooling', 'Local scanners'] },
  { title: 'I ship with', items: ['React', 'Vite', 'Git', 'Linux', 'Ollama'] },
  { title: 'I avoid when I can', items: ['Cloud lock-in', 'Heavy frameworks', 'Pretty demos with no code'] },
]

export default function Skills() {
  const { ref, inView } = useInView(0.15)
  const vis = inView ? ' visible' : ''

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <p className={'section-label reveal' + vis}>Skills</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>What I reach for</h2>
        <div className={'skills-grid stagger' + vis}>
          {skillGroups.map((group) => (
            <div key={group.title} className="card skill-card">
              <h3 className="skill-title">{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-top: 36px; }
        .skill-card { padding: 24px; }
        .skill-title { font-size: 13px; font-weight: 700; letter-spacing: 0.02em; color: var(--accent); margin-bottom: 14px; }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .skill-list li { font-size: 14px; color: var(--text-secondary); padding-left: 14px; position: relative; }
        .skill-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); opacity: 0.55; }
      `}</style>
    </section>
  )
}
