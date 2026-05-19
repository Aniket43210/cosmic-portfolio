import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { charStagger, morphPath } from '../utils/motion'

function WaveMorph() {
  const pathRef = useRef(null)
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const p = pathRef.current
    if (!p) return
    morphPath(p, 'M10,80 Q50,20 90,80 T170,80', 'M10,80 Q50,140 90,80 T170,80')
    return () => anime.remove(p)
  }, [])

  useEffect(() => {
    if (!pathRef.current) return
    anime({ targets: pathRef.current, stroke: hovered ? '#fb923c' : '#22d3ee', strokeWidth: hovered ? 2.5 : 1.5, duration: 400, easing: 'easeOutQuad' })
    if (cardRef.current) {
      anime({ targets: cardRef.current, borderColor: hovered ? 'rgba(251,146,60,0.2)' : 'rgba(255,255,255,0.05)', duration: 400 })
    }
  }, [hovered])

  return (
    <div ref={cardRef} className="relative rounded-lg p-6 min-h-[220px] flex flex-col justify-between transition-colors" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(145deg, rgba(34,211,238,0.03), transparent)' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span className="text-xs text-surge-400 tracking-[0.2em] uppercase font-medium">Wave Morph</span>
      <div className="relative mt-2">
        <svg viewBox="0 0 180 120" className="w-full h-auto" fill="none">
          <path ref={pathRef} d="M10,80 Q50,20 90,80 T170,80" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/40 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

function SpringPlayground() {
  const dotRef = useRef(null)
  const cardRef = useRef(null)
  const [pulled, setPulled] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    setPulled(!pulled)
    if (!dotRef.current) return
    anime.remove(dotRef.current)
    anime({ targets: dotRef.current, translateX: pulled ? 0 : 70, easing: 'easeOutElastic(2.5, 0.3)', duration: 1500 })
  }

  return (
    <div ref={cardRef} className="relative rounded-lg p-6 min-h-[220px] flex flex-col justify-between transition-colors" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(145deg, rgba(251,146,60,0.03), transparent)' }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div>
        <span className="text-xs text-ember-300 tracking-[0.2em] uppercase font-medium">Spring Physics</span>
        <p className="text-xs text-charcoal-500 mt-2 leading-relaxed">Elastic easing demo — click to launch</p>
      </div>
      <div className="relative h-20 flex items-end cursor-pointer mt-4" onClick={handleClick}>
        <div className="w-full h-px bg-white/[0.04] absolute bottom-6" />
        <div
          ref={dotRef}
          className="absolute rounded-full shadow-lg cursor-pointer border-2 transition-shadow"
          style={{ left: 8, bottom: 12, width: 22, height: 22, background: '#22d3ee', borderColor: '#05050a', boxShadow: hovered ? '0 0 20px rgba(34,211,238,0.3)' : '0 4px 12px rgba(34,211,238,0.2)' }}
        />
        <div className="absolute left-0 bottom-6 w-full flex justify-between text-[10px] text-charcoal-700 px-1 pointer-events-none">
          <span>0</span>
          <span>70px</span>
        </div>
      </div>
    </div>
  )
}

function SvgShowcase() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { charStagger(el); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24 overflow-hidden" id="experiments">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-xs text-surge-500 tracking-[0.3em] uppercase font-medium">03</motion.span>
            <div className="h-px flex-1 bg-gradient-to-r from-surge-400/30 to-transparent" />
          </div>
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {'Experiments'.split('').map((c, i) => (
                <span key={i} className="char inline-block text-gradient-surge" style={{ opacity: 0 }}>{c}</span>
              ))}
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <WaveMorph />
          <SpringPlayground />
        </div>
      </div>
    </motion.section>
  )
}

export default SvgShowcase
