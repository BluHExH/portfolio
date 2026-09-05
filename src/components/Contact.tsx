export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <p className="section-label">// CONTACT</p>
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-desc">
          Open to collaboration, open source contributions, and interesting
          conversations about security and building tools.
        </p>

        <div className="contact-actions">
          <a
            href="mailto:cyber17official.bd@gmail.com"
            className="btn btn-primary"
          >
            Send Email →
          </a>
          <a
            href="https://github.com/BluHExH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub Profile
          </a>
        </div>

        <div className="contact-meta">
          <div className="meta-item">
            <span className="meta-label">EMAIL</span>
            <span className="meta-value">cyber17official.bd@gmail.com</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">GITHUB</span>
            <span className="meta-value">github.com/BluHExH</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">LOCATION</span>
            <span className="meta-value">Bangladesh</span>
          </div>
        </div>
      </div>

      <style>{`
        .contact-inner {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .contact .section-desc {
          margin: 0 auto 36px;
        }
        .contact-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .contact-meta {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }
        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .meta-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }
        .meta-value {
          font-size: 14px;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  )
}
