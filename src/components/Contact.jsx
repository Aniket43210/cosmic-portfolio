import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { blurReveal } from '../utils/motion'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgzwjzz'

function Contact() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const els = el.querySelectorAll('[data-reveal]')
    els.forEach((e, i) => blurReveal(e, i * 200))
    return () => els.forEach((e) => anime.remove(e))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto">
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

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                data-reveal
                name="name"
                type="text"
                required
                placeholder="Name"
                className="w-full px-4 py-3 text-sm rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-200 outline-none transition-all duration-300 focus:border-ember-400/40"
                style={{ filter: 'blur(20px)', opacity: 0 }}
              />
              <input
                data-reveal
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full px-4 py-3 text-sm rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-200 outline-none transition-all duration-300 focus:border-ember-400/40"
                style={{ filter: 'blur(20px)', opacity: 0 }}
              />
            </div>
            <input
              data-reveal
              name="subject"
              type="text"
              required
              placeholder="Subject"
              className="w-full px-4 py-3 text-sm rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-200 outline-none transition-all duration-300 focus:border-ember-400/40"
              style={{ filter: 'blur(20px)', opacity: 0 }}
            />
            <textarea
              data-reveal
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 text-sm rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-200 outline-none transition-all duration-300 focus:border-ember-400/40 resize-none"
              style={{ filter: 'blur(20px)', opacity: 0 }}
            />
            <div data-reveal style={{ filter: 'blur(20px)', opacity: 0 }}>
              <button
                type="submit"
                disabled={status === 'sending'}
                data-magnetic
                className="group inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                style={{ background: '#fb923c', color: '#050505' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(251,146,60,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
              >
                {status === 'sending' ? 'Sending...' : 'Send message'}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              {status === 'success' && <span className="ml-3 text-xs text-emerald-400">Message sent! I'll be in touch.</span>}
              {status === 'error' && <span className="ml-3 text-xs text-red-400">Something went wrong. Try emailing me directly.</span>}
            </div>
          </form>

          <div className="md:col-span-2 space-y-4">
            <div data-reveal className="rounded-lg p-5 border border-white/[0.04] bg-white/[0.015]" style={{ filter: 'blur(20px)', opacity: 0 }}>
              <span className="text-[10px] text-charcoal-500 tracking-[0.2em] uppercase block mb-4">Info</span>
              <div className="space-y-3">
                {[
                  { label: 'Email', value: 'sangvi412@gmail.com', color: '#fb923c' },
                  { label: 'Location', value: 'Remote · Worldwide', color: '#22d3ee' },
                  { label: 'Availability', value: 'Open to projects', color: '#34d399' },
                ].map((i) => (
                  <div key={i.label} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i.color }} />
                    <span className="text-xs text-charcoal-500 w-20 tracking-wider uppercase">{i.label}</span>
                    <span className="text-sm text-charcoal-300">{i.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="rounded-lg p-5 border border-white/[0.04] bg-white/[0.015]" style={{ filter: 'blur(20px)', opacity: 0 }}>
              <span className="text-[10px] text-charcoal-500 tracking-[0.2em] uppercase block mb-4">Connect</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'GitHub', url: 'https://github.com/Aniket43210', color: '#fb923c' },
                  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aniket-kumar-singh-78a12629a/', color: '#22d3ee' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ border: `1px solid ${s.color}20`, color: s.color, background: `${s.color}08` }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 flex justify-between items-center border-t border-white/[0.04]">
          <span className="text-[10px] text-charcoal-700 tracking-wider">&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</span>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
