import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="logo">
          <span className="logo-mark">◈</span>
          <span className="logo-text">BLUHEXH</span>
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://github.com/BluHExH"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary nav-cta"
        >
          GitHub →
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: all 0.2s ease-out;
        }
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(12px);
          border-bottom-color: var(--border-subtle);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 0.08em;
        }
        .logo-mark {
          color: var(--accent);
          font-size: 18px;
        }
        .logo-text {
          color: var(--text-primary);
        }
        .nav-links {
          display: flex;
          gap: 32px;
        }
        .nav-link {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          transition: color 0.15s;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
        .nav-cta {
          padding: 8px 16px;
          font-size: 12px;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  )
}
