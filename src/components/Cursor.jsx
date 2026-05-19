import { useEffect, useRef } from 'react'
import { playHover } from '../utils/sound'

function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const magnetic = useRef(false)

  useEffect(() => {
    const handleMouse = (e) => { target.current.x = e.clientX; target.current.y = e.clientY }

    const hOn = (e) => {
      hovering.current = true
      playHover()
      const el = e.currentTarget
      if (el.dataset.magnetic !== undefined) {
        magnetic.current = true
        const r = el.getBoundingClientRect()
        const pull = () => {
          if (!magnetic.current) return
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          target.current.x += (cx - target.current.x) * 0.3
          target.current.y += (cy - target.current.y) * 0.3
          requestAnimationFrame(pull)
        }
        pull()
      }
    }

    const hOff = () => {
      hovering.current = false
      magnetic.current = false
    }

    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', hOn)
      el.addEventListener('mouseleave', hOff)
    })

    window.addEventListener('mousemove', handleMouse)
    let id, frameCount = 0
    const particles = []

    function spawnParticle(x, y) {
      const el = document.createElement('div')
      const size = 1.5 + Math.random() * 3
      const a = Math.random() * Math.PI * 2
      const d = 15 + Math.random() * 35
      el.style.cssText = `position:fixed;left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(251,146,60,0.5);pointer-events:none;z-index:9997;transition:all ${500+Math.random()*400}ms ease-out;transform:translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px);opacity:0`
      document.body.appendChild(el)
      particles.push(el)
      setTimeout(() => { el.remove(); const idx = particles.indexOf(el); if (idx > -1) particles.splice(idx, 1) }, 900)
    }

    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * 0.1
      pos.current.y += (target.current.y - pos.current.y) * 0.1

      if (++frameCount % 3 === 0 && !hovering.current) {
        spawnParticle(target.current.x, target.current.y)
      }

      if (ringRef.current) {
        const s = hovering.current ? 1.6 : 1
        ringRef.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px) scale(${s})`
        ringRef.current.style.borderColor = hovering.current ? 'rgba(251,146,60,0.5)' : 'rgba(255,255,255,0.12)'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 2}px, ${pos.current.y - 2}px)`
        dotRef.current.style.background = hovering.current ? '#fb923c' : '#ffffff'
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 40}px)`
        glowRef.current.style.opacity = hovering.current ? '0.15' : '0'
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(id)
      particles.forEach(el => el.remove())
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hovering.current = true })
        el.addEventListener('mouseleave', () => { hovering.current = false })
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={glowRef} style={{ position: 'fixed', top: 0, left: 0, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,146,60,0.3), transparent)', pointerEvents: 'none', zIndex: 9998, willChange: 'transform', transition: 'opacity 0.3s' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.12)', pointerEvents: 'none', zIndex: 9999, willChange: 'transform', transition: 'border-color 0.3s', backdropFilter: 'blur(4px)' }} />
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 4, height: 4, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, willChange: 'transform', transition: 'background 0.3s' }} />
    </>
  )
}

export default Cursor
