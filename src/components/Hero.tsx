import { useEffect, useState } from 'react'

const words = ['things that break', 'Termux tools', 'local AI scanners', 'stuff people can fork']

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
        if (next === full) setTimeout(() => setDel(true), 1600)
      } else {
        const next = full.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDel(false)
          setI((x) => (x + 1) % words.length)
        }
      }
    }, del ? 36 : 68)
    return () => clearTimeout(t)
  }, [text, del, i])

  return (
    <section className="hf-hero">
      <div className="hf-bg" />

      <div className="hf-float hf-left">
        <div className="hf-win">
          <div className="hf-win-bar">
            <span className="t red" />
            <span className="t yel" />
            <span className="t grn" />
            <span className="hf-win-name">session.log</span>
          </div>
          <pre className="hf-win-code">{`$ python localvuln.py ./app
[+] offline mode
[+] 3 findings
[~] no cloud calls`}</pre>
        </div>
      </div>

      <div className="hf-float hf-right">
        <div className="hf-win">
          <div className="hf-win-bar">
            <span className="t red" />
            <span className="t yel" />
            <span className="t grn" />
            <span className="hf-win-name">notes.txt</span>
          </div>
          <pre className="hf-win-code">{`build on a phone if you have to.
ship ugly first.
fix it when it hurts.

— BluHExH`}</pre>
        </div>
      </div>

      <div className="hf-score">
        <div className="hf-score-top">
          <span>//</span>
          <span>public repos</span>
        </div>
        <div className="hf-score-mid">
          <span className="hf-score-n">67</span>
          <span className="hf-score-pill">live</span>
        </div>
        <div className="hf-score-bar">
          <i />
        </div>
        <p className="hf-score-note">not all of them are good. some taught me more.</p>
      </div>

      <div className="hf-center">
        <p className="hf-kicker">Bangladesh · builds in public</p>
        <h1 className="hf-h1">
          I make
          <br />
          <span className="hf-orange">
            {text}
            <span className="hf-cursor">|</span>
          </span>
        </h1>
        <p className="hf-sub">
          I am BluHExH. I write security tools, small scanners, and open source
          utilities — usually because I needed them myself at 2 AM.
        </p>
        <div className="hf-btns">
          <a className="hf-btn-primary" href="#projects">
            See the work
          </a>
          <a className="hf-btn-ghost" href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
        </div>
        <div className="hf-trust">
          <span>Python when it matters</span>
          <span>Termux-friendly</span>
          <span>Offline &gt; fancy</span>
        </div>
      </div>

      <div className="hf-scroll">
        <span />
      </div>

      <style>{heroCss}</style>
    </section>
  )
}

