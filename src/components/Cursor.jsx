import { useEffect, useRef } from 'react'
import { playHover } from '../utils/sound'

function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const isTouch = useRef(
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  )

  useEffect(() => {
    if (isTouch.current) return

    document.body.style.cursor = 'none'

    const handleMouse = (e) => { target.current.x = e.clientX; target.current.y = e.clientY }
    const handleTouch = (e) => {
      const t = e.touches[0]
      if (t) { target.current.x = t.clientX; target.current.y = t.clientY }
    }

    const hOn = () => { hovering.current = true; playHover() }
    const hOff = () => { hovering.current = false }

    let overHandler, outHandler
    document.body.addEventListener('mouseover', overHandler = (e) => {
      if (e.target.matches('a, button, [data-cursor]') || e.target.closest('a, button, [data-cursor]')) hOn()
    })
    document.body.addEventListener('mouseout', outHandler = (e) => {
      if (e.target.matches('a, button, [data-cursor]') || e.target.closest('a, button, [data-cursor]')) hOff()
    })

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('touchmove', handleTouch, { passive: true })
    let id, frameCount = 0

    function spawnParticle(x, y) {
      const el = document.createElement('div')
      const size = 1.5 + Math.random() * 2
      const a = Math.random() * Math.PI * 2
      const d = 10 + Math.random() * 20
      const duration = 400 + Math.random() * 300
      el.style.cssText = `position:fixed;left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(245,158,11,0.3);pointer-events:none;z-index:9997;transition:transform ${duration}ms ease-out,opacity ${duration}ms ease-out;transform:translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px);opacity:0`
      document.body.appendChild(el)
      setTimeout(() => { try { el.remove() } catch(e) {} }, duration + 50)
    }

    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12

      if (++frameCount % 5 === 0 && !hovering.current && Math.abs(target.current.x - pos.current.x) > 2) {
        spawnParticle(target.current.x, target.current.y)
      }

      if (ringRef.current) {
        const s = hovering.current ? 1.6 : 1
        ringRef.current.style.transform = `translate(${pos.current.x - 14}px, ${pos.current.y - 14}px) scale(${s})`
        ringRef.current.style.borderColor = hovering.current ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.06)'
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 2}px, ${pos.current.y - 2}px)`
        dotRef.current.style.background = hovering.current ? '#F59E0B' : '#94A3B8'
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 40}px, ${pos.current.y - 40}px)`
        glowRef.current.style.opacity = hovering.current ? '0.15' : '0'
      }
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)

    return () => {
      document.body.style.cursor = ''
      document.body.removeEventListener('mouseover', overHandler)
      document.body.removeEventListener('mouseout', outHandler)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleTouch)
      cancelAnimationFrame(id)
    }
  }, [])

  if (isTouch.current) return null

  return (
    <>
      <div ref={glowRef} style={{ position: 'fixed', top: 0, left: 0, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15), transparent)', pointerEvents: 'none', zIndex: 9998, willChange: 'transform', transition: 'opacity 0.3s' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none', zIndex: 9999, willChange: 'transform', transition: 'border-color 0.4s', backdropFilter: 'blur(4px)' }} />
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: 4, height: 4, borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, willChange: 'transform', transition: 'background 0.4s' }} />
    </>
  )
}

export default Cursor
