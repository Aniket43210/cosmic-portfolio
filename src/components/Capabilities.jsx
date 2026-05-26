import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const capabilities = [
  {
    title: 'AI Engineering',
    color: '#F59E0B',
    items: ['LLM Integration', 'RAG Pipelines', 'Vector Databases', 'Fine-tuning', 'AI Agents', 'ML Ops'],
    desc: 'Building intelligent systems that learn, reason, and adapt — from prototype to production-scale AI infrastructure.',
  },
  {
    title: 'Full Stack',
    color: '#22D3EE',
    items: ['React / Next.js', 'Node.js / Python', 'PostgreSQL / Redis', 'Docker / AWS', 'GraphQL / REST', 'CI / CD'],
    desc: 'End-to-end architecture and development — from database schema design to polished, responsive interfaces.',
  },
  {
    title: 'Creative Design',
    color: '#EC4899',
    items: ['Motion Design', '3D / WebGL', 'UI / UX', 'Design Systems', 'Interactive Storytelling', 'Brand Identity'],
    desc: 'Where code meets craft — designing experiences that feel intentional, fluid, and emotionally resonant.',
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
          anime({ targets: el, opacity: [0, 1], translateY: [20, 0], duration: 700, delay: index * 120, easing: 'easeOutCubic' })
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
      className="relative p-6 md:p-8 transition-all duration-500 cinematic-ease"
      style={{
        opacity: 0,
        border: `1px solid ${cap.color}10`,
        background: 'rgba(20,20,30,0.45)',
        borderRadius: index === 0 ? '1.5rem' : index === 1 ? '1rem' : '1.25rem',
      }}
    >
      <h3 className="text-lg font-semibold tracking-tight mb-4" style={{ color: cap.color }}>{cap.title}</h3>
      <p className="text-sm text-muted font-light leading-relaxed mb-5">{cap.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {cap.items.map((item) => (
          <span key={item} className="px-2.5 py-1 text-[10px] font-medium rounded-lg tracking-wide" style={{ border: `1px solid ${cap.color}15`, color: cap.color, background: `${cap.color}06` }}>
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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden"
      id="capabilities"
    >
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '10%', left: '20%', width: '45%', height: '35%', background: 'radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="aurora-blob" style={{ bottom: '10%', right: '10%', width: '30%', height: '40%', background: 'radial-gradient(circle, rgba(251,191,36,0.05), transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#FBBF24' }}>03</span>
            <div ref={dividerRef} className="h-px flex-1 bg-gradient-to-r from-accent-cyan/20 to-transparent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {'Capabilities'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-amber" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
          <p className="text-sm text-muted/60 mt-3 font-light max-w-lg">Three disciplines that converge in every project I build.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-5">
            <CapabilityCard cap={capabilities[0]} index={0} />
          </div>
          <div className="md:col-span-4">
            <CapabilityCard cap={capabilities[1]} index={1} />
          </div>
          <div className="md:col-span-3">
            <CapabilityCard cap={capabilities[2]} index={2} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Capabilities
