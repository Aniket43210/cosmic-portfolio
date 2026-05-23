import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import anime from 'animejs'

function LoadScreen() {
  const [show, setShow] = useState(true)
  const logoRef = useRef(null)
  const glowRef = useRef(null)
  const ringRef = useRef(null)
  const charsRef = useRef([])
  const lineRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!show) return

    const tl = anime.timeline({})
    tl
      .add({ targets: logoRef.current, scale: [0, 1.3, 0.85, 1.1, 1], rotate: [0, 180, -30, 15, 0], duration: 1600, easing: 'easeOutElastic(1.4, 0.4)' })
      .add({ targets: charsRef.current, opacity: [0, 1], translateY: [24, 0], duration: 500, delay: anime.stagger(40), easing: 'easeOutExpo' }, 1600)
      .add({ targets: lineRef.current, scaleX: [0, 1], duration: 800, easing: 'easeOutCubic' }, 2600)
      .add({ targets: subRef.current, opacity: [0, 1, 0], translateY: [10, 0, -10], duration: 700, easing: 'easeOutCubic' }, 3200)
      .add({ targets: logoRef.current, scale: [1, 0.8], opacity: [1, 0], duration: 500, easing: 'easeInCubic' }, 4800)
      .add({ targets: charsRef.current, opacity: [1, 0], translateY: [0, -12], duration: 400, easing: 'easeInCubic' }, 4900)

    return () => tl.pause()
  }, [show])

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="loadscreen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: '#050505' }}
        >
          <div ref={ringRef} className="absolute w-56 h-56 rounded-full pointer-events-none" style={{ border: '1px solid rgba(251,146,60,0.1)', opacity: 0 }} />
          <div ref={glowRef} className="absolute w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15), transparent)', opacity: 0 }} />

          <div className="flex flex-col items-center relative z-10">
            <div ref={logoRef} className="w-16 h-16 md:w-20 md:h-20 rounded-sm mb-6" style={{ background: 'linear-gradient(135deg, #fb923c, #22d3ee)', boxShadow: '0 0 60px rgba(251,146,60,0.2)', willChange: 'transform, opacity' }} />
            <p className="text-sm font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {'Portfolio'.split('').map((c, i) => (
                <span key={i} ref={(el) => { charsRef.current[i] = el }} className="inline-block" style={{ opacity: 0, willChange: 'transform, opacity' }}>{c}</span>
              ))}
            </p>
            <div ref={lineRef} className="h-px w-24 mt-4 origin-left" style={{ background: 'linear-gradient(90deg, #fb923c, #22d3ee, transparent)', transform: 'scaleX(0)', willChange: 'transform' }} />
            <p ref={subRef} className="text-[10px] tracking-[0.3em] uppercase mt-3" style={{ color: 'rgba(255,255,255,0.25)', opacity: 0, willChange: 'transform, opacity' }}>Crafting digital experiences</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadScreen
