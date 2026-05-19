import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const clusters = [
  {
    label: 'Frontend', color: '#fb923c',
    items: [
      { name: 'React', desc: 'Component-based UI library for modern web interfaces' },
      { name: 'Next.js', desc: 'React framework with SSR, routing, and optimized builds' },
      { name: 'TailwindCSS', desc: 'Utility-first CSS framework for rapid UI development' },
      { name: 'Vite', desc: 'Next-gen build tool with instant HMR' },
      { name: 'Three.js', desc: '3D graphics library bringing WebGL to the browser' },
      { name: 'WebGL', desc: 'Low-level GPU rendering API for the web' },
    ],
  },
  {
    label: 'Motion', color: '#22d3ee',
    items: [
      { name: 'GSAP', desc: 'Professional-grade animation platform for the web' },
      { name: 'Anime.js', desc: 'Lightweight flexible JavaScript animation engine' },
      { name: 'Framer', desc: 'Production-ready React animation library' },
      { name: 'Lenis', desc: 'Smooth scroll controller with custom easing' },
    ],
  },
  {
    label: 'Backend', color: '#d946ef',
    items: [
      { name: 'Node.js', desc: 'JavaScript runtime built on Chrome V8 engine' },
      { name: 'Python', desc: 'Versatile language for backend and data science' },
      { name: 'Rust', desc: 'Systems language with memory safety guarantees' },
      { name: 'PostgreSQL', desc: 'Advanced relational database management system' },
      { name: 'Redis', desc: 'In-memory data structure store and cache' },
      { name: 'GraphQL', desc: 'Query language and runtime for APIs' },
    ],
  },
  {
    label: 'Infra', color: '#34d399',
    items: [
      { name: 'Docker', desc: 'Container platform for consistent deployments' },
      { name: 'AWS', desc: 'Comprehensive cloud infrastructure platform' },
      { name: 'Cloudflare', desc: 'Edge network for performance and security' },
      { name: 'R2', desc: 'Object storage compatible with S3 API' },
    ],
  },
  {
    label: 'Creative', color: '#f472b6',
    items: [
      { name: 'Figma', desc: 'Collaborative interface design tool' },
      { name: 'Blender', desc: 'Open-source 3D creation suite' },
      { name: 'GLSL', desc: 'OpenGL Shading Language for GPU programming' },
      { name: 'WebGPU', desc: 'Next-generation graphics API for the web' },
      { name: 'D3', desc: 'Data-driven documents for visualization' },
    ],
  },
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
          anime({ targets: el, opacity: [0, 1], translateY: [20, 0], duration: 600, delay: index * 100, easing: 'easeOutCubic' })
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
      el.animate([
        { height: '0px', opacity: 0 },
        { height: h + 'px', opacity: 1 }
      ], { duration: 350, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' })
    } else {
      const h = el.scrollHeight
      el.style.height = h + 'px'
      void el.offsetHeight
      el.animate([
        { height: h + 'px', opacity: 1 },
        { height: '0px', opacity: 0 }
      ], { duration: 300, easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)', fill: 'forwards' })
    }
    setExpanded(next)
  }

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border cursor-pointer select-none card-edge"
      style={{ opacity: 0, borderColor: `${cluster.color}15`, background: `linear-gradient(145deg, ${cluster.color}04, transparent)` }}
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: cluster.color, boxShadow: `0 0 8px ${cluster.color}50` }} />
            <span className="text-sm font-semibold tracking-tight" style={{ color: cluster.color }}>{cluster.label}</span>
          </div>
          <svg className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} style={{ color: cluster.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cluster.items.map((item) => (
            <span key={item.name} className="px-2.5 py-1 text-[10px] font-medium rounded-full tracking-wide" style={{ border: `1px solid ${cluster.color}20`, color: cluster.color, background: `${cluster.color}08` }}>
              {item.name}
            </span>
          ))}
        </div>

        <div ref={contentRef} className="overflow-hidden detail-hidden" style={{ display: 'none' }}>
          <div className="pt-4 mt-4 space-y-2.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
            {cluster.items.map((item) => (
              <div key={item.name} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: cluster.color }} />
                <div>
                  <span className="text-xs font-medium" style={{ color: cluster.color }}>{item.name}</span>
                  <p className="text-xs text-charcoal-500 font-light mt-0.5 leading-relaxed">{item.desc}</p>
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

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { charStagger(el); o.unobserve(el) }
      })
    }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="stack">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#22d3ee' }}>05</motion.span>
            <div className="h-px flex-1 bg-gradient-to-r from-surge-400/30 to-transparent" />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {'Stack'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-surge" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
          <p className="text-sm text-charcoal-500 mt-3 font-light max-w-lg">Click a category to explore the tools and technologies behind each discipline.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clusters.map((c, i) => (
            <StackCard key={c.label} cluster={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechConstellation
