import { useEffect } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'

function Section({ title, children, delay = 0 }) {
  return (
    <div data-csreveal style={{ opacity: 0 }} className="mb-12">
      <h2 className="text-sm font-semibold text-white mb-4 tracking-tight">{title}</h2>
      {children}
    </div>
  )
}

function StatCard({ value, label, color }) {
  return (
    <div className="rounded-xl p-5 text-center" style={{ border: `1px solid ${color}15`, background: `${color}06` }}>
      <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-xs text-charcoal-500 mt-1 font-light">{label}</p>
    </div>
  )
}

function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('[data-csreveal]')
    els.forEach((e, i) => {
      anime({ targets: e, opacity: [0, 1], translateY: [20, 0], duration: 500, delay: 200 + i * 60, easing: 'easeOutCubic' })
    })
    return () => anime.remove('[data-csreveal]')
  }, [])

  const c = project.color
  const ctx = project.context

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

        {/* Back button */}
        <div className="mb-10">
          <button onClick={onClose} className="inline-flex items-center gap-2 text-xs tracking-wider uppercase transition-colors duration-300 hover:opacity-70" style={{ color: c }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to portfolio
          </button>
        </div>

        {/* Hero */}
        <div className="h-48 md:h-64 rounded-2xl overflow-hidden mb-10 relative" style={{ background: `linear-gradient(135deg, ${c}20, ${c}05)` }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }} />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div data-csreveal className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: c, opacity: 0 }}>{project.subtitle}</div>
              <h1 data-csreveal className="text-3xl md:text-5xl font-bold tracking-tight text-white" style={{ opacity: 0 }}>{project.title}</h1>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        <div data-csreveal className="flex flex-wrap gap-3 mb-10" style={{ opacity: 0 }}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium transition-all duration-300"
              style={{ background: c, color: '#050505' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              {project.repo ? 'Live site' : 'Visit site'}
            </a>
          )}
          {project.repo && (
            <a href={`https://github.com/Aniket43210/${project.repo}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium transition-all duration-300"
              style={{ border: `1px solid ${c}30`, color: c }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              View on GitHub
            </a>
          )}
        </div>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div data-csreveal className="mb-12 grid grid-cols-2 gap-4" style={{ opacity: 0 }}>
            {project.screenshots.map((s, i) => (
              <img key={i} src={s} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto object-cover object-top rounded-xl border border-white/5" style={{ maxHeight: 350 }} />
            ))}
          </div>
        )}

        {/* Two-column: main content + sidebar */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-6">
          <div className="md:col-span-2">

            {/* Overview */}
            <Section title="Overview">
              <p className="text-sm text-charcoal-400 font-light leading-relaxed">{project.description}</p>
            </Section>

            {/* Problem */}
            {ctx?.problem && (
              <Section title="The Problem">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.problem}</p>
              </Section>
            )}

            {/* Solution */}
            {ctx?.solution && (
              <Section title="The Solution">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.solution}</p>
              </Section>
            )}

            {/* Architecture */}
            {ctx?.architecture && (
              <Section title="Architecture">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.architecture}</p>
              </Section>
            )}

            {/* Key Features */}
            {ctx?.features && ctx.features.length > 0 && (
              <Section title="Key Features">
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {ctx.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-charcoal-300 font-light">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c }} />
                      {f}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Challenges */}
            {ctx?.challenges && (
              <Section title="Challenges & Learnings">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.challenges}</p>
              </Section>
            )}

            {/* Results */}
            {ctx?.results && (
              <Section title="Results & Impact">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.results}</p>
              </Section>
            )}

            {/* Future */}
            {ctx?.future && (
              <Section title="Future Roadmap">
                <p className="text-sm text-charcoal-400 font-light leading-relaxed">{ctx.future}</p>
              </Section>
            )}

          </div>

          {/* Sidebar */}
          <div>
            <div data-csreveal style={{ opacity: 0 }} className="md:sticky md:top-24 space-y-6">

              {/* Stat cards */}
              <div className="space-y-3">
                {project.details.slice(0, 2).map((d, i) => {
                  const parts = d.split(/[:\-—]/).map(s => s.trim())
                  return <StatCard key={i} value={parts[0]} label={parts[1] || ''} color={c} />
                })}
              </div>

              {/* Info */}
              <div className="rounded-xl p-5 space-y-4" style={{ border: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <span className="text-[10px] text-charcoal-600 tracking-wider uppercase">Role</span>
                  <p className="text-sm text-charcoal-300 mt-1">{project.role}</p>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-600 tracking-wider uppercase">Year</span>
                  <p className="text-sm text-charcoal-300 mt-1">{project.year}</p>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-600 tracking-wider uppercase">Tech Stack</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ background: `${c}12`, color: c }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium transition-all duration-300"
                  style={{ background: c, color: '#050505' }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  {project.repo ? 'Live site' : 'Visit site'}
                </a>
              )}
              {project.repo && (
                <a href={`https://github.com/Aniket43210/${project.repo}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs tracking-wider uppercase font-medium transition-all duration-300"
                  style={{ border: `1px solid ${c}30`, color: c }}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  View on GitHub
                </a>
              )}

            </div>
          </div>
        </div>

        {/* Bottom back */}
        <div className="pt-6 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <button onClick={onClose} className="inline-flex items-center gap-2 text-xs tracking-wider uppercase transition-colors duration-300 hover:opacity-70" style={{ color: c }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to portfolio
          </button>
        </div>

      </div>
    </motion.div>
  )
}

export default CaseStudyModal
