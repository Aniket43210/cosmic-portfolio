import { useEffect, useRef } from 'react'

const BLOBS = [
  { top: '10%', left: '-5%', w: '55%', h: '45%', color: 'rgba(245,158,11,0.4)', delay: 0 },
  { top: '40%', right: '-10%', w: '45%', h: '55%', color: 'rgba(34,211,238,0.3)', delay: -2 },
  { top: '60%', left: '20%', w: '40%', h: '35%', color: 'rgba(236,72,153,0.2)', delay: -4 },
  { top: '80%', right: '5%', w: '35%', h: '40%', color: 'rgba(251,191,36,0.15)', delay: -1 },
]

function AuroraBg() {
  const refs = useRef([])

  useEffect(() => {
    const els = refs.current
    if (!els.length) return
    let id
    const t = performance.now()
    function tick(now) {
      const s = (now - t) * 0.001
      els.forEach((el, i) => {
        if (!el) return
        const d = BLOBS[i].delay
        const x = Math.sin(s * 0.12 + d) * 4 + Math.sin(s * 0.07 + d * 1.3) * 2
        const y = Math.cos(s * 0.1 + d * 0.7) * 3 + Math.cos(s * 0.05 + d) * 2
        el.style.transform = `translate(${x}%, ${y}%) scale(${1 + Math.sin(s * 0.08 + d) * 0.05})`
      })
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="aurora">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el }}
          className="aurora-blob"
          style={{
            top: b.top, left: b.left, right: b.right,
            width: b.w, height: b.h,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            animation: `auroraFloat${(i % 2) + 1} ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default AuroraBg
