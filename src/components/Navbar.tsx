import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Journey' },
  { href: '#explore', label: 'Explore' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`hf-nav ${scrolled ? 'on' : ''}`}>
      <div className="container hf-nav-in">
        <a href="#" className="hf-logo" onClick={() => setOpen(false)}>
          <span className="hf-logo-mark">⚡</span>
          <span>BluHExH</span>
        </a>
        <nav className={`hf-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <div className="hf-nav-right">
          <a className="hf-nav-cta" href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">GitHub</a>
          <button className={`hf-burg ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
      <style>{`
        .hf-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          background: rgba(11,11,12,0.7);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: background .2s, border-color .2s;
        }
        .hf-nav.on {
          background: rgba(11,11,12,0.92);
          border-bottom-color: #262628;
        }
        .hf-nav-in {
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hf-logo {
          display: flex; align-items: center; gap: 8px;
          font-weight: 700; font-size: 16px; z-index: 2; color: #F4F4F2;
        }
        .hf-logo-mark {
          width: 28px; height: 28px;
          display: grid; place-items: center;
          background: #FF5A1F; color: #fff;
          border-radius: 8px; font-size: 13px;
        }
        .hf-links { display: flex; gap: 28px; }
        .hf-links a { font-size: 14px; font-weight: 500; color: #A1A1A0; }
        .hf-links a:hover { color: #F4F4F2; }
        .hf-nav-right { display: flex; align-items: center; gap: 10px; }
        .hf-nav-cta {
          background: #FF5A1F; color: #fff;
          font-size: 14px; font-weight: 600;
          padding: 8px 16px; border-radius: 8px;
        }
        .hf-nav-cta:hover { background: #FF6D38; }
        .hf-burg {
          display: none; flex-direction: column; gap: 5px; width: 28px; padding: 4px;
        }
        .hf-burg span {
          display: block; height: 2px; background: #F4F4F2; border-radius: 1px; transition: .2s;
        }
        .hf-burg.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .hf-burg.open span:nth-child(2) { opacity: 0; }
        .hf-burg.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }
        @media (max-width: 800px) {
          .hf-burg { display: flex; }
          .hf-nav-cta { display: none; }
          .hf-links {
            position: fixed; left: 0; right: 0; top: 64px; bottom: 0;
            background: #0B0B0C;
            flex-direction: column; align-items: center; justify-content: flex-start;
            padding-top: 40px; gap: 22px;
            opacity: 0; pointer-events: none; transition: opacity .2s;
          }
          .hf-links.open { opacity: 1; pointer-events: auto; }
          .hf-links a { font-size: 18px; }
        }
      `}</style>
    </header>
  )
}
