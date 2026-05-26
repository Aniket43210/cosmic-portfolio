import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger, circleFill } from '../utils/motion'

const skillGroups = [
  {
    label: 'Frontend',
    accent: '#F59E0B',
    items: [{ name: 'React', pct: 92 }, { name: 'Next.js', pct: 78 }, { name: 'TypeScript', pct: 82 }, { name: 'Tailwind', pct: 88 }],
  },
  {
    label: 'Backend',
    accent: '#22D3EE',
    items: [{ name: 'Node.js', pct: 86 }, { name: 'Python', pct: 79 }, { name: 'Express', pct: 81 }, { name: 'FastAPI', pct: 74 }],
  },
  {
    label: 'ML/AI',
    accent: '#EC4899',
    items: [{ name: 'XGBoost', pct: 85 }, { name: 'SHAP', pct: 78 }, { name: 'CNN', pct: 72 }, { name: 'Transformers', pct: 68 }],
  },
  {
    label: 'Infrastructure',
    accent: '#FBBF24',
    items: [{ name: 'Docker', pct: 82 }, { name: 'Cloudflare', pct: 75 }, { name: 'PostgreSQL', pct: 78 }, { name: 'Redis', pct: 65 }],
  },
]

function SkillGauge({ skill, accent, groupIndex, index }) {
  const canvasRef = useRef(null)
  const pctRef = useRef(null)
  const wrapRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = 56; canvas.height = 56
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const delay = 400 + groupIndex * 200 + index * 80
    const anim = circleFill(canvas, skill.pct, accent, delay)
    return () => { if (anim) anim.pause() }
  }, [skill.pct, accent, groupIndex, index])

  useEffect(() => {
    const el = pctRef.current
    if (!el) return
    el.textContent = '0%'
    const delay = 500 + groupIndex * 200 + index * 80
    const anim = anime({ targets: el, innerHTML: [0, skill.pct], duration: 1000, delay, easing: 'easeOutCubic', round: 1 })
    return () => anim.pause()
  }, [skill.pct, groupIndex, index])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const delay = 300 + groupIndex * 200 + index * 60
    anime({ targets: el, opacity: [0, 1], translateY: [10, 0], duration: 500, delay, easing: 'easeOutExpo' })
  }, [groupIndex, index])

  return (
    <div ref={wrapRef} className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-default" style={{ opacity: 0 }}
      onMouseEnter={() => { if (pctRef.current) { anime.remove(pctRef.current); anime({ targets: pctRef.current, color: '#F8FAFC', duration: 200 }) } }}
      onMouseLeave={() => { if (pctRef.current) { anime.remove(pctRef.current); anime({ targets: pctRef.current, color: accent, duration: 300 }) } }}
    >
      <div className="relative flex-shrink-0">
        <canvas ref={canvasRef} className="w-9 h-9 md:w-12 md:h-12" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-xs md:text-sm font-medium text-muted">{skill.name}</span>
        <span ref={pctRef} className="text-[10px] md:text-xs font-mono" style={{ color: accent }}></span>
      </div>
    </div>
  )
}

function SkillCard({ group, index }) {
  const cardRef = useRef(null)
  const labelRef = useRef(null)
  const { accent, label, items } = group

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const dx = index === 0 ? -30 : index === 3 ? 30 : 0
    const dy = index === 1 ? -20 : index === 2 ? 20 : 0
    anime({ targets: el, opacity: [0, 1], translateX: [dx, 0], translateY: [dy, 0], duration: 900, delay: index * 120, easing: 'easeOutExpo' })
  }, [index])

  useEffect(() => {
    if (!labelRef.current) return
    anime({ targets: labelRef.current, opacity: [0, 1], translateX: [-10, 0], duration: 500, delay: 300 + index * 120, easing: 'easeOutCubic' })
  }, [index])

  return (
    <div ref={cardRef} className="relative rounded-2xl overflow-hidden border card-edge" style={{ borderColor: `${accent}10`, opacity: 0, background: 'rgba(20,20,30,0.5)' }}>
      <div className="relative p-4 md:p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <span ref={labelRef} className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: accent, opacity: 0 }}>{label}</span>
        </div>
        <div className="space-y-0.5">
          {items.map((s, i) => (<SkillGauge key={s.name} skill={s} accent={accent} groupIndex={index} index={i} />))}
        </div>
      </div>
    </div>
  )
}

function Skills() {
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
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="skills">
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '20%', left: '-10%', width: '35%', height: '40%', background: 'radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#22D3EE' }}>04</span>
            <div ref={dividerRef} className="h-px flex-1 bg-gradient-to-r from-accent-amber/20 to-transparent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {'Toolkit'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-cyan" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((g, i) => (<SkillCard key={g.label} group={g} index={i} />))}
        </div>
      </div>
    </motion.section>
  )
}

export default Skills
