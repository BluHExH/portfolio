export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a
          className="footer-giant"
          href="https://github.com/BluHExH"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="BluHExH on GitHub"
        >
          BluHExH
        </a>
        <p className="footer-handle">@BluHExH · GitHub</p>
        <p className="footer-quote">Stay curious. Break systems. Build better ones.</p>
        <div className="footer-links">
          <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:cyber17official.bd@gmail.com">Email</a>
          <a href="#projects">Projects</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} BluHExH</p>
      </div>
      <style>{css}</style>
    </footer>
  )
}

const css = `
.footer {
  border-top: 1px solid var(--border);
  padding: 64px 0 40px;
  background: var(--surface);
  overflow: hidden;
}
.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}
.footer-giant {
  font-family: Inter, system-ui, sans-serif;
  font-size: clamp(56px, 14vw, 140px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.9;
  background: linear-gradient(180deg, #F4F4F2 0%, #F4F4F2 40%, rgba(244,244,242,0.15) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: filter 0.3s ease, transform 0.3s ease;
  user-select: none;
}
.footer-giant:hover {
  filter: drop-shadow(0 0 40px rgba(255, 90, 31, 0.35));
  transform: scale(1.02);
}
.footer-handle {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.04em;
  margin-top: 4px;
}
.footer-quote {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 360px;
}
.footer-links {
  display: flex;
  gap: 24px;
  margin: 8px 0 4px;
}
.footer-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}
.footer-links a:hover { color: var(--accent); }
.footer-copy {
  font-size: 13px;
  color: var(--text-muted);
}
`
