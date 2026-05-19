import { useEffect, useRef } from 'react'

const PI = Math.PI
const TAU = PI * 2

function HeroOrb() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const time = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, id

    function size() {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      w = canvas.width = canvas.offsetWidth * devicePixelRatio
      h = canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    size()
    window.addEventListener('resize', size)

    const mousemove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2
      mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2
    }
    window.addEventListener('mousemove', mousemove)

    const stars = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      r: 0.3 + Math.random() * 1,
      s: 0.2 + Math.random() * 0.5,
      p: Math.random() * TAU,
    }))

    const floaters = Array.from({ length: 6 }, () => ({
      x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      r: 0.5 + Math.random() * 1.5,
      color: Math.random() > 0.5 ? 'rgba(251,146,60,' : 'rgba(34,211,238,',
    }))

    function drawRing(cx, cy, rx, ry, angle, phase, color, lw) {
      const steps = 64
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const pts = []

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * TAU
        const wave = Math.sin(t * 3 + time.current * 0.8 + phase) * 4
        const x = (rx + wave) * Math.cos(t)
        const y = (ry + wave * 0.5) * Math.sin(t)
        const rotX = x * cosA - y * sinA
        const rotY = x * sinA + y * cosA
        pts.push({ x: cx + rotX, y: cy + rotY })
      }

      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = lw || 1.2
      ctx.stroke()
      return pts
    }

    function drawParticles(ringPts, color) {
      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(((i / 5) * ringPts.length + time.current * 20) % ringPts.length)
        const p = ringPts[idx]
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2 + Math.sin(time.current * 2 + i) * 0.8, 0, TAU)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function render() {
      const cw = canvas.offsetWidth
      const ch = canvas.offsetHeight
      ctx.clearRect(0, 0, cw, ch)

      const mx = mouse.current.x
      const my = mouse.current.y
      const cx = cw / 2 + mx * 10
      const cy = ch / 2 + my * 8
      const baseR = Math.min(cw, ch) * 0.2

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.5)
      glow.addColorStop(0, 'rgba(251,146,60,0.05)')
      glow.addColorStop(0.4, 'rgba(34,211,238,0.025)')
      glow.addColorStop(1, 'rgba(251,146,60,0)')
      ctx.fillStyle = glow
      ctx.beginPath(); ctx.arc(cx, cy, baseR * 1.5, 0, TAU); ctx.fill()

      floaters.forEach((p) => {
        p.x += p.vx + mx * 0.02
        p.y += p.vy + my * 0.02
        if (Math.abs(p.x) > 50) p.vx *= -0.5
        if (Math.abs(p.y) > 50) p.vy *= -0.5
        ctx.beginPath(); ctx.arc(cx + p.x, cy + p.y, p.r, 0, TAU)
        ctx.fillStyle = `${p.color}${0.12 + Math.sin(time.current * 0.5 + p.x) * 0.06}`
        ctx.fill()
      })

      const rings = [
        { rx: baseR * 1.1, ry: baseR * 0.4, angle: PI * 0.15 + mx * 0.12, phase: 0, color: 'rgba(251,146,60,0.3)', lw: 1 },
        { rx: baseR * 0.85, ry: baseR * 0.3, angle: PI * 0.55 + mx * 0.08, phase: 1.5, color: 'rgba(34,211,238,0.25)', lw: 0.9 },
        { rx: baseR * 0.65, ry: baseR * 0.22, angle: PI * 0.85 + my * 0.1, phase: 3.0, color: 'rgba(251,146,60,0.18)', lw: 0.8 },
        { rx: baseR * 0.4, ry: baseR * 0.14, angle: PI * 0.3 + mx * 0.15, phase: 4.5, color: 'rgba(34,211,238,0.2)', lw: 0.7 },
      ]

      rings.forEach((r) => {
        const pts = drawRing(cx, cy, r.rx, r.ry, r.angle, r.phase, r.color, r.lw)
        drawParticles(pts, r.color.replace('0.3', '0.5').replace('0.25', '0.45').replace('0.18', '0.35').replace('0.2', '0.4'))
      })

      ctx.globalAlpha = 0.3 + Math.sin(time.current * 0.3) * 0.1
      stars.forEach((s) => {
        const tw = 0.5 + 0.5 * Math.sin(time.current * s.s + s.p)
        ctx.beginPath(); ctx.arc(cw * s.x / 100, ch * s.y / 100, s.r * tw * 0.8, 0, TAU)
        ctx.fillStyle = `rgba(255,255,255,${0.03 * tw})`
        ctx.fill()
      })
      ctx.globalAlpha = 1

      time.current += 0.02
      id = requestAnimationFrame(render)
    }
    id = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', size)
      window.removeEventListener('mousemove', mousemove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.45 }} />
}

export default HeroOrb
