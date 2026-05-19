import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const items = [
  { name: 'React', cat: 'Frontend' }, { name: 'TypeScript', cat: 'Frontend' }, { name: 'TailwindCSS', cat: 'Frontend' },
  { name: 'Next.js', cat: 'Frontend' }, { name: 'Vite', cat: 'Frontend' }, { name: 'Three.js', cat: 'Frontend' },
  { name: 'WebGL', cat: 'Frontend' }, { name: 'Storybook', cat: 'Frontend' }, { name: 'GSAP', cat: 'Motion' },
  { name: 'Anime.js', cat: 'Motion' }, { name: 'Framer', cat: 'Motion' }, { name: 'Lenis', cat: 'Motion' },
  { name: 'Node.js', cat: 'Backend' }, { name: 'Python', cat: 'Backend' }, { name: 'Rust', cat: 'Backend' },
  { name: 'PostgreSQL', cat: 'Backend' }, { name: 'Redis', cat: 'Backend' }, { name: 'GraphQL', cat: 'Backend' },
  { name: 'Docker', cat: 'Backend' }, { name: 'AWS', cat: 'Backend' }, { name: 'Figma', cat: 'Creative' },
  { name: 'Blender', cat: 'Creative' }, { name: 'GLSL', cat: 'Creative' }, { name: 'WebGPU', cat: 'Creative' },
  { name: 'D3', cat: 'Creative' },
]

const catColors = [
  { text: '#fb923c', glow: 'rgba(251,146,60,0.3)', bg: 'rgba(251,146,60,0.06)', dot: '#fb923c' },
  { text: '#22d3ee', glow: 'rgba(34,211,238,0.3)', bg: 'rgba(34,211,238,0.06)', dot: '#22d3ee' },
  { text: '#d946ef', glow: 'rgba(217,70,239,0.3)', bg: 'rgba(217,70,239,0.06)', dot: '#d946ef' },
  { text: '#34d399', glow: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.06)', dot: '#34d399' },
]

const catKey = { Frontend: 0, Motion: 1, Backend: 2, Creative: 3 }

function TechItem({ name, ci, index, total, burstEntered }) {
  const ref = useRef(null)
  const c = catColors[ci]
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!burstEntered || !ref.current) return
    const angle = (index / total) * Math.PI * 2
    const dist = 80 + Math.random() * 50
    const tx = Math.cos(angle) * dist
    const ty = Math.sin(angle) * dist
    const delay = Math.random() * 400
    anime({
      targets: ref.current,
      opacity: [0, 1],
      scale: [0.3, 1],
      translateX: [tx, 0],
      translateY: [ty, 0],
      duration: 800,
      delay,
      easing: 'easeOutExpo',
    })
  }, [burstEntered, index, total])

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-light cursor-default select-none"
      style={{ opacity: 0, color: c.text, borderColor: `${c.text}15`, background: 'transparent', willChange: 'transform' }}
      onMouseEnter={() => {
        setHovered(true)
        if (!ref.current) return
        anime.remove(ref.current)
        anime({ targets: ref.current, scale: 1.15, color: '#ffffff', borderColor: c.text + '50', background: c.bg, boxShadow: `0 0 25px ${c.glow}`, duration: 250, easing: 'easeOutCubic' })
      }}
      onMouseLeave={() => {
        setHovered(false)
        if (!ref.current) return
        anime.remove(ref.current)
        anime({ targets: ref.current, scale: 1, color: c.text, borderColor: c.text + '15', background: 'transparent', boxShadow: 'none', duration: 400, easing: 'easeOutCubic' })
      }}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: c.dot }} />
      {name}
    </span>
  )
}

function TechMarquee() {
  const sectionRef = useRef(null)
  const badgeRef = useRef(null)
  const ringRef = useRef(null)
  const [burstEntered, setBurstEntered] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBurstEntered(true)
          if (badgeRef.current) {
            anime({ targets: badgeRef.current, opacity: [0, 1], scale: [0, 1], duration: 600, easing: 'easeOutElastic(0.9, 0.6)' })
          }
          o.unobserve(el)
        }
      })
    }, { threshold: 0.15 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    if (!ringRef.current) return
    anime({ targets: ringRef.current, rotate: [0, 360], duration: 25000, loop: true, easing: 'linear' })
  }, [])

  const labelRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    const o = new IntersectionObserver((e) => { e.forEach((e) => { if (e.isIntersecting) { anime({ targets: el, opacity: [0, 1], translateY: [-8, 0], duration: 500, easing: 'easeOutExpo' }); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const o = new IntersectionObserver((e) => { e.forEach((e) => { if (e.isIntersecting) { anime({ targets: el, scaleX: [0, 1], duration: 1200, easing: 'easeOutCubic' }); o.unobserve(el) } }) }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span ref={labelRef} className="text-xs text-surge-500 tracking-[0.3em] uppercase font-medium" style={{ opacity: 0 }}>Stack</span>
            <div ref={lineRef} className="h-px flex-1 bg-gradient-to-r from-surge-400/30 to-transparent origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>

        <div className="relative">
          <div ref={ringRef} className="glow-ambient w-[400px] h-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surge-500/3" />

          <div ref={badgeRef} className="flex items-center justify-center mb-8" style={{ opacity: 0 }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent)', border: '1px solid rgba(34,211,238,0.1)' }}>
              <span className="text-[9px] text-surge-400 tracking-[0.25em] uppercase font-medium">λ</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {items.map((t, i) => (
              <TechItem key={t.name} name={t.name} ci={catKey[t.cat]} index={i} total={items.length} burstEntered={burstEntered} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-[10px] text-charcoal-700 tracking-wider text-center font-light">
          <span className="inline-flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-charcoal-700" />
            Hover items · Radial burst entrance from core
          </span>
        </div>
      </div>
    </section>
  )
}

export default TechMarquee
