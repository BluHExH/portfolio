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
        <p className="footer-handle">github.com/BluHExH</p>
        <p className="footer-quote">Built in public. Fixed in public.</p>
        <div className="footer-links">
          <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:cyber17official.bd@gmail.com">Email</a>
          <a href="#projects">Projects</a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} · still learning</p>
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
  gap: 12px;
  text-align: center;
}
.footer-giant {
  font-family: Inter, system-ui, sans-serif;
  font-size: clamp(52px, 13vw, 120px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.9;
  background: linear-gradient(180deg, #F4F4F2 0%, #F4F4F2 40%, rgba(244,244,242,0.12) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: filter 0.3s ease;
}
.footer-giant:hover {
  filter: drop-shadow(0 0 36px rgba(255, 90, 31, 0.3));
}
.footer-handle {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent);
}
.footer-quote {
  font-size: 14px;
  color: var(--text-muted);
}
.footer-links {
  display: flex;
  gap: 24px;
  margin: 6px 0 2px;
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
