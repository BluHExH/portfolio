import { useEffect, useRef, useState } from 'react'

const FULL_TEXT = [
  'I explore systems the way others explore cities — by getting lost on purpose.',
  '',
  'Security is not just breaking things. It is understanding why they break, and what that teaches about trust, design, and human error.',
  '',
  'I dig into open source because code should be readable, forkable, and free to improve. Tools only matter if someone can use them at 2 AM on a cheap laptop.',
  '',
  'I care about local AI, Termux workflows, pentest utilities, and small scripts that solve real problems. Fancy stacks are optional. Working software is not.',
  '',
  'My dream is simple: ship things that help people learn systems, not fear them. Stay curious. Break carefully. Build better ones.',
].join('\n')

function playTypeSound(ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = 1200 + Math.random() * 500
  gain.gain.value = 0.02
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
  osc.stop(ctx.currentTime + 0.035)
}

const css = `
.explore-section { position: relative; height: 300vh; }
.explore-sticky {
  position: sticky; top: 0; min-height: 100vh;
  display: flex; align-items: center;
  padding: 100px 0 60px; background: var(--bg); overflow: hidden;
}
.explore-glow {
  position: absolute; width: 520px; height: 520px;
  left: 50%; top: 40%; transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255,90,31,0.25), transparent 65%);
  pointer-events: none; transition: opacity 0.3s ease; filter: blur(10px);
}
.explore-inner { position: relative; z-index: 1; width: 100%; max-width: 820px; }
.title-accent {
  background: linear-gradient(90deg, #FF5A1F, #FF9A5C);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.explore-hint { font-size: 14px; color: var(--text-muted); margin: -4px 0 28px; }
.explore-terminal {
  background: linear-gradient(180deg, #141416 0%, #101012 100%);
  border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(0,0,0,0.45); min-height: 340px;
  transition: border-color 0.35s ease, box-shadow 0.35s ease;
}
.explore-terminal.live {
  border-color: rgba(255, 90, 31, 0.35);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,90,31,0.08), 0 0 40px rgba(255,90,31,0.08);
}
.explore-terminal.complete { border-color: rgba(74, 222, 128, 0.25); }
.explore-bar {
  display: flex; align-items: center; gap: 6px; padding: 12px 14px;
  background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border);
}
.explore-bar .t { width: 10px; height: 10px; border-radius: 50%; }
.t.red { background: #FF5F57; } .t.yel { background: #FEBC2E; } .t.grn { background: #28C840; }
.explore-bar-title { margin-left: 10px; font-family: var(--mono); font-size: 12px; color: var(--text-muted); }
.explore-progress {
  flex: 1; max-width: 120px; height: 3px; margin-left: 16px;
  background: #262628; border-radius: 99px; overflow: hidden;
}
.explore-progress-fill {
  height: 100%; background: linear-gradient(90deg, #FF5A1F, #FF9A5C);
  border-radius: 99px; transition: width 0.05s linear;
}
.explore-status {
  margin-left: 12px; font-family: var(--mono); font-size: 11px;
  color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;
}
.explore-status.typing { color: var(--accent); }
.explore-status.done { color: #4ADE80; }
.explore-text {
  margin: 0; padding: 28px 26px 32px; font-family: var(--mono);
  font-size: clamp(14px, 1.6vw, 16.5px); line-height: 1.9; color: #E4E4E1;
  white-space: pre-wrap; word-break: break-word; min-height: 280px;
}
.explore-text .ch {
  display: inline;
  transition: color 0.4s ease, text-shadow 0.4s ease, opacity 0.25s ease;
}
.explore-text .ch.fresh {
  color: #FFB48A;
  text-shadow: 0 0 12px rgba(255, 90, 31, 0.55);
  animation: charIn 0.22s ease-out;
}
.explore-text .ch.settled { color: #D8D8D5; text-shadow: none; }
@keyframes charIn {
  from { opacity: 0.35; filter: blur(2px); }
  to { opacity: 1; filter: blur(0); }
}
.explore-caret {
  display: inline-block; width: 9px; height: 1.15em; margin-left: 2px;
  vertical-align: text-bottom; background: linear-gradient(180deg, #FF5A1F, #FF8A50);
  border-radius: 1px; opacity: 0; box-shadow: 0 0 10px rgba(255, 90, 31, 0.6);
}
.explore-caret.on {
  opacity: 1; animation: caretPulse 0.85s ease-in-out infinite;
}
@keyframes caretPulse {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.25; transform: scaleY(0.92); }
}
.explore-meta {
  display: flex; justify-content: space-between; margin-top: 14px;
  font-family: var(--mono); font-size: 11px; color: var(--text-muted); letter-spacing: 0.04em;
}
@media (max-width: 600px) {
  .explore-section { height: 260vh; }
  .explore-text { padding: 20px 16px 24px; min-height: 300px; }
  .explore-progress { display: none; }
}
`

