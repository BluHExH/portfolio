import { useInView } from '../hooks/useInView'

const skillGroups = [
  { title: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Bash', 'C'] },
  { title: 'Security', items: ['Penetration Testing', 'OSINT', 'Vulnerability Research', 'Termux Tools', 'Exploit Analysis'] },
  { title: 'Frontend', items: ['React', 'Vite', 'Three.js / R3F', 'HTML / CSS', 'UI Animation'] },
  { title: 'Tools & Ops', items: ['Git', 'Linux', 'Ollama', 'FFmpeg', 'GitHub Actions'] },
]

export default function Skills() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Skills</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Tech stack</h2>
        <div className={`skills-grid stagger ${inView ? 'visible' : ''}`}>
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
        .skill-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--accent); margin-bottom: 14px; }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .skill-list li { font-size: 14px; color: var(--text-secondary); padding-left: 14px; position: relative; }
        .skill-list li::before { content: ""; position: absolute; left: 0; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); opacity: 0.6; }
      `}</style>
    </section>
  )
}
