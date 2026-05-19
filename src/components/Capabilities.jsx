import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const capabilities = [
  {
    title: 'AI Engineering',
    color: '#d946ef',
    items: ['LLM Integration', 'RAG Pipelines', 'Vector Databases', 'Fine-tuning', 'AI Agents', 'ML Ops'],
    desc: 'Building intelligent systems that learn, reason, and adapt — from prototype to production-scale AI infrastructure.',
    icon: '◆',
  },
  {
    title: 'Full Stack',
    color: '#22d3ee',
    items: ['React / Next.js', 'Node.js / Python', 'PostgreSQL / Redis', 'Docker / AWS', 'GraphQL / REST', 'CI / CD'],
    desc: 'End-to-end architecture and development — from database schema design to polished, responsive interfaces.',
    icon: '◈',
  },
  {
    title: 'Creative Design',
    color: '#fb923c',
    items: ['Motion Design', '3D / WebGL', 'UI / UX', 'Design Systems', 'Interactive Storytelling', 'Brand Identity'],
    desc: 'Where code meets craft — designing experiences that feel intentional, fluid, and emotionally resonant.',
    icon: '◉',
  },
]

function CapabilityCard({ cap, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: el, opacity: [0, 1], translateY: [25, 0], duration: 700, delay: index * 150, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.2 })
    o.observe(el)
    return () => o.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl p-6 md:p-8 card-edge"
      style={{ opacity: 0, border: `1px solid ${cap.color}15`, background: `linear-gradient(145deg, ${cap.color}06, transparent)` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-lg" style={{ color: cap.color }}>{cap.icon}</span>
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: cap.color }}>{cap.title}</h3>
      </div>
      <p className="text-sm text-charcoal-400 font-light leading-relaxed mb-5">{cap.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {cap.items.map((item) => (
          <span key={item} className="px-2.5 py-1 text-[10px] font-medium rounded-full tracking-wide" style={{ border: `1px solid ${cap.color}18`, color: cap.color, background: `${cap.color}08` }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Capabilities() {
  const titleRef = useRef(null)
  const dividerRef = useRef(null)

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

  useEffect(() => {
    if (!dividerRef.current) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { anime({ targets: dividerRef.current, scaleX: [0, 1], duration: 1200, easing: 'easeOutCubic' }); o.unobserve(entry.target) }
      })
    }, { threshold: 0.3 })
    o.observe(dividerRef.current)
    return () => o.disconnect()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      id="capabilities"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#d946ef' }}>03</span>
            <div ref={dividerRef} className="h-px flex-1 bg-gradient-to-r from-bloom-400/30 to-transparent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {'Capabilities'.split('').map((c, i) => (
                <span key={i} className="char inline-block" style={{ opacity: 0, background: 'linear-gradient(135deg, #d946ef, #22d3ee, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{c}</span>
              ))}
            </h2>
          </div>
          <p className="text-sm text-charcoal-500 mt-3 font-light max-w-lg">Three disciplines that converge in every project I build.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Capabilities
