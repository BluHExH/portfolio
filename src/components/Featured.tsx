import { useInView } from '../hooks/useInView'

const featured = {
  name: 'LocalVulnAI',
  tag: 'Featured · AI / Security',
  problem:
    'Most vulnerability scanners need cloud APIs or heavy setup. Students and indie hackers on limited machines get left out.',
  solution:
    'A local-first scanner that uses Ollama models offline — explain findings in plain language and suggest fixes without sending code to a third party.',
  stack: ['Python', 'Ollama', 'Security', 'CLI'],
  url: 'https://github.com/BluHExH/LocalVulnAI',
  highlights: [
    'Runs fully offline with local LLMs',
    'Human-readable explanations, not just CVE dumps',
    'Built for low-resource machines and Termux-friendly workflows',
  ],
}

export default function Featured() {
  const { ref, inView } = useInView(0.12)
  return (
    <section id="featured" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Case study</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Featured work</h2>
        <div className={`feat-card reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          <div className="feat-left">
            <span className="feat-tag">{featured.tag}</span>
            <h3 className="feat-name">{featured.name}</h3>
            <div className="feat-block">
              <h4>Problem</h4>
              <p>{featured.problem}</p>
            </div>
            <div className="feat-block">
              <h4>What I built</h4>
              <p>{featured.solution}</p>
            </div>
            <ul className="feat-list">
              {featured.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="feat-stack">
              {featured.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <a className="btn btn-primary" href={featured.url} target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </div>
          <div className="feat-right" aria-hidden>
            <div className="feat-window">
              <div className="feat-bar">
                <span className="t red" /><span className="t yel" /><span className="t grn" />
                <span className="feat-bar-name">localvulnai — scan</span>
              </div>
              <pre>{`$ localvulnai scan ./app\n✓ Loaded model: llama3.2\n✓ Scanning 42 files…\n\n[high] SQL injection risk in auth.py:88\n  → Use parameterized queries\n\n[med] Hardcoded secret in config.py:12\n  → Move to environment variables\n\nScan complete · 2 findings · offline`}</pre>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .feat-card { margin-top: 36px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 28px; padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; }
        .feat-tag { display: inline-block; font-size: 12px; font-weight: 600; color: var(--accent); background: var(--accent-soft); padding: 4px 10px; border-radius: 999px; margin-bottom: 12px; }
        .feat-name { font-size: 28px; font-weight: 800; letter-spacing: -0.03em; margin: 0 0 18px; }
        .feat-block { margin-bottom: 14px; }
        .feat-block h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin: 0 0 6px; }
        .feat-block p { font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin: 0; }
        .feat-list { margin: 0 0 16px; padding-left: 18px; color: var(--text-secondary); font-size: 14px; line-height: 1.7; }
        .feat-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .feat-stack span { font-size: 12px; font-weight: 600; border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; }
        .feat-window { background: #111113; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; min-height: 280px; }
        .feat-bar { display: flex; align-items: center; gap: 6px; padding: 10px 12px; background: #1A1A1D; border-bottom: 1px solid var(--border); }
        .feat-bar .t { width: 10px; height: 10px; border-radius: 50%; }
        .t.red { background: #FF5F57; } .t.yel { background: #FEBC2E; } .t.grn { background: #28C840; }
        .feat-bar-name { margin-left: 8px; font-family: var(--mono); font-size: 11px; color: var(--text-muted); }
        .feat-window pre { margin: 0; padding: 16px; font-family: var(--mono); font-size: 12px; line-height: 1.7; color: #C8C8C8; white-space: pre-wrap; }
        @media (max-width: 800px) { .feat-card { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
