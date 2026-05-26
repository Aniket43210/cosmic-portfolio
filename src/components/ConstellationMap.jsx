import { useEffect, useRef, useState, useCallback } from 'react'

const GROUPS = [
  { label: 'Frontend', color: '#F59E0B',

  { label: 'Backend', color: '#22D3EE',

  { label: 'ML/AI', color: '#EC4899',

  { label: 'DevOps', color: '#FBBF24',
    items: ['Docker', 'Kubernetes', 'Cloudflare', 'Prometheus', 'Git', 'CI/CD'] },
]

function buildNodes(cx, cy) {
  let id = 0
  const nodes = []
  GROUPS.forEach((g, gi) => {
    const spread = gi * 0.5 + 0.5
    g.items.forEach((name, ni) => {
      const angle = (ni / g.items.length) * Math.PI * 2 + gi * 1.2
      const radius = 50 + Math.random() * 60
      nodes.push({
        id: id++, name, group: gi,
        color: g.color,
        x: cx + Math.cos(angle) * radius * spread,
        y: cy + Math.sin(angle) * radius * spread,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 3 + Math.random() * 2,
      })
    })
  })
  return nodes
}

function buildEdges(nodes) {
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].group === nodes[j].group) {
        edges.push({ a: i, b: j })
      }
    }
  }
  return edges
}

function ConstellationMap() {
  const canvasRef = useRef(null)
  const [tooltip, setTooltip] = useState(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const nodesRef = useRef([])
  const edgesRef = useRef([])
  const dimsRef = useRef({ w: 800, h: 600 })
  const rafRef = useRef(null)
  const animRef = useRef(0)
  const readyRef = useRef(false)

  const initNodes = useCallback(() => {
    const { w, h } = dimsRef.current
    nodesRef.current = buildNodes(w / 2, h / 2)
    edgesRef.current = buildEdges(nodesRef.current)
  }, [])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const p = canvas.parentElement
    const w = p.clientWidth
    const h = Math.max(400, Math.min(600, window.innerHeight * 0.55))
    const dpr = Math.min(window.devicePixelRatio, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    dimsRef.current = { w, h, dpr }
    if (!readyRef.current) {
      initNodes()
      readyRef.current = true
    } else {
      // re-center existing nodes on resize
      for (const n of nodesRef.current) {
        n.x = Math.max(20, Math.min(w - 20, n.x))
        n.y = Math.max(20, Math.min(h - 20, n.y))
      }
    }
  }, [initNodes])

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [resize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function tick() {
      const { w, h, dpr } = dimsRef.current
      const nodes = nodesRef.current
      const edges = edgesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const t = animRef.current++ * 0.008

      // Forces
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        let fx = 0, fy = 0

        // center gravity
        fx += (w / 2 - n.x) * 0.002
        fy += (h / 2 - n.y) * 0.002

        // mouse attraction
        const dx = mx - n.x
        const dy = my - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 5) {
          const pull = 0.03 * (1 - dist / 200)
          fx += dx * pull
          fy += dy * pull
        }

        // orbital drift
        fx += Math.sin(t + i * 0.5) * 0.04
        fy += Math.cos(t * 0.7 + i * 0.3) * 0.04

        n.vx += fx * 0.5
        n.vy += fy * 0.5
        n.vx *= 0.94
        n.vy *= 0.94
        n.x += n.vx
        n.y += n.vy

        // boundary
        n.x = Math.max(20, Math.min(w - 20, n.x))
        n.y = Math.max(20, Math.min(h - 20, n.y))
      }

      // Draw
      ctx.clearRect(0, 0, w * dpr, h * dpr)
      ctx.scale(dpr, dpr)

      // Edges
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b]
        const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
        if (dist > 250) continue
        const alpha = Math.max(0, 0.06 * (1 - dist / 250))
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(148,163,184,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Nodes
      for (const n of nodes) {
        const near = mx > 0 && Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2) < 30
        const r = near ? n.radius + 3 : n.radius
        const alpha = near ? 0.9 : 0.4

        // glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4)
        grd.addColorStop(0, n.color.replace(')', `,${0.15 * alpha})`).replace('rgb', 'rgba'))
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        // dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = near ? n.color : `rgba(255,255,255,${0.3 * alpha})`
        ctx.fill()

        // label on hover
        if (near) {
          ctx.font = '11px Inter, sans-serif'
          ctx.fillStyle = '#F8FAFC'
          ctx.textAlign = 'center'
          ctx.fillText(n.name, n.x, n.y - r - 8)
        }
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const handleMouse = useCallback((e) => {
    const r = canvasRef.current.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  const handleLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 }
  }, [])

  const handleClick = useCallback((e) => {
    const r = canvasRef.current.getBoundingClientRect()
    const cx = e.clientX - r.left
    const cy = e.clientY - r.top
    const nodes = nodesRef.current
    for (const n of nodes) {
      if (Math.sqrt((cx - n.x) ** 2 + (cy - n.y) ** 2) < n.radius + 5) {
        setTooltip(n)
        setTimeout(() => setTooltip(null), 3000)
        return
      }
    }
    setTooltip(null)
  }, [])

  return (
    <section className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="stack">
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '30%', left: '20%', width: '50%', height: '60%', background: 'radial-gradient(circle, rgba(217,119,6,0.04), transparent 70%)', filter: 'blur(100px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-primary mb-3" style={{ letterSpacing: '-0.04em' }}>
            Stack
          </h2>
          <p className="text-sm text-muted/60 font-light max-w-md">Move your cursor over the constellation — each node is a tool I work with.</p>
        </div>

        <div
          className="relative w-full rounded-2xl overflow-hidden cursor-crosshair"
          style={{ background: 'rgba(20,20,30,0.3)', border: '1px solid rgba(255,255,255,0.03)', minHeight: 400 }}
          onMouseMove={handleMouse}
          onMouseLeave={handleLeave}
          onClick={handleClick}
        >
          <canvas ref={canvasRef} className="w-full" />

          {/* Legend */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-3 pointer-events-none">
            {GROUPS.map((g) => (
              <span key={g.label} className="flex items-center gap-1.5 text-[10px] text-muted/50 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.color }} />
                {g.label}
              </span>
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg glass" style={{ pointerEvents: 'none' }}>
              <span className="text-xs font-medium" style={{ color: tooltip.color }}>{tooltip.name}</span>
              <span className="text-[10px] text-muted/50 ml-2">{GROUPS[tooltip.group].label}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ConstellationMap