const heroCss = `
.hf-hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:110px 24px 90px;overflow:hidden}
.hf-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% -10%,rgba(255,90,31,.10),transparent 55%),#0B0B0C;z-index:0}
.hf-bg::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.035) 1px,transparent 1px);background-size:26px 26px;mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 15%,transparent 75%)}
.hf-center{position:relative;z-index:5;max-width:640px;text-align:left;margin:0 auto}
.hf-kicker{font-family:var(--mono),ui-monospace,monospace;font-size:12px;color:#8A8A8A;letter-spacing:.06em;text-transform:uppercase;margin:0 0 16px}
.hf-h1{font-family:Inter,system-ui,sans-serif;font-size:clamp(40px,6.5vw,64px);font-weight:800;letter-spacing:-.045em;line-height:1.05;color:#F4F4F2;margin:0 0 20px}
.hf-orange{color:#FF5A1F;display:inline;min-width:2ch}
.hf-cursor{display:inline-block;color:#FF5A1F;font-weight:400;margin-left:2px;animation:hfBlink 1s step-end infinite}
@keyframes hfBlink{50%{opacity:0}}
.hf-sub{font-size:17px;line-height:1.75;color:#A1A1A0;max-width:500px;margin:0 0 28px}
.hf-btns{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:26px}
.hf-btn-primary{display:inline-flex;align-items:center;gap:8px;background:#FF5A1F;color:#fff;font-weight:600;font-size:15px;padding:13px 22px;border-radius:10px;box-shadow:0 6px 24px rgba(255,90,31,.35);transition:transform .15s,background .15s}
.hf-btn-primary:hover{background:#FF6D38;transform:translateY(-1px)}
.hf-btn-ghost{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#F4F4F2;font-weight:600;font-size:15px;padding:13px 22px;border-radius:10px;border:1px solid #343438;transition:border-color .15s,transform .15s}
.hf-btn-ghost:hover{border-color:#555;transform:translateY(-1px)}
.hf-trust{display:flex;flex-wrap:wrap;gap:10px 18px;font-size:13px;color:#6B6B6A;font-family:var(--mono),ui-monospace,monospace}
.hf-float{position:absolute;z-index:3;pointer-events:none}
.hf-left{left:max(12px,calc(50% - 560px));top:16%;animation:hfFloat 5.5s ease-in-out infinite}
.hf-right{right:max(12px,calc(50% - 540px));top:28%;animation:hfFloat 6.5s ease-in-out infinite reverse}
@keyframes hfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.hf-win{width:240px;background:#141416;border-radius:12px;box-shadow:0 28px 60px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.06);overflow:hidden;text-align:left}
.hf-win-bar{display:flex;align-items:center;gap:6px;padding:10px 12px;background:#1C1C1F;border-bottom:1px solid #2A2A2E}
.hf-win-bar .t{width:10px;height:10px;border-radius:50%}
.t.red{background:#FF5F57}.t.yel{background:#FEBC2E}.t.grn{background:#28C840}
.hf-win-name{margin-left:8px;font-size:11px;color:#8A8A8A;font-family:"JetBrains Mono",ui-monospace,monospace}
.hf-win-code{margin:0;padding:14px;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:11.5px;line-height:1.7;color:#C8C8C8;white-space:pre-wrap}
.hf-score{position:absolute;z-index:3;left:max(12px,calc(50% - 520px));bottom:14%;width:220px;background:#161618;border:1px solid #262628;border-radius:14px;padding:16px 18px;box-shadow:0 20px 50px rgba(0,0,0,.5);text-align:left;animation:hfFloat 7s ease-in-out infinite}
.hf-score-top{display:flex;align-items:center;gap:6px;font-size:12px;color:#8A8A8A;margin-bottom:6px;font-family:"JetBrains Mono",ui-monospace,monospace}
.hf-score-mid{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.hf-score-n{font-size:34px;font-weight:800;letter-spacing:-.04em;color:#F4F4F2}
.hf-score-pill{font-size:11px;font-weight:600;color:#4ADE80;background:rgba(74,222,128,.12);padding:3px 8px;border-radius:999px}
.hf-score-bar{height:5px;background:#262628;border-radius:99px;overflow:hidden;margin-bottom:10px}
.hf-score-bar i{display:block;width:78%;height:100%;background:linear-gradient(90deg,#FF5A1F,#FF8A50);border-radius:99px}
.hf-score-note{font-size:11px;line-height:1.45;color:#6B6B6A;margin:0}
.hf-scroll{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);z-index:5}
.hf-scroll span{display:block;width:22px;height:34px;border:2px solid #343438;border-radius:12px;position:relative}
.hf-scroll span::after{content:"";position:absolute;top:6px;left:50%;width:3px;height:8px;margin-left:-1.5px;background:#FF5A1F;border-radius:2px;animation:hfScroll 1.6s ease-in-out infinite}
@keyframes hfScroll{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(12px)}}
@media (max-width:1100px){.hf-float,.hf-score{display:none}}
@media (max-width:600px){.hf-center{text-align:left}.hf-h1{font-size:34px}.hf-sub{font-size:15px}}
`
