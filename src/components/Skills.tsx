const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Bash', 'C'],
  },
  {
    title: 'Security',
    items: ['Penetration Testing', 'OSINT', 'Vulnerability Research', 'Termux Tools'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'Three.js / R3F', 'HTML / CSS'],
  },
  {
    title: 'Tools & Ops',
    items: ['Git', 'Linux', 'Ollama', 'FFmpeg', 'GitHub Actions'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <p className="section-label">// SKILLS</p>
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-desc">
          What I use day to day when building tools, scanners, and experiments.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="card skill-card">
              <h3 className="skill-title">{group.title}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="skill-bullet">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 40px;
        }
        .skill-card {
          padding: 28px 24px;
        }
        .skill-title {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 18px;
        }
        .skill-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .skill-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .skill-bullet {
          color: var(--accent);
          font-size: 12px;
        }
      `}</style>
    </section>
  )
}
