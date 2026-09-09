import { useInView } from '../hooks/useInView'

const css = `
.contact-inner { max-width: 560px; }
.contact-inner .section-desc { margin-bottom: 28px; }
.contact-actions { display: flex; gap: 12px; flex-wrap: wrap; }
`

export default function Contact() {
  const { ref, inView } = useInView(0.15)
  const vis = inView ? ' visible' : ''

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container contact-inner">
        <p className={'section-label reveal' + vis}>Contact</p>
        <h2 className={'section-title reveal reveal-delay-1' + vis}>If you want to talk</h2>
        <p className={'section-desc reveal reveal-delay-2' + vis}>
          Open to collaboration, questions about the tools, or just showing something you built.
          I read mail when I can.
        </p>
        <div className={'contact-actions reveal reveal-delay-3' + vis}>
          <a href="mailto:cyber17official.bd@gmail.com" className="btn btn-primary">
            Email me
          </a>
          <a
            href="https://github.com/BluHExH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
      <style>{css}</style>
    </section>
  )
}
