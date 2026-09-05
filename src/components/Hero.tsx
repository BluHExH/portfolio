export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">OPEN SOURCE DEVELOPER · BANGLADESH</p>

          <h1 className="hero-title">
            <span className="line-white">STAY CURIOUS.</span>
            <span className="line-accent">BREAK SYSTEMS.</span>
            <span className="line-white">BUILD BETTER ONES.</span>
          </h1>

          <p className="hero-desc">
            I build security tools, pentest utilities, and open source projects.
            From Termux toolkits to local AI vulnerability scanners — I turn
            curiosity into code that matters.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects →
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-header">
            <span className="panel-dot" />
            <span>// LIVE STATUS</span>
          </div>
          <div className="panel-row">
            <span className="label">STATUS</span>
            <span className="value online">ONLINE</span>
          </div>
          <div className="panel-row">
            <span className="label">FOCUS</span>
            <span className="value">SECURITY / OS</span>
          </div>
          <div className="panel-row">
            <span className="label">LOCATION</span>
            <span className="value">BANGLADESH</span>
          </div>
          <div className="panel-row">
            <span className="label">PUBLIC REPOS</span>
            <span className="value accent">65+</span>
          </div>
          <div className="panel-row">
            <span className="label">ROLE</span>
            <span className="value">BUILDER</span>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 0 80px;
          position: relative;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }
        .hero-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          color: var(--accent);
          margin-bottom: 20px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 7vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .line-white { display: block; color: var(--text-primary); }
        .line-accent { display: block; color: var(--accent); }
        .hero-desc {
          color: var(--text-secondary);
          font-size: 16px;
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .hero-panel {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          padding: 20px 24px;
          min-width: 240px;
          font-family: var(--font-mono);
          font-size: 12px;
        }
        .panel-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
          letter-spacing: 0.08em;
        }
        .panel-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--status-online);
          box-shadow: 0 0 8px var(--status-online);
        }
        .panel-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .panel-row:last-child { border-bottom: none; }
        .label { color: var(--text-muted); letter-spacing: 0.06em; }
        .value { color: var(--text-primary); }
        .value.online { color: var(--status-online); }
        .value.accent { color: var(--accent); }
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }
        .scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, var(--border-strong), transparent);
        }
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-panel { max-width: 280px; }
        }
      `}</style>
    </section>
  )
}
