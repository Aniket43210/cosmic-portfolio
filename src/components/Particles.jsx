import { useEffect, useRef } from 'react'
import anime from 'animejs'

const COLORS = ['rgba(251,146,60,', 'rgba(34,211,238,', 'rgba(217,70,239,']

function Particles({ count = 30 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const dots = []
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div')
      const size = 1 + Math.random() * 2
      d.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${COLORS[i % 3]}${0.15 + Math.random() * 0.15});left:${Math.random() * 100}%;top:${Math.random() * 100}%;pointer-events:none`
      el.appendChild(d)
      dots.push(d)
    }
    const anim = anime({
      targets: dots,
      translateX: () => anime.random(-40, 40),
      translateY: () => anime.random(-40, 40),
      duration: () => 3000 + Math.random() * 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: () => Math.random() * 2000,
    })
    return () => { anim.pause(); dots.forEach(d => d.remove()) }
  }, [count])

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}

export default Particles
