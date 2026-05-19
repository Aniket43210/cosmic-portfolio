import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { charStagger, magneticTween, magneticReset, skewReveal } from '../utils/motion'
import { projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

function Tag({ text, color, index }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    anime({ targets: el, opacity: [0, 1], scale: [0.8, 1], duration: 400, delay: 500 + index * 60, easing: 'easeOutCubic' })
  }, [index])

  return (
    <span
      ref={ref}
      className="px-2 py-0.5 text-[10px] border rounded-full cursor-default select-none transition-all duration-250"
      style={{
        borderColor: hovered ? `${color}40` : 'rgba(255,255,255,0.06)',
        background: hovered ? `${color}15` : 'transparent',
        color: hovered ? '#fff' : '#71717a',
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text}
    </span>
  )
}

function ProjectCard({ project, index, onOpenStudy }) {
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const glowRef = useRef(null)
  const subtitleRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const detailRef = useRef(null)
  const animRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.fromTo(el, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, delay: index * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    })
    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.trigger === el) t.kill() }) }
  }, [index])

  useEffect(() => {
    if (!subtitleRef.current) return
    skewReveal(subtitleRef.current, 400 + index * 100)
  }, [index])

  useEffect(() => {
    if (!titleRef.current) return
    anime({ targets: titleRef.current, opacity: [0, 1], translateY: [15, 0], duration: 500, delay: 500 + index * 100, easing: 'easeOutExpo' })
  }, [index])

  useEffect(() => {
    if (!descRef.current) return
    anime({ targets: descRef.current, opacity: [0, 1], translateY: [10, 0], duration: 400, delay: 600 + index * 100, easing: 'easeOutCubic' })
  }, [index])

  const handleMove = (e) => {
    if (!cardRef.current || expanded) return
    const r = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    anime({ targets: cardRef.current, rotateX: -y * 4, rotateY: x * 4, easing: 'easeOutCubic', duration: 500 })
    if (contentRef.current) magneticTween(contentRef.current, x * 12, -y * 12, 1)
    if (glowRef.current) {
      const gx = ((e.clientX - r.left) / r.width) * 100
      const gy = ((e.clientY - r.top) / r.height) * 100
      glowRef.current.style.background = `radial-gradient(400px circle at ${gx}% ${gy}%, ${project.color}20, transparent 60%)`
      glowRef.current.style.opacity = '1'
    }
  }

  const handleLeave = () => {
    setHovered(false)
    if (cardRef.current && !expanded) anime({ targets: cardRef.current, rotateX: 0, rotateY: 0, easing: 'easeOutElastic(1, 0.5)', duration: 1000 })
    if (contentRef.current) magneticReset(contentRef.current)
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }

  const handleClick = () => {
    const next = !expanded
    const el = detailRef.current
    if (!el) return
    if (animRef.current) { animRef.current.cancel(); animRef.current = null }
    if (next) {
      el.style.display = 'block'
      el.style.height = 'auto'
      void el.offsetHeight
      const h = el.scrollHeight
      el.style.height = '0px'
      void el.offsetHeight
      animRef.current = el.animate([
        { height: '0px', opacity: 0 },
        { height: h + 'px', opacity: 1 }
      ], { duration: 400, easing: 'cubic-bezier(0.33, 1, 0.68, 1)', fill: 'forwards' })
    } else {
      const h = el.scrollHeight
      el.style.height = h + 'px'
      void el.offsetHeight
      animRef.current = el.animate([
        { height: h + 'px', opacity: 1 },
        { height: '0px', opacity: 0 }
      ], { duration: 300, easing: 'cubic-bezier(0.36, 0, 0.66, -0.56)', fill: 'forwards' })
    }
    setExpanded(next)
  }

  return (
    <div
      ref={cardRef}
      className={`group cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
      style={{ perspective: 1000, willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-colors duration-400 card-edge"
        style={{
          borderColor: hovered && !expanded ? `${project.color}25` : expanded ? `${project.color}20` : 'rgba(255,255,255,0.04)',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <div ref={glowRef} className="absolute inset-0 transition-opacity duration-500 pointer-events-none z-10" style={{ opacity: 0 }} />
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-800/80 via-midnight-900 to-midnight-950" />

        <div className="relative h-36 md:h-44 overflow-hidden z-[5]">
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${project.color}18, ${project.color}06 60%, transparent)` }} />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />
          {index === 0 && <div className="absolute top-4 left-6 w-16 h-16 border rounded-lg opacity-[0.08]" style={{ borderColor: project.color, transform: 'rotate(15deg)' }} />}
          {index === 1 && <div className="absolute top-6 right-10 w-20 h-8 rounded-full border opacity-[0.08]" style={{ borderColor: project.color }} />}
          {index === 2 && <div className="absolute bottom-8 left-8 w-12 h-12 border rounded-full opacity-[0.08]" style={{ borderColor: project.color }} />}
          {index === 3 && <div className="absolute top-5 right-8 w-14 h-14 opacity-[0.08]" style={{ borderColor: project.color, borderWidth: 1, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />}
        </div>

        <div ref={contentRef} className="relative p-6 md:p-8 z-20 -mt-8" style={{ willChange: 'transform' }}>
          <div className="flex items-center justify-between mb-3">
            <div ref={subtitleRef} className="flex items-center gap-2" style={{ opacity: 0 }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              <span className="text-[10px] text-charcoal-500 tracking-[0.2em] uppercase">{project.subtitle}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-charcoal-600">
              <span>{project.year}</span>
              <span className="text-charcoal-700">·</span>
              <span>{project.role}</span>
            </div>
          </div>

          <h3 ref={titleRef} className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight" style={{ opacity: 0 }}>{project.title}</h3>
          <p ref={descRef} className="text-sm text-charcoal-400 leading-relaxed font-light" style={{ opacity: 0 }}>{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
            {project.tags.map((t) => (
              <Tag key={t} text={t} color={project.color} index={project.tags.indexOf(t)} />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs transition-all duration-300" style={{ color: expanded ? project.color : '#71717a' }}>
            <span>{expanded ? 'Show less' : 'View case study'}</span>
            <motion.svg className="w-3 h-3" animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></motion.svg>
          </div>
        </div>

        <div ref={detailRef} className="overflow-hidden border-t border-white/5 mx-6 md:mx-8" style={{ height: 0, opacity: 0 }}>
          <div className="py-5">
            <span className="text-[10px] text-charcoal-600 tracking-wider uppercase mb-3 block">Key Outcomes</span>
            <ul className="space-y-2">
              {project.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal-300 font-light">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                  {d}
                </li>
              ))}
            </ul>
            <button onClick={(e) => { e.stopPropagation(); onOpenStudy(project) }} className="mt-4 text-[10px] tracking-wider uppercase transition-all duration-300 hover:opacity-80" style={{ color: project.color }}>Full case study →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects({ onOpenStudy }) {
  const titleRef = useRef(null)
  const dividerRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { charStagger(el); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!dividerRef.current) return
    gsap.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: dividerRef.current, start: 'top 90%', toggleActions: 'play none none none' } })
  }, [])

  useEffect(() => {
    if (!descRef.current) return
    const el = descRef.current
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { anime({ targets: el, opacity: [0, 1], translateY: [10, 0], duration: 500, delay: 300, easing: 'easeOutCubic' }); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="work">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-xs text-ember-500 tracking-[0.3em] uppercase font-medium">02</motion.span>
            <div ref={dividerRef} className="h-px flex-1 bg-gradient-to-r from-ember-400/30 to-transparent origin-left" />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {'Projects'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-ember" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
          <p ref={descRef} className="text-sm text-charcoal-500 mt-3 font-light max-w-lg" style={{ opacity: 0 }}>Click a project to expand details — each one represents a unique challenge and approach.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpenStudy={onOpenStudy} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
