import { useEffect, useRef } from 'react'
import anime from 'animejs'

const COLORS = [
  'rgba(251,146,60,0.5)',
  'rgba(34,211,238,0.5)',
  'rgba(217,70,239,0.4)',
  'rgba(52,211,153,0.4)',
]

function RippleEffect() {
  const pool = useRef([])

  useEffect(() => {
    const handleClick = (e) => {
      const el = document.createElement('div')
      const size = 20 + Math.random() * 40
      const x = e.clientX
      const y = e.clientY
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]

      el.style.cssText = `
        position: fixed;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 1px solid ${color};
        pointer-events: none;
        z-index: 9999;
        will-change: transform, opacity;
      `

      const inner = document.createElement('div')
      inner.style.cssText = `
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: ${color.replace('0.5', '0.08').replace('0.4', '0.06')};
      `
      el.appendChild(inner)
      document.body.appendChild(el)
      pool.current.push(el)

      anime({
        targets: el,
        scale: [1, 3 + Math.random() * 2],
        opacity: [0.6, 0],
        duration: 600 + Math.random() * 300,
        easing: 'easeOutCubic',
        complete: () => {
          el.remove()
          pool.current = pool.current.filter((d) => d !== el)
        },
      })
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      pool.current.forEach((el) => el.remove())
      pool.current = []
    }
  }, [])

  return null
}

export default RippleEffect
