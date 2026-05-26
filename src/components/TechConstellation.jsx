import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const clusters = [
  { label: 'Frontend', color: '#F59E0B',
    items: [
      { name: 'React', desc: 'Component-based UI library for modern web interfaces' },
      { name: 'Next.js', desc: 'React framework with SSR, routing, and optimized builds' },
      { name: 'TypeScript', desc: 'Typed superset of JavaScript for scalable applications' },
      { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid UI development' },
      { name: 'Framer Motion', desc: 'Production-ready React animation library' },
      { name: 'Three.js', desc: '3D graphics library bringing WebGL to the browser' },
      { name: 'Chart.js', desc: 'Simple yet flexible JavaScript charting library' },
      { name: 'JavaScript', desc: 'Core language of the web platform' },
    ] },
  { label: 'Backend', color: '#22D3EE',
    items: [
      { name: 'Python', desc: 'Versatile language for backend and data science' },
      { name: 'FastAPI', desc: 'Modern Python web framework for building APIs' },
      { name: 'Node.js', desc: 'JavaScript runtime built on Chrome V8 engine' },
      { name: 'Express', desc: 'Minimal Node.js web framework for building APIs' },
      { name: 'REST API', desc: 'Architectural style for networked applications' },
      { name: 'JWT', desc: 'JSON Web Tokens for stateless authentication' },
    ] },
  { label: 'ML/AI', color: '#EC4899',
    items: [
      { name: 'XGBoost', desc: 'Gradient boosting framework for ML predictions' },
      { name: 'SHAP', desc: 'Explainable AI for model prediction interpretation' },
      { name: 'CNN', desc: 'Convolutional neural networks for spectral/image analysis' },
      { name: 'Transformers', desc: 'Attention-based architecture for sequence modeling' },
      { name: 'Scikit-learn', desc: 'Machine learning library for Python' },
      { name: 'Feature Engineering', desc: 'Domain-driven feature creation for ML models' },
      { name: 'Model Deployment', desc: 'Serving ML models in production environments' },
    ] },
  { label: 'Data & Storage', color: '#FBBF24',
    items: [
      { name: 'PostgreSQL', desc: 'Advanced relational database management system' },
      { name: 'MongoDB', desc: 'NoSQL document database for flexible schemas' },
      { name: 'Redis', desc: 'In-memory data structure store and cache' },
      { name: 'SQLite', desc: 'Lightweight embedded SQL database engine' },
      { name: 'Data Pipelines', desc: 'ETL workflows for data processing and analysis' },
    ] },
  { label: 'DevOps', color: '#EC4899',
    items: [
      { name: 'Docker', desc: 'Container platform for consistent deployments' },
      { name: 'Kubernetes', desc: 'Container orchestration for production scaling' },
      { name: 'Cloudflare', desc: 'Edge network for performance and security' },
      { name: 'Firebase', desc: 'Backend-as-a-service for rapid development' },
      { name: 'Prometheus', desc: 'Metrics collection and alerting toolkit' },
      { name: 'Git', desc: 'Distributed version control system' },
      { name: 'CI/CD', desc: 'Automated integration and deployment pipelines' },
    ] },
]

function StackCard({ cluster, index }) {
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: el, opacity: [0, 1], translateY: [15, 0], duration: 600, delay: index * 80, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.2 })
    o.observe(el)
    return () => o.disconnect()
  }, [index])

  const handleClick = () => {
    const next = !expanded
    const el = contentRef.current
    if (!el) return
    if (next) {
      el.style.display = 'block'
      el.style.height = 'auto'
      void el.offsetHeight
      const h = el.scrollHeight
      el.style.height = '0px'
      void el.offsetHeight
      el.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 350, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' })
    } else {
      const h = el.scrollHeight
      el.style.height = h + 'px'
      void el.offsetHeight
      el.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 300, easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)', fill: 'forwards' })
    }
    setExpanded(next)
  }

  return (
    <div ref={cardRef} className="relative rounded-2xl border cursor-pointer select-none card-edge" style={{ opacity: 0, borderColor: `${cluster.color}10`, background: 'rgba(20,20,30,0.5)' }} onClick={handleClick}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cluster.color }} />
            <span className="text-sm font-semibold tracking-tight" style={{ color: cluster.color }}>{cluster.label}</span>
          </div>
          <svg className={`w-3 h-3 transition-transform duration-500 cinematic-ease ${expanded ? 'rotate-180' : ''}`} style={{ color: cluster.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cluster.items.map((item) => (
            <span key={item.name} className="px-2.5 py-1 text-[10px] font-medium rounded-lg tracking-wide" style={{ border: `1px solid ${cluster.color}12`, color: cluster.color, background: `${cluster.color}06` }}>{item.name}</span>
          ))}
        </div>
        <div ref={contentRef} className="overflow-hidden detail-hidden" style={{ display: 'none' }}>
          <div className="pt-4 mt-4 space-y-2.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
            {cluster.items.map((item) => (
              <div key={item.name} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: cluster.color }} />
                <div>
                  <span className="text-xs font-medium" style={{ color: cluster.color }}>{item.name}</span>
                  <p className="text-xs text-muted/60 font-light mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TechConstellation() {
  const titleRef = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { charStagger(el); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!dividerRef.current) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { anime({ targets: dividerRef.current, scaleX: [0, 1], duration: 1200, easing: 'easeOutCubic' }); o.unobserve(entry.target) } }) }, { threshold: 0.3 })
    o.observe(dividerRef.current)
    return () => o.disconnect()
  }, [])

  return (
    <section className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="stack">
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '50%', left: '40%', width: '40%', height: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.05), transparent 70%)', filter: 'blur(100px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#D97706' }}>05</motion.span>
            <div ref={dividerRef} className="h-px flex-1 bg-gradient-to-r from-accent-cyan/20 to-transparent origin-left" />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {'Stack'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-warm" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
          <p className="text-sm text-muted/60 mt-3 font-light max-w-lg">Click a category to explore the tools and technologies behind each discipline.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {clusters.map((c, i) => (<StackCard key={c.label} cluster={c} index={i} />))}
        </div>
      </div>
    </section>
  )
}

export default TechConstellation
