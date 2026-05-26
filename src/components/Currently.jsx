import { useEffect, useRef } from 'react'
import anime from 'animejs'

const currentItems = [
  { label: 'Building', value: 'Next-gen motion engine for web', tag: 'Open Source', color: '#F59E0B' },
  { label: 'Exploring', value: 'WebGPU compute shaders & real-time sim', tag: 'Research', color: '#22D3EE' },
  { label: 'Reading', value: 'The Art of Fluid Motion & Interaction Design', tag: 'Book', color: '#EC4899' },
  { label: 'Listening', value: 'Ambient electronic & cinematic scores', tag: 'Playlist', color: '#FBBF24' },
]

function NowItem({ item, index }) {
  const ref = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: el, opacity: [0, 1], translateY: [12, 0], duration: 600, delay: index * 80, easing: 'easeOutExpo' })
          anime({ targets: tagRef.current, opacity: [0, 1], scale: [0.9, 1], duration: 400, delay: 300 + index * 80, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [index])

  return (
    <div ref={ref} className="rounded-2xl p-4 card-edge" style={{ opacity: 0, border: `1px solid ${item.color}10`, background: 'rgba(20,20,30,0.4)' }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-muted/50 tracking-wider uppercase">{item.label}</span>
        <span ref={tagRef} className="ml-auto px-1.5 py-0.5 text-[9px] rounded text-muted/50 uppercase tracking-wider" style={{ opacity: 0, border: `1px solid ${item.color}15` }}>{item.tag}</span>
      </div>
      <p className="text-sm font-light" style={{ color: item.color }}>{item.value}</p>
    </div>
  )
}

function Currently() {
  const titleRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    if (!dotRef.current) return
    anime({ targets: dotRef.current, opacity: [1, 0.2], scale: [1, 0.8], duration: 1500, loop: true, direction: 'alternate', easing: 'easeInOutSine' })
  }, [])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { anime({ targets: el, opacity: [0, 1], translateY: [-8, 0], duration: 600, easing: 'easeOutExpo' }); o.unobserve(el) } }) }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section className="relative py-16 px-6 md:px-16 lg:px-24" id="now">
      <div className="max-w-6xl mx-auto relative z-10">
          <div ref={titleRef} className="rounded-2xl p-6 md:p-8 glass-pink" style={{ opacity: 0 }}>
          <div className="grid md:grid-cols-2 gap-3">
            {currentItems.map((item, i) => (<NowItem key={item.label} item={item} index={i} />))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Currently
