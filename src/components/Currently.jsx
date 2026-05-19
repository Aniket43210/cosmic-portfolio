import { useEffect, useRef } from 'react'
import anime from 'animejs'

const currentItems = [
  { label: 'Building', value: 'Next-gen motion engine for web', tag: 'Open Source' },
  { label: 'Exploring', value: 'WebGPU compute shaders & real-time sim', tag: 'Research' },
  { label: 'Reading', value: 'The Art of Fluid Motion & Interaction Design', tag: 'Book' },
  { label: 'Listening', value: 'Ambient electronic & cinematic scores', tag: 'Playlist' },
]

const colors = ['#fb923c', '#22d3ee', '#d946ef', '#34d399']

function NowItem({ item, index }) {
  const ref = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: el, opacity: [0, 1], translateY: [15, 0], duration: 600, delay: index * 100, easing: 'easeOutExpo' })
          anime({ targets: tagRef.current, opacity: [0, 1], scale: [0.85, 1], duration: 400, delay: 300 + index * 100, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="rounded-lg p-4"
      style={{ opacity: 0, border: `1px solid ${colors[index]}12`, background: `linear-gradient(135deg, ${colors[index]}06, transparent)` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-charcoal-500 tracking-wider uppercase">{item.label}</span>
        <span ref={tagRef} className="ml-auto px-1.5 py-0.5 text-[9px] rounded text-charcoal-500 uppercase tracking-wider" style={{ opacity: 0, border: `1px solid ${colors[index]}20` }}>{item.tag}</span>
      </div>
      <p className="text-sm font-light" style={{ color: colors[index] }}>{item.value}</p>
    </div>
  )
}

function Currently() {
  const titleRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!dotRef.current) return
    anime({ targets: dotRef.current, opacity: [1, 0.15], scale: [1, 0.7], duration: 1200, loop: true, direction: 'alternate', easing: 'easeInOutSine' })
  }, [])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { anime({ targets: el, opacity: [0, 1], translateY: [-10, 0], duration: 600, easing: 'easeOutExpo' }); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section className="py-16 px-6 md:px-16 lg:px-24" id="now">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="rounded-xl p-6 md:p-8" style={{ opacity: 0, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.015)', backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center gap-2.5 mb-6">
            <div ref={dotRef} className="w-2 h-2 rounded-full shadow-lg" style={{ background: '#34d399', boxShadow: '0 0 12px rgba(52,211,153,0.3)' }} />
            <span className="text-sm font-medium" style={{ color: '#6ee7b7' }}>Currently</span>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {currentItems.map((item, i) => (
              <NowItem key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Currently
