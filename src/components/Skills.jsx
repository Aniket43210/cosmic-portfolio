import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger, circleFill, rotateFloat, swingIdle, glowPulse, skewReveal } from '../utils/motion'

const skillGroups = [
  {
    label: 'Frontend',
    color: 'ember',
    bg: 'rgba(251,146,60,0.06)',
    accent: '#fb923c',
    items: [
      { name: 'React', pct: 92, icon: '◆' },
      { name: 'Next.js', pct: 78, icon: '▲' },
      { name: 'TypeScript', pct: 82, icon: '●' },
      { name: 'Tailwind', pct: 88, icon: '■' },
    ],
  },
  {
    label: 'Backend',
    color: 'surge',
    bg: 'rgba(34,211,238,0.06)',
    accent: '#22d3ee',
    items: [
      { name: 'Node.js', pct: 86, icon: '◈' },
      { name: 'Python', pct: 79, icon: '◇' },
      { name: 'Express', pct: 81, icon: '○' },
      { name: 'FastAPI', pct: 74, icon: '□' },
    ],
  },
  {
    label: 'ML/AI',
    color: 'bloom',
    bg: 'rgba(217,70,239,0.06)',
    accent: '#d946ef',
    items: [
      { name: 'XGBoost', pct: 85, icon: '◉' },
      { name: 'SHAP', pct: 78, icon: '◎' },
      { name: 'CNN', pct: 72, icon: '⬟' },
      { name: 'Transformers', pct: 68, icon: '⬡' },
    ],
  },
  {
    label: 'Infrastructure',
    color: 'emerald',
    bg: 'rgba(52,211,153,0.06)',
    accent: '#34d399',
    items: [
      { name: 'Docker', pct: 82, icon: '▣' },
      { name: 'Cloudflare', pct: 75, icon: '▤' },
      { name: 'PostgreSQL', pct: 78, icon: '▥' },
      { name: 'Redis', pct: 65, icon: '▦' },
    ],
  },
]

function SkillGauge({ skill, color, accent, index, groupIndex }) {
  const canvasRef = useRef(null)
  const labelRef = useRef(null)
  const pctRef = useRef(null)
  const iconRef = useRef(null)
  const wrapRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const fillAnimRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = 64
    canvas.height = 64
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const delay = 400 + groupIndex * 200 + index * 100
    fillAnimRef.current = circleFill(canvas, skill.pct, accent, delay)
    return () => { if (fillAnimRef.current) fillAnimRef.current.pause() }
  }, [skill.pct, accent, groupIndex, index])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const delay = 300 + groupIndex * 200 + index * 80
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 500,
      delay,
      easing: 'easeOutExpo',
    })
  }, [groupIndex, index])

  useEffect(() => {
    const el = pctRef.current
    if (!el) return
    el.textContent = '0%'
    el.style.color = accent
    const delay = 500 + groupIndex * 200 + index * 80
    const anim = anime({
      targets: el,
      innerHTML: [0, skill.pct],
      duration: 1200,
      delay,
      easing: 'easeOutCubic',
      round: 1,
    })
    return () => anim.pause()
  }, [skill.pct, accent, groupIndex, index])

  useEffect(() => {
    if (!iconRef.current) return
    const types = [rotateFloat, swingIdle]
    const fn = types[index % types.length]
    const anim = fn(iconRef.current)
    return () => anim.pause()
  }, [index])

  const handleEnter = () => {
    setHovered(true)
    if (!wrapRef.current) return
    anime.remove(wrapRef.current)
    anime({
      targets: wrapRef.current,
      scale: 1.08,
      translateY: -4,
      duration: 300,
      easing: 'easeOutCubic',
    })
    if (pctRef.current) {
      anime.remove(pctRef.current)
      anime({ targets: pctRef.current, color: '#ffffff', duration: 200 })
    }
  }

  const handleLeave = () => {
    setHovered(false)
    if (!wrapRef.current) return
    anime.remove(wrapRef.current)
    anime({
      targets: wrapRef.current,
      scale: 1,
      translateY: 0,
      duration: 500,
      easing: 'easeOutElastic(0.6, 0.6)',
    })
    if (pctRef.current) {
      anime.remove(pctRef.current)
      anime({ targets: pctRef.current, color: accent, duration: 300 })
    }
  }

  return (
    <div
      ref={wrapRef}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-default"
      style={{ opacity: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="relative flex-shrink-0">
        <canvas ref={canvasRef} className="w-10 h-10 md:w-14 md:h-14" />
        <span ref={iconRef} className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs pointer-events-none" style={{ color: hovered ? '#fff' : accent }}>{skill.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <span ref={labelRef} className="block text-xs md:text-sm font-medium" style={{ color: hovered ? '#fff' : '#a1a1aa' }}>{skill.name}</span>
          <span ref={pctRef} className="text-[10px] md:text-xs font-mono"></span>
      </div>
    </div>
  )
}

function SkillCard({ group, index }) {
  const cardRef = useRef(null)
  const labelRef = useRef(null)
  const shapeRef = useRef(null)
  const { accent, bg, label, items } = group

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const dx = index === 0 ? -50 : index === 3 ? 50 : 0
    const dy = index === 1 ? -30 : index === 2 ? 30 : 0
    anime({
      targets: el,
      opacity: [0, 1],
      translateX: [dx, 0],
      translateY: [dy, 0],
      duration: 900,
      delay: index * 150,
      easing: 'easeOutExpo',
    })
  }, [index])

  useEffect(() => {
    if (!labelRef.current) return
    anime({
      targets: labelRef.current,
      opacity: [0, 1],
      translateX: [-12, 0],
      duration: 500,
      delay: 300 + index * 150,
      easing: 'easeOutCubic',
    })
  }, [index])

  useEffect(() => {
    if (!shapeRef.current) return
    anime({
      targets: shapeRef.current,
      rotate: [0, 360],
      scale: [1, 1.05],
      duration: 25000 + index * 5000,
      loop: true,
      easing: 'linear',
    })
  }, [index])

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden border"
      style={{ borderColor: `${accent}15`, opacity: 0, background: `linear-gradient(145deg, ${bg}, transparent)` }}
    >
      <div ref={shapeRef} className="absolute -top-8 -right-8 w-28 h-28 opacity-[0.02] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${accent}, transparent)`,
            clipPath: index === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                       index === 1 ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' :
                       index === 2 ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' :
                       'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        />
      </div>

      <div className="relative p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <span ref={labelRef} className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: accent, opacity: 0 }}>{label}</span>
        </div>
        <div className="space-y-0.5">
          {items.map((s, i) => (
            <SkillGauge key={s.name} skill={s} accent={accent} groupIndex={index} index={i} color={group.color} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Skills() {
  const titleRef = useRef(null)
  const numberRef = useRef(null)
  const bgLineRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { charStagger(el); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    const el = numberRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { skewReveal(el); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!bgLineRef.current) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { anime({ targets: bgLineRef.current, scaleX: [0, 1], duration: 1200, easing: 'easeOutCubic' }); o.unobserve(entry.target) } }) }, { threshold: 0.3 })
    o.observe(bgLineRef.current)
    return () => o.disconnect()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <span ref={numberRef} className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#fb923c', opacity: 0 }}>04</span>
            <div ref={bgLineRef} className="h-px flex-1 bg-gradient-to-r from-ember-400/30 to-transparent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {'Toolkit'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-dual" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.label} group={g} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Skills
