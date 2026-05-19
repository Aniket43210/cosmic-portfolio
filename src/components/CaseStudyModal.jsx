import { useEffect } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('[data-csreveal]')
    els.forEach((e, i) => {
      anime({ targets: e, opacity: [0, 1], translateY: [20, 0], duration: 500, delay: 200 + i * 80, easing: 'easeOutCubic' })
    })
    return () => anime.remove('[data-csreveal]')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
      style={{ background: '#050505' }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-24 py-20">
        <div className="mb-10">
          <button onClick={onClose} className="inline-flex items-center gap-2 text-xs tracking-wider uppercase transition-colors duration-300 hover:opacity-70" style={{ color: project.color }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to portfolio
          </button>
        </div>

        <div className="h-48 md:h-64 rounded-2xl overflow-hidden mb-10 relative" style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)` }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div data-csreveal className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: project.color, opacity: 0 }}>{project.subtitle}</div>
              <h1 data-csreveal className="text-3xl md:text-5xl font-bold tracking-tight text-white" style={{ opacity: 0 }}>{project.title}</h1>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 data-csreveal className="text-sm font-semibold text-white mb-3 tracking-tight" style={{ opacity: 0 }}>Overview</h2>
            <p data-csreveal className="text-sm text-charcoal-400 font-light leading-relaxed" style={{ opacity: 0 }}>{project.description}</p>

            <div className="mt-8">
              <h2 data-csreveal className="text-sm font-semibold text-white mb-3 tracking-tight" style={{ opacity: 0 }}>Key Outcomes</h2>
              <ul className="space-y-2">
                {project.details.map((d, i) => (
                  <li key={i} data-csreveal className="flex items-start gap-2 text-sm text-charcoal-300 font-light" style={{ opacity: 0 }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 data-csreveal className="text-sm font-semibold text-white mb-3 tracking-tight" style={{ opacity: 0 }}>Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Role', value: project.role },
                { label: 'Year', value: project.year },
                { label: 'Technologies', value: project.tags.join(', ') },
              ].map((item) => (
                <div key={item.label} data-csreveal style={{ opacity: 0 }}>
                  <span className="text-[10px] text-charcoal-600 tracking-wider uppercase">{item.label}</span>
                  <p className="text-sm text-charcoal-300 mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {project.color !== '#10b981' && (
          <div data-csreveal className="rounded-xl p-6 md:p-8 mb-12" style={{ opacity: 0, border: `1px solid ${project.color}10`, background: `${project.color}04` }}>
            <p className="text-xs text-charcoal-500 font-light italic leading-relaxed">
              "This project represents a focused approach to solving complex problems through deliberate technology choices and iterative refinement."
            </p>
          </div>
        )}

        <div className="pt-6 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <button onClick={onClose} className="inline-flex items-center gap-2 text-xs tracking-wider uppercase transition-colors duration-300 hover:opacity-70" style={{ color: project.color }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to portfolio
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CaseStudyModal
