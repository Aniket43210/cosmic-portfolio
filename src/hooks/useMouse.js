import { useState, useEffect, useRef } from 'react'

export function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [normalized, setNormalized] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let rafId

    const handleMouse = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15,
      }))
      setNormalized({
        x: (targetRef.current.x / window.innerWidth) * 2 - 1,
        y: (targetRef.current.y / window.innerHeight) * 2 - 1,
      })
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouse)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { position, normalized }
}
