import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgzwjzz'

function Contact() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const els = el.querySelectorAll('[data-reveal]')
    els.forEach((e, i) => anime({ targets: e, filter: ['blur(20px)', 'blur(0px)'], opacity: [0, 1], duration: 1000, delay: 200 + i * 150, easing: 'easeOutCubic' }))
    return () => els.forEach((e) => anime.remove(e))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) e.target.reset()
    } catch { setStatus('error') }
  }

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden" id="contact">
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '10%', left: '15%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.06), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="aurora-blob" style={{ bottom: '20%', right: '10%', width: '30%', height: '35%', background: 'radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <span data-reveal className="text-xs tracking-[0.25em] uppercase font-medium block mb-4" style={{ color: '#F59E0B', filter: 'blur(20px)', opacity: 0 }}>
            Contact
          </span>
          <h2 data-reveal className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[0.9] mb-6" style={{ filter: 'blur(20px)', opacity: 0 }}>
            <span className="text-gradient-amber">Let's build something</span>
            <br />
            <span className="text-primary">remarkable</span>
          </h2>
          <p data-reveal className="text-base text-muted font-light max-w-md leading-relaxed" style={{ filter: 'blur(20px)', opacity: 0 }}>
            Whether you have a project in mind or just want to push pixels together — I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input data-reveal name="name" type="text" required placeholder="Name"
                className="w-full px-4 py-3 text-sm rounded-xl border bg-[rgba(20,20,30,0.5)] text-primary outline-none transition-all duration-500 cinematic-ease focus:border-accent-amber/30"
                style={{ borderColor: 'rgba(255,255,255,0.04)', filter: 'blur(20px)', opacity: 0 }} />
              <input data-reveal name="email" type="email" required placeholder="Email"
                className="w-full px-4 py-3 text-sm rounded-xl border bg-[rgba(20,20,30,0.5)] text-primary outline-none transition-all duration-500 cinematic-ease focus:border-accent-amber/30"
                style={{ borderColor: 'rgba(255,255,255,0.04)', filter: 'blur(20px)', opacity: 0 }} />
            </div>
            <input data-reveal name="subject" type="text" required placeholder="Subject"
              className="w-full px-4 py-3 text-sm rounded-xl border bg-[rgba(20,20,30,0.5)] text-primary outline-none transition-all duration-500 cinematic-ease focus:border-accent-amber/30"
              style={{ borderColor: 'rgba(255,255,255,0.04)', filter: 'blur(20px)', opacity: 0 }} />
            <textarea data-reveal name="message" required rows={5} placeholder="Tell me about your project..."
              className="w-full px-4 py-3 text-sm rounded-xl border bg-[rgba(20,20,30,0.5)] text-primary outline-none transition-all duration-500 cinematic-ease focus:border-accent-amber/30 resize-none"
              style={{ borderColor: 'rgba(255,255,255,0.04)', filter: 'blur(20px)', opacity: 0 }} />
            <div data-reveal style={{ filter: 'blur(20px)', opacity: 0 }}>
              <button type="submit" disabled={status === 'sending'} data-magnetic
                className="group inline-flex items-center gap-2 px-6 py-3 text-xs font-medium tracking-wider uppercase rounded-xl transition-all duration-500 cinematic-ease disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#F8FAFC' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(245,158,11,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
                {status === 'sending' ? 'Sending...' : 'Send message'}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-400 cinematic-ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              {status === 'success' && <span className="ml-3 text-xs" style={{ color: '#22D3EE' }}>Message sent! I'll be in touch.</span>}
              {status === 'error' && <span className="ml-3 text-xs text-red-400">Something went wrong. Try emailing me directly.</span>}
            </div>
          </form>

          <div className="md:col-span-2 space-y-4">
            <div data-reveal className="rounded-2xl p-5 glass-cyan" style={{ filter: 'blur(20px)', opacity: 0 }}>
              <span className="text-[10px] text-muted/50 tracking-[0.2em] uppercase block mb-4">Info</span>
              <div className="space-y-3">
                {[
                  { label: 'Email', value: 'sangvi412@gmail.com', color: '#F59E0B' },
                  { label: 'Location', value: 'Remote · Worldwide', color: '#22D3EE' },
                  { label: 'Availability', value: 'Open to projects', color: '#FBBF24' },
                ].map((i) => (
                  <div key={i.label} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: i.color }} />
                    <span className="text-xs text-muted/50 w-20 tracking-wider uppercase">{i.label}</span>
                    <span className="text-sm text-muted">{i.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="rounded-2xl p-5 glass-amber" style={{ filter: 'blur(20px)', opacity: 0 }}>
              <span className="text-[10px] text-muted/50 tracking-[0.2em] uppercase block mb-4">Connect</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'GitHub', url: 'https://github.com/Aniket43210', color: '#F59E0B' },
                  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aniket-kumar-singh-78a12629a/', color: '#22D3EE' },
                ].map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs rounded-xl transition-all duration-500 cinematic-ease"
                    style={{ border: `1px solid ${s.color}15`, color: s.color, background: `${s.color}06` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${s.color}12`; e.currentTarget.style.borderColor = `${s.color}30` }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${s.color}06`; e.currentTarget.style.borderColor = `${s.color}15` }}>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 flex justify-between items-center border-t border-white/[0.03]">
          <span className="text-[10px] text-muted/30 tracking-wider">&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</span>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
