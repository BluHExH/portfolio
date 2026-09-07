import { useInView } from '../hooks/useInView'

const css = `
.contact-inner { text-align: center; max-width: 560px; margin: 0 auto; }
.contact-inner .section-desc { margin: 0 auto 28px; }
.contact-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
`

export default function Contact() {
  const { ref, inView } = useInView(0.15)
  const vis = inView ? ' visible' : ''
  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container contact-inner">
        <p className={'section-label reveal' + vis}>Contact</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>Let us connect</h2>
        <p className={'section-desc reveal reveal-delay-2' + vis}>
          Open to collaboration, open source contributions, and conversations about security and building tools.
        </p>
        <div className={'contact-actions reveal reveal-delay-3' + vis}>
          <a href="mailto:cyber17official.bd@gmail.com" className="btn btn-primary">
            Send email
          </a>
          <a
            href="https://github.com/BluHExH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub profile
          </a>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
