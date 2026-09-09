import { useInView } from '../hooks/useInView'

const css = `
.about-wrap { margin-top: 28px; max-width: 720px; }
.about-wrap p {
  color: var(--text-secondary);
  margin-bottom: 16px;
  font-size: 17px;
  line-height: 1.8;
}
.about-wrap strong { color: var(--text); font-weight: 600; }
.about-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.about-note {
  margin-top: 28px;
  padding: 16px 18px;
  border-left: 3px solid var(--accent);
  background: rgba(255,90,31,0.05);
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 560px;
}
`

export default function About() {
  const { ref, inView } = useInView(0.15)
  const vis = inView ? ' visible' : ''

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <p className={'section-label reveal' + vis}>About</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Not a brand. Just me.</h2>
        <div className={'about-wrap reveal reveal-delay-2' + vis}>
          <p>
            I go by <strong>BluHExH</strong>. I live in Bangladesh. I break things to understand
            them, then I try to leave a tool behind so the next person does not start from zero.
          </p>
          <p>
            Most of my repos are for problems I hit myself — Termux workflows, offline scanning,
            OSINT shortcuts, small scripts that should not need a SaaS account. Some projects are
            rough. A few are useful. All of them taught me something.
          </p>
          <p>
            I care more about whether it runs on a weak machine than whether the README looks
            fancy. If it helps one student learn systems without fear, that is enough.
          </p>
          <div className="about-note">
            Currently deep on local AI security tooling and keeping as much of the pipeline offline
            as possible. Cloud is optional. Understanding is not.
          </div>
          <div className="about-actions">
            <a
              href="https://github.com/BluHExH"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              GitHub
            </a>
            <a href="mailto:cyber17official.bd@gmail.com" className="btn btn-secondary">
              Email
            </a>
          </div>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
