import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Journey' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">BluHExH</span>
        </a>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta mobile-only">GitHub</a>
        </div>
        <div className="nav-right">
          <a href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta desktop-only">GitHub</a>
          <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(250, 250, 249, 0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: all 0.25s ease;
        }
        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.9);
          border-bottom-color: var(--border);
          box-shadow: 0 1px 0 rgba(0,0,0,0.04);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
        .logo { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 17px; z-index: 2; }
        .logo-icon {
          width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
          background: var(--accent); color: #fff; border-radius: 8px; font-size: 14px;
        }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-link { font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: color 0.15s; }
        .nav-link:hover { color: var(--text); }
        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-cta { padding: 8px 16px; font-size: 14px; }
        .mobile-only { display: none; }
        .hamburger { display: none; flex-direction: column; gap: 5px; width: 28px; padding: 4px; }
        .hamburger span { display: block; height: 2px; background: var(--text); border-radius: 1px; transition: all 0.25s; }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        @media (max-width: 800px) {
          .desktop-only { display: none; }
          .mobile-only { display: inline-flex; }
          .hamburger { display: flex; }
          .nav-links {
            position: fixed; inset: 0; top: 64px;
            background: rgba(255,255,255,0.98);
            flex-direction: column; justify-content: flex-start; padding-top: 40px; gap: 24px;
            opacity: 0; pointer-events: none; transition: opacity 0.25s;
          }
          .nav-links.open { opacity: 1; pointer-events: auto; }
          .nav-link { font-size: 18px; }
        }
      `}</style>
    </nav>
  )
}
