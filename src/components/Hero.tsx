import { useEffect, useState } from 'react'

const words = ['security tools', 'open source', 'pentest kits', 'AI scanners']

export default function Hero() {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const full = words[i]
    const t = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1)
        setText(next)
        if (next === full) setTimeout(() => setDel(true), 1800)
      } else {
        const next = full.slice(0, text.length - 1)
        setText(next)
        if (next === '') { setDel(false); setI((x) => (x + 1) % words.length) }
      }
    }, del ? 40 : 70)
    return () => clearTimeout(t)
  }, [text, del, i])

  return (
    <section className="hf-hero">
      <div className="hf-bg" />

      <div className="hf-float hf-left">
        <div className="hf-win">
          <div className="hf-win-bar">
            <span className="t red" /><span className="t yel" /><span className="t grn" />
            <span className="hf-win-name">README.md</span>
          </div>
          <pre className="hf-win-code">{`# My Awesome Project

![TypeScript](badge_url)
![React](badge_url)

## Features
- AI-powered docs
- One-click export`}</pre>
        </div>
      </div>

      <div className="hf-float hf-right">
        <div className="hf-win">
          <div className="hf-win-bar">
            <span className="t red" /><span className="t yel" /><span className="t grn" />
            <span className="hf-win-name">profile.md</span>
          </div>
          <pre className="hf-win-code">{`<h1>Hi, I'm BluHExH</h1>
<p>Security · Open Source</p>

Building LocalVulnAI
Learning systems
Coffee + Code = Magic`}</pre>
        </div>
      </div>

      <div className="hf-score">
        <div className="hf-score-top"><span>⚡</span><span>Public repos</span></div>
        <div className="hf-score-mid">
          <span className="hf-score-n">65</span>
          <span className="hf-score-d">+</span>
          <span className="hf-score-pill">Active</span>
        </div>
        <div className="hf-score-bar"><i /></div>
      </div>

      <div className="hf-center">
        <h1 className="hf-h1">
          The builder who ships
          <br />
          <span className="hf-orange">{text}<span className="hf-cursor">|</span></span>
        </h1>
        <p className="hf-sub">
          BluHExH is an open-source developer & security enthusiast from Bangladesh —
          building pentest tools, AI scanners, and practical software in the open.
        </p>
        <div className="hf-btns">
          <a className="hf-btn-primary" href="#projects"><span>⚡</span> View projects</a>
          <a className="hf-btn-ghost" href="#contact">Contact me <span>→</span></a>
        </div>
        <div className="hf-trust">
          <span><i className="dot" /> Open source</span>
          <span><i className="dot" /> Security focused</span>
          <span><i className="dot" /> No fluff</span>
          <span><i className="dot" /> 65+ public repos</span>
        </div>
      </div>

      <div className="hf-scroll"><span /></div>

      <style>{`
.hf-hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:110px 24px 90px;overflow:hidden}
.hf-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% -10%,rgba(255,90,31,.12),transparent 55%),radial-gradient(ellipse 40% 30% at 80% 80%,rgba(255,90,31,.06),transparent 50%),#0B0B0C;z-index:0}
.hf-bg::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:24px 24px;mask-image:radial-gradient(ellipse 75% 65% at 50% 40%,#000 20%,transparent 75%)}
.hf-center{position:relative;z-index:5;max-width:720px;text-align:center;margin:0 auto}
.hf-h1{font-family:Inter,system-ui,sans-serif;font-size:clamp(42px,7vw,68px);font-weight:800;letter-spacing:-.045em;line-height:1.05;color:#F4F4F2;margin:0 0 22px}
.hf-orange{color:#FF5A1F;display:inline-block;min-width:2ch}
.hf-cursor{display:inline-block;color:#FF5A1F;font-weight:400;margin-left:2px;animation:hfBlink 1s step-end infinite}
@keyframes hfBlink{50%{opacity:0}}
.hf-sub{font-size:17px;line-height:1.7;color:#A1A1A0;max-width:520px;margin:0 auto 28px}
.hf-btns{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:28px}
.hf-btn-primary{display:inline-flex;align-items:center;gap:8px;background:#FF5A1F;color:#fff;font-weight:600;font-size:15px;padding:13px 22px;border-radius:10px;box-shadow:0 6px 24px rgba(255,90,31,.4);transition:transform .15s,background .15s}
.hf-btn-primary:hover{background:#FF6D38;transform:translateY(-1px)}
.hf-btn-ghost{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#F4F4F2;font-weight:600;font-size:15px;padding:13px 22px;border-radius:10px;border:1px solid #343438;transition:border-color .15s,transform .15s,background .15s}
.hf-btn-ghost:hover{border-color:#555;background:rgba(255,255,255,.03);transform:translateY(-1px)}
.hf-trust{display:flex;justify-content:center;flex-wrap:wrap;gap:18px 22px;font-size:13px;color:#6B6B6A}
.hf-trust .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#FF5A1F;margin-right:6px;vertical-align:middle;opacity:.8}
.hf-float{position:absolute;z-index:3;pointer-events:none}
.hf-left{left:max(16px,calc(50% - 560px));top:18%;animation:hfFloat 5.5s ease-in-out infinite}
.hf-right{right:max(16px,calc(50% - 540px));top:26%;animation:hfFloat 6.5s ease-in-out infinite reverse}
@keyframes hfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
.hf-win{width:250px;background:#141416;border-radius:12px;box-shadow:0 28px 60px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06);overflow:hidden;text-align:left}
.hf-win-bar{display:flex;align-items:center;gap:6px;padding:10px 12px;background:#1C1C1F;border-bottom:1px solid #2A2A2E}
.hf-win-bar .t{width:10px;height:10px;border-radius:50%}
.t.red{background:#FF5F57}.t.yel{background:#FEBC2E}.t.grn{background:#28C840}
.hf-win-name{margin-left:8px;font-size:11px;color:#8A8A8A;font-family:"JetBrains Mono",ui-monospace,monospace}
.hf-win-code{margin:0;padding:14px 14px 16px;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11.5px;line-height:1.7;color:#C8C8C8;white-space:pre-wrap}
.hf-score{position:absolute;z-index:3;left:max(16px,calc(50% - 520px));bottom:16%;width:210px;background:#161618;border:1px solid #262628;border-radius:14px;padding:16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.5);text-align:left;animation:hfFloat 7s ease-in-out infinite}
.hf-score-top{display:flex;align-items:center;gap:6px;font-size:12px;color:#8A8A8A;margin-bottom:6px}
.hf-score-mid{display:flex;align-items:baseline;gap:2px;margin-bottom:10px}
.hf-score-n{font-size:34px;font-weight:800;letter-spacing:-.04em;color:#F4F4F2}
.hf-score-d{font-size:16px;color:#6B6B6A;margin-right:8px}
.hf-score-pill{margin-left:auto;font-size:11px;font-weight:600;color:#4ADE80;background:rgba(74,222,128,.12);padding:3px 8px;border-radius:999px}
.hf-score-bar{height:6px;background:#262628;border-radius:99px;overflow:hidden}
.hf-score-bar i{display:block;width:82%;height:100%;background:linear-gradient(90deg,#FF5A1F,#FF8A50);border-radius:99px}
.hf-scroll{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);z-index:5}
.hf-scroll span{display:block;width:22px;height:34px;border:2px solid #343438;border-radius:12px;position:relative}
.hf-scroll span::after{content:"";position:absolute;top:6px;left:50%;width:3px;height:8px;margin-left:-1.5px;background:#FF5A1F;border-radius:2px;animation:hfScroll 1.6s ease-in-out infinite}
@keyframes hfScroll{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(12px)}}
@media (max-width:1100px){.hf-float,.hf-score{display:none}}
@media (max-width:600px){.hf-h1{font-size:34px}.hf-sub{font-size:15px}}
      `}</style>
    </section>
  )
}
