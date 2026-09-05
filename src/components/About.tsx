export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <p className="section-label">// ABOUT</p>
        <h2 className="section-title">Who I Am</h2>

        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm <strong>BluHExH</strong> — also known as Hacker Hex.
              An open source developer and security enthusiast based in Bangladesh.
            </p>
            <p>
              I spend most of my time building tools that help people understand
              systems better — penetration testing utilities, local AI scanners,
              and practical scripts that run on Termux and beyond.
            </p>
            <p>
              My approach is simple: stay curious, break things carefully,
              and rebuild them stronger. I debug with <code>console.log()</code>
              and I'm not ashamed of it.
            </p>
            <p className="fun-fact">
              ⚡ Fun fact: Coffee + Code = Magic
            </p>
          </div>

          <div className="about-cards">
            <div className="card info-card">
              <span className="info-label">CURRENT FOCUS</span>
              <span className="info-value">Open Source & Security Tools</span>
            </div>
            <div className="card info-card">
              <span className="info-label">INTERESTS</span>
              <span className="info-value">Pentesting · AI · Community</span>
            </div>
            <div className="card info-card">
              <span className="info-label">EMAIL</span>
              <a href="mailto:cyber17official.bd@gmail.com" className="info-value link">
                cyber17official.bd@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          margin-top: 40px;
        }
        .about-text p {
          color: var(--text-secondary);
          margin-bottom: 16px;
          font-size: 16px;
          line-height: 1.75;
        }
        .about-text strong {
          color: var(--text-primary);
        }
        .about-text code {
          font-family: var(--font-mono);
          font-size: 13px;
          background: var(--bg-surface);
          padding: 2px 6px;
          border-radius: 2px;
          color: var(--accent);
        }
        .fun-fact {
          color: var(--text-muted) !important;
          font-size: 14px !important;
          margin-top: 8px;
        }
        .about-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .info-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .info-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .info-value {
          font-size: 15px;
          color: var(--text-primary);
        }
        .info-value.link {
          color: var(--accent);
          transition: color 0.15s;
        }
        .info-value.link:hover {
          color: var(--accent-hover);
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  )
}
