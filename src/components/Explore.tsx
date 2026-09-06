import { useEffect, useRef, useState } from 'react'

const FULL_TEXT = `I explore systems the way others explore cities — by getting lost on purpose.

Security is not just breaking things. It is understanding why they break, and what that teaches about trust, design, and human error.

I dig into open source because code should be readable, forkable, and free to improve. Tools only matter if someone can use them at 2 AM on a cheap laptop.

I care about local AI, Termux workflows, pentest utilities, and small scripts that solve real problems. Fancy stacks are optional. Working software is not.

My dream is simple: ship things that help people learn systems, not fear them. Stay curious. Break carefully. Build better ones.`

function playTypeSound(ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'square'
  osc.frequency.value = 800 + Math.random() * 400
  gain.gain.value = 0.03
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
  osc.stop(ctx.currentTime + 0.05)
}

export default function Explore() {
  const sectionRef = useRef<HTMLElement>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const lastLen = useRef(0)
  const [visibleLen, setVisibleLen] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = el.offsetHeight - vh
      const scrolled = -rect.top
      const progress = Math.min(1, Math.max(0, scrolled / Math.max(total, 1)))
      const next = Math.floor(progress * FULL_TEXT.length)
      setVisibleLen(next)
      setActive(progress > 0 && progress < 1)

      if (next !== lastLen.current) {
        const growing = next > lastLen.current
        lastLen.current = next
        if (growing && next > 0 && next % 2 === 0) {
          try {
            if (!audioRef.current) {
              audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }
            const ctx = audioRef.current
            if (ctx.state === 'suspended') ctx.resume()
            playTypeSound(ctx)
          } catch { /* ignore */ }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shown = FULL_TEXT.slice(0, visibleLen)
  const done = visibleLen >= FULL_TEXT.length

  return (
    <section id="explore" className="explore-section" ref={sectionRef}>
      <div className="explore-sticky">
        <div className="container explore-inner">
          <p className="section-label">Dream / Explore</p>
          <h2 className="section-title">What I explore</h2>
          <p className="explore-hint">
            {active ? 'Scroll to type · scroll up to erase' : 'Scroll through this section'}
          </p>

          <div className="explore-terminal">
            <div className="explore-bar">
              <span className="t red" /><span className="t yel" /><span className="t grn" />
              <span className="explore-bar-title">explore.txt</span>
              <span className={`explore-status ${done ? 'done' : active ? 'typing' : ''}`}>
                {done ? 'complete' : active ? 'typing…' : 'ready'}
              </span>
            </div>
            <pre className="explore-text">
              <span>{shown}</span>
              <span className={`explore-caret ${active || !done ? 'on' : ''}`}>▋</span>
            </pre>
          </div>
        </div>
      </div>

      <style>{`
        .explore-section {
          position: relative;
          height: 280vh;
        }
        .explore-sticky {
          position: sticky;
          top: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
          background: var(--bg);
        }
        .explore-inner {
          width: 100%;
          max-width: 820px;
        }
        .explore-hint {
          font-size: 14px;
          color: var(--text-muted);
          margin: -4px 0 28px;
        }
        .explore-terminal {
          background: #111113;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          min-height: 320px;
        }
        .explore-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 12px 14px;
          background: #1A1A1D;
          border-bottom: 1px solid var(--border);
        }
        .explore-bar .t {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .t.red { background: #FF5F57; }
        .t.yel { background: #FEBC2E; }
        .t.grn { background: #28C840; }
        .explore-bar-title {
          margin-left: 10px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-muted);
        }
        .explore-status {
          margin-left: auto;
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .explore-status.typing { color: var(--accent); }
        .explore-status.done { color: #4ADE80; }
        .explore-text {
          margin: 0;
          padding: 28px 26px 32px;
          font-family: var(--mono);
          font-size: clamp(14px, 1.6vw, 16px);
          line-height: 1.85;
          color: #D6D6D4;
          white-space: pre-wrap;
          word-break: break-word;
          min-height: 260px;
        }
        .explore-caret {
          color: var(--accent);
          opacity: 0;
          margin-left: 1px;
        }
        .explore-caret.on {
          opacity: 1;
          animation: caretBlink 0.9s step-end infinite;
        }
        @keyframes caretBlink {
          50% { opacity: 0; }
        }
        @media (max-width: 600px) {
          .explore-section { height: 240vh; }
          .explore-text { padding: 20px 16px 24px; min-height: 280px; }
        }
      `}</style>
    </section>
  )
}
