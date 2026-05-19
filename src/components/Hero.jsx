import { motion } from 'framer-motion'
import HeroOrb from './HeroOrb'

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const blurRevealVariants = {
  hidden: { filter: 'blur(20px)', opacity: 0 },
  visible: { filter: 'blur(0px)', opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
}

const fadeUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function Hero() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <HeroOrb />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/20 to-midnight-950/80 pointer-events-none z-[1]" />

      <motion.div className="relative z-10 w-full max-w-6xl mx-auto" variants={heroVariants} initial="hidden" animate="visible">
        <div className="max-w-4xl">
          <motion.span variants={blurRevealVariants} className="text-xs text-ember-400 tracking-[0.3em] uppercase font-medium mb-6 block">
            {greeting} Developer
          </motion.span>

          <motion.h1 variants={heroVariants} className="mb-10" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 0.8 }}>
            <motion.span variants={blurRevealVariants} className="block text-gradient-ember">
              Build
            </motion.span>
            <motion.span variants={blurRevealVariants} className="block text-white">
              With
            </motion.span>
            <motion.span variants={blurRevealVariants} className="block text-gradient-surge">
              Intention
            </motion.span>
          </motion.h1>

          <motion.p variants={blurRevealVariants} className="text-base sm:text-lg text-charcoal-400 font-light max-w-xl leading-relaxed mb-10">
            I craft digital experiences where every pixel, every motion, and every interaction serves a purpose.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3">
            <a
              data-magnetic
              href="#work"
              className="group relative px-7 py-3 text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300"
              style={{ background: '#fb923c', color: '#050505' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(251,146,60,0.3)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </a>
            <a
              href="#contact"
              className="relative px-7 py-3 text-sm font-medium rounded-lg transition-all duration-300"
              style={{ border: '1px solid rgba(251,146,60,0.2)', color: '#fb923c' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(251,146,60,0.08)'; e.currentTarget.style.borderColor = 'rgba(251,146,60,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(251,146,60,0.2)' }}
            >
              Contact
            </a>
          </motion.div>
        </div>

        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          {['', 'work', 'experiments', 'contact'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fb923c'; e.currentTarget.style.boxShadow = '0 0 8px rgba(251,146,60,0.4)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none' }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-6 md:left-16 lg:left-24 z-10 flex items-center gap-4">
        <span className="text-[10px] text-charcoal-600 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-24 h-px relative" style={{ background: 'linear-gradient(to right, rgba(251,146,60,0.2), transparent)' }} />
      </div>
    </motion.section>
  )
}

export default Hero
