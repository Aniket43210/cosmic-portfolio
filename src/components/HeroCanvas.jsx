import { useEffect, useRef } from 'react'

function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let id

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.04 - 0.02,
      r: 0.5 + Math.random() * 1.5,
      a: 0.3 + Math.random() * 0.7,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      color: ['rgba(245,158,11,', 'rgba(34,211,238,', 'rgba(236,72,153,'][Math.floor(Math.random() * 3)],
    }))

    function draw() {
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)
      const t = performance.now() * 0.001

      ctx.fillStyle = 'rgba(5,5,5,0.3)'
      ctx.fillRect(0, 0, cw, ch)

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * 0.2 + p.phase) * 0.005
        p.y += p.vy + Math.cos(t * 0.15 + p.phase * 1.3) * 0.005
        if (p.x < -5 || p.x > 105) p.vx *= -1
        if (p.y < -5 || p.y > 105) p.vy *= -1

        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * p.speed + p.phase))
        ctx.beginPath()
        ctx.arc(cw * p.x / 100, ch * p.y / 100, p.r * twinkle * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${0.08 * twinkle}`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(cw * p.x / 100, ch * p.y / 100, p.r * 2 * twinkle, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${0.02 * twinkle}`
        ctx.fill()
      })

      id = requestAnimationFrame(draw)
    }
    id = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(id)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.5 }} />
}

export default HeroCanvas
