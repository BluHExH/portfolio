import { FormEvent, useState } from 'react'
import { useInView } from '../hooks/useInView'

const EMAIL = 'cyber17official.bd@gmail.com'

export default function Contact() {
  const { ref, inView } = useInView(0.12)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('loading')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('fail')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <p className={`section-label reveal ${inView ? 'visible' : ''}`}>Contact</p>
        <h2 className={`section-title reveal reveal-delay-1 ${inView ? 'visible' : ''}`}>Let's connect</h2>
        <p className={`section-desc reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          Collaboration, open source, security tools — or just say hi.
        </p>

        <div className={`contact-grid reveal reveal-delay-2 ${inView ? 'visible' : ''}`}>
          <form className="card contact-form" onSubmit={onSubmit}>
            <input type="hidden" name="_subject" value="Portfolio contact — BluHExH" />
            <input type="hidden" name="_template" value="table" />
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <label>
              Name
              <input name="name" required placeholder="Your name" autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
            </label>
            <label>
              Message
              <textarea name="message" required rows={5} placeholder="What are you building?" />
            </label>

            <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'ok' && <p className="form-msg ok">Message sent — I will get back to you.</p>}
            {status === 'err' && (
              <p className="form-msg err">
                Could not send right now. Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            )}
          </form>

          <div className="contact-side">
            <a className="card contact-link" href={`mailto:${EMAIL}`}>
              <span className="cl-label">Email</span>
              <span className="cl-value">{EMAIL}</span>
            </a>
            <a className="card contact-link" href="https://github.com/BluHExH" target="_blank" rel="noopener noreferrer">
              <span className="cl-label">GitHub</span>
              <span className="cl-value">github.com/BluHExH</span>
            </a>
            <div className="card contact-note">
              <span className="cl-label">Response</span>
              <p>Usually within a few days. Open-source and security chats welcome.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; margin-top: 36px; max-width: 900px; }
        .contact-form { display: flex; flex-direction: column; gap: 14px; padding: 24px; }
        .contact-form label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 600; color: var(--text-muted); }
        .contact-form input, .contact-form textarea {
          background: #0E0E10; border: 1px solid var(--border); border-radius: 10px;
          padding: 12px 14px; color: var(--text); font: inherit; font-size: 14px; font-weight: 400;
        }
        .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--accent); }
        .contact-form button { align-self: flex-start; margin-top: 4px; }
        .contact-form button:disabled { opacity: 0.7; cursor: wait; }
        .form-msg { font-size: 13px; margin: 0; }
        .form-msg.ok { color: #4ADE80; }
        .form-msg.err { color: #F87171; }
        .form-msg a { color: var(--accent); }
        .contact-side { display: flex; flex-direction: column; gap: 12px; }
        .contact-link, .contact-note { padding: 18px; text-decoration: none; }
        .contact-link:hover { border-color: var(--accent); }
        .cl-label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
        .cl-value { font-size: 14px; font-weight: 600; color: var(--text); word-break: break-all; }
        .contact-note p { margin: 0; font-size: 13px; color: var(--text-secondary); line-height: 1.55; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
