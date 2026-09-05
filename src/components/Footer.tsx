export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">
          <span className="logo-mark">◈</span> BLUHEXH
        </span>
        <p className="footer-quote">
          “Stay curious. Break systems. Build better ones.”
        </p>
        <p className="footer-copy">
          © {new Date().getFullYear()} BluHExH · Built with React + Vite
        </p>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-subtle);
          padding: 40px 0;
        }
        .footer-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }
        .footer-logo {
          font-family: var(--font-mono);
          font-size: 13px;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }
        .footer-logo .logo-mark {
          color: var(--accent);
        }
        .footer-quote {
          font-size: 14px;
          color: var(--text-muted);
          font-style: italic;
        }
        .footer-copy {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
      `}</style>
    </footer>
  )
}
