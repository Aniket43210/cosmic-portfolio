import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { blurReveal } from '../utils/motion'

function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const els = el.querySelectorAll('[data-reveal]')
    els.forEach((e, i) => blurReveal(e, i * 200))
    return () => els.forEach((e) => anime.remove(e))
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <span data-reveal className="text-xs text-ember-500 tracking-[0.3em] uppercase font-medium block mb-4" style={{ filter: 'blur(20px)', opacity: 0 }}>
            Contact
          </span>

          <h2 data-reveal className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6" style={{ filter: 'blur(20px)', opacity: 0 }}>
            <span className="text-gradient-dual">Let's build something</span>
            <br />
            <span className="text-gradient-ember">remarkable</span>
          </h2>

          <p data-reveal className="text-base text-charcoal-400 font-light max-w-md leading-relaxed" style={{ filter: 'blur(20px)', opacity: 0 }}>
            Whether you have a project in mind or just want to push pixels together — I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {[
            { label: 'Email', value: 'hello@example.com' },
            { label: 'Location', value: 'Remote · Worldwide' },
            { label: 'Availability', value: 'Open to projects' },
          ].map((i, idx) => (
            <div key={i.label} data-reveal className="flex items-center gap-4" style={{ filter: 'blur(20px)', opacity: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ['#fb923c', '#22d3ee', '#34d399'][idx] }} />
              <span className="text-xs text-charcoal-500 w-20 tracking-wider uppercase">{i.label}</span>
              <span className="text-sm text-charcoal-300">{i.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            data-reveal
            data-magnetic
            href="mailto:hello@example.com"
            className="group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-lg transition-all duration-300"
            style={{ background: '#fb923c', color: '#050505' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(251,146,60,0.3)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
          >
            Start a conversation
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="mt-16 pt-6 flex flex-wrap justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((p, i) => (
              <button
                key={p}
                data-reveal
                className="text-xs tracking-wider uppercase cursor-default select-none transition-colors duration-300"
                style={{ color: '#52525b', filter: 'blur(20px)', opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = ['#fb923c', '#22d3ee', '#d946ef'][i] }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#52525b' }}
              >
                {p}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-charcoal-700 tracking-wider">&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
