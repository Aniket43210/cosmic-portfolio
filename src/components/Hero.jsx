import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-surface/95 pointer-events-none z-[1]" />
      <HeroCanvas />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <motion.div
            initial={{ filter: 'blur(24px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase font-medium" style={{ color: '#64748B' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B', boxShadow: '0 0 12px rgba(245,158,11,0.4)' }} />
              AI · Full Stack · Creative
            </span>
          </motion.div>

          <motion.h1
            initial={{ filter: 'blur(30px)', opacity: 0, y: 30 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 leading-[0.8]"
            style={{ fontSize: 'clamp(3.2rem, 12vw, 8.5rem)', fontWeight: 700, letterSpacing: '-0.06em' }}
          >
            <span className="block text-gradient-amber">AI. Code.</span>
            <span className="block text-gradient-warm" style={{ marginTop: '-0.05em' }}>Creativity.</span>
          </motion.h1>

          <motion.div
            initial={{ filter: 'blur(20px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg mb-12"
          >
            <p className="text-base sm:text-lg text-muted/70 font-light" style={{ lineHeight: 1.8 }}>
              Full-stack developer at the intersection of AI engineering and creative design.
            </p>
            <p className="text-base sm:text-lg text-muted/50 font-light" style={{ lineHeight: 1.8 }}>
              I build intelligent systems with soul — where machine learning meets meaningful interaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              data-magnetic
              href="#work"
              className="group relative px-7 py-3.5 text-xs tracking-wider uppercase font-medium rounded-2xl overflow-hidden transition-all duration-500 cinematic-ease"
              style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#F8FAFC' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 40px rgba(245,158,11,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                View Projects
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-400 cinematic-ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
            <a
              href="#contact"
              className="relative px-7 py-3.5 text-xs tracking-wider uppercase font-medium rounded-2xl transition-all duration-500 cinematic-ease glass glass-hover"
              style={{ color: '#94A3B8' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F8FAFC'; e.currentTarget.style.borderColor = 'rgba(245,158,11,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Contact
            </a>
          </motion.div>
        </div>

        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          {['', 'work', 'about', 'contact'].map((id) => (
            <a key={id} href={`#${id}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-700 cinematic-ease"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.boxShadow = '0 0 12px rgba(245,158,11,0.3)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none' }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-10 flex items-center gap-4">
        <span className="text-[10px] text-muted/25 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-24 h-px relative" style={{ background: 'linear-gradient(to right, rgba(245,158,11,0.2), transparent)' }} />
      </div>
    </section>
  )
}

export default Hero
