export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">⚡</span>
          <span>BluHExH</span>
        </div>
        <p className="footer-quote">Stay curious. Break systems. Build better ones.</p>
        <div className="footer-links">
          <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:cyber17official.bd@gmail.com">Email</a>
          <a href="#projects">Projects</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} BluHExH</p>
      </div>
      <style>{`
        .footer { border-top: 1px solid var(--border); padding: 48px 0 40px; background: var(--surface); }
        .footer-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
        .footer-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 16px; }
        .footer-brand .logo-icon {
          width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;
          background: var(--accent); color: #fff; border-radius: 7px; font-size: 13px;
        }
        .footer-quote { font-size: 14px; color: var(--text-muted); }
        .footer-links { display: flex; gap: 24px; margin: 4px 0; }
        .footer-links a { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
        .footer-links a:hover { color: var(--accent); }
        .footer-copy { font-size: 13px; color: var(--text-muted); }
      `}</style>
    </footer>
  )
}
