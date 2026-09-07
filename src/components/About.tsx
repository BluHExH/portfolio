import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>About</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Who I am</h2>
        <div className="about-grid">
          <div className={`about-text reveal reveal-delay-2 ${inView ? 'visible' : ''`}>
            <p>I'm <strong>BluHExH</strong> — also known as Hacker Hex. An open source developer and security enthusiast based in Bangladesh.</p>
            <p>I build tools that help people understand systems better — penetration testing utilities, local AI scanners, and practical scripts that run on Termux and beyond.</p>
            <p>Stay curious. Break systems carefully. Rebuild them stronger.</p>
            <div className="about-actions">
              <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer" className="btn btn-primary">GitHub profile</a>
              <a href="mailto:cyber17official.bd@gmail.com" className="btn btn-secondary">Email me</a>
            </div>
          </div>
          <div className={`about-cards stagger ${inView ? 'visible' : ''`}>
            <div className="card info-card"><span className="info-label">Focus</span><span className="info-value">Open source & security tools</span></div>
            <div className="card info-card"><span className="info-label">Interests</span><span className="info-value">Pentesting · AI · Community</span></div>
            <div className="card info-card"><span className="info-label">Style</span><span className="info-value">Python-first, practical tooling</span></div>
            <div className="card info-card"><span className="info-label">Email</span><a href="mailto:cyber17official.bd@gmail.com" className="info-value link">cyber17official.bd@gmail.com</a></div>
          </div>
        </div>
      </div>
      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; margin-top: 36px; }
        .about-text p { color: var(--text-secondary); margin-bottom: 14px; font-size: 16px; line-height: 1.75; }
        .about-text strong { color: var(--text); }
        .about-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
        .about-cards { display: flex; flex-direction: column; gap: 12px; }
        .info-card { display: flex; flex-direction: column; gap: 4px; }
        .info-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); }
        .info-value { font-size: 15px; color: var(--text); }
        .info-value.link { color: var(--accent); }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
