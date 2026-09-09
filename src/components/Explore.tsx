import { useEffect, useRef, useState } from 'react'

const FULL_TEXT = [
  'I do not explore for a tagline.',
  '',
  'I open a terminal because something is broken, slow, or unfair — and I want to see the seams.',
  '',
  'Security, for me, is literacy. If you understand a system, you stop treating it like magic and start treating it like engineering.',
  '',
  'I ship tools for cheap laptops and phones on purpose. If it only works on a $2k machine, it is not the kind of open source I care about.',
  '',
  'Local AI, Termux, small scanners, messy first versions. That is the lane.',
  '',
  'If you are reading this while scrolling: thanks for staying. Go break something carefully, then build a better version.',
].join('\n')

function playTypeSound(ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = 1100 + Math.random() * 400
  gain.gain.value = 0.018
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
  osc.stop(ctx.currentTime + 0.035)
}

const css = `
.explore-section { position: relative; height: 280vh; }
.explore-sticky {
  position: sticky; top: 0; min-height: 100vh;
  display: flex; align-items: center;
  padding: 90px 0 60px; overflow: hidden;
}
.explore-inner { position: relative; z-index: 1; width: 100%; max-width: 760px; }
.explore-terminal {
  background: #121214;
  border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4); min-height: 320px;
}
.explore-bar {
  display: flex; align-items: center; gap: 6px; padding: 11px 14px;
  background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border);
}
.explore-bar .t { width: 10px; height: 10px; border-radius: 50%; }
.t.red { background: #FF5F57; } .t.yel { background: #FEBC2E; } .t.grn { background: #28C840; }
.explore-bar-title { margin-left: 10px; font-family: var(--mono); font-size: 12px; color: var(--text-muted); }
.explore-text {
  margin: 0; padding: 26px 24px 30px; font-family: var(--mono);
  font-size: clamp(14px, 1.55vw, 16px); line-height: 1.85; color: #DCDCD8;
  white-space: pre-wrap; word-break: break-word; min-height: 260px;
}
.explore-caret {
  display: inline-block; width: 8px; height: 1.1em; margin-left: 2px;
  vertical-align: text-bottom; background: #FF5A1F; border-radius: 1px;
  animation: caretPulse 0.9s ease-in-out infinite;
}
@keyframes caretPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
@media (max-width: 600px) {
  .explore-section { height: 240vh; }
  .explore-text { padding: 18px 14px 22px; }
}
`

export default function Explore() {
  const sectionRef = useRef<HTMLElement>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const lastLen = useRef(0)
  const [visibleLen, setVisibleLen] = useState(0)

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
      setVisibleLen(next)

      if (next !== lastLen.current) {
        const growing = next > lastLen.current
        lastLen.current = next
        if (growing && next > 0 && next % 4 === 0) {
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

  const shown = FULL_TEXT.slice(0, visibleLen)

  return (
    <section id="explore" className="explore-section" ref={sectionRef}>
      <div className="explore-sticky">
        <div className="container explore-inner">
          <div className="explore-terminal">
            <div className="explore-bar">
              <span className="t red" />
              <span className="t yel" />
              <span className="t grn" />
              <span className="explore-bar-title">notes / why.txt</span>
            </div>
            <pre className="explore-text">
              {shown}
              <span className="explore-caret" />
            </pre>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