export default function Explore() {
  const sectionRef = useRef<HTMLElement>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const lastLen = useRef(0)
  const [visibleLen, setVisibleLen] = useState(0)
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = el.offsetHeight - vh
      const scrolled = -rect.top
      const p = Math.min(1, Math.max(0, scrolled / Math.max(total, 1)))
      const next = Math.floor(p * FULL_TEXT.length)
      setProgress(p)
      setVisibleLen(next)
      setActive(p > 0.02 && p < 0.98)

      if (next !== lastLen.current) {
        const growing = next > lastLen.current
        lastLen.current = next
        if (growing && next > 0 && next % 3 === 0) {
          try {
            if (!audioRef.current) {
              audioRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }
            const ctx = audioRef.current
            if (ctx.state === 'suspended') ctx.resume()
            playTypeSound(ctx)
          } catch {
            /* ignore */
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const chars = FULL_TEXT.slice(0, visibleLen).split('')
  const done = visibleLen >= FULL_TEXT.length
  const termClass =
    'explore-terminal' +
    (active ? ' live' : '') +
    (done ? ' complete' : '')
  const statusClass =
    'explore-status' +
    (done ? ' done' : active ? ' typing' : '')
  const caretClass = 'explore-caret' + (!done || active ? ' on' : '')

  return (
    <section id="explore" className="explore-section" ref={sectionRef}>
      <div className="explore-sticky">
        <div className="explore-glow" style={{ opacity: 0.15 + progress * 0.35 }} aria-hidden />
        <div className="container explore-inner">
          <p className="section-label">Dream / Explore</p>
          <h2 className="section-title">
            <span className="title-line">What I</span>{' '}
            <span className="title-accent">explore</span>
          </h2>
          <p className="explore-hint">
            {active ? 'Scroll to write · scroll up to erase' : 'Scroll through this section'}
          </p>

          <div className={termClass}>
            <div className="explore-bar">
              <span className="t red" />
              <span className="t yel" />
              <span className="t grn" />
              <span className="explore-bar-title">explore.txt</span>
              <div className="explore-progress">
                <div
                  className="explore-progress-fill"
                  style={{ width: progress * 100 + '%' }}
                />
              </div>
              <span className={statusClass}>
                {done ? 'complete' : active ? 'typing…' : 'ready'}
              </span>
            </div>
            <div className="explore-text" aria-live="polite">
              {chars.map((ch, i) => {
                const isNew = i >= visibleLen - 4
                const chClass = 'ch ' + (isNew ? 'fresh' : 'settled')
                return (
                  <span key={i} className={chClass}>
                    {ch}
                  </span>
                )
              })}
              <span className={caretClass} />
            </div>
          </div>

          <div className="explore-meta">
            <span>{Math.round(progress * 100)}%</span>
            <span>
              {visibleLen} / {FULL_TEXT.length} chars
            </span>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
