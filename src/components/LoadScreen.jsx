import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import anime from 'animejs'

function LoadScreen() {
  const [show, setShow] = useState(true)
  const logoRef = useRef(null)
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
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#050505' }}
        >
          <div className="flex flex-col items-center">
            <div ref={logoRef} className="w-20 h-20 rounded-sm mb-6" style={{ background: 'linear-gradient(135deg, #F59E0B, #22D3EE)', boxShadow: '0 0 40px rgba(245,158,11,0.15)' }} />
            <p className="text-sm font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {'Portfolio'.split('').map((c, i) => (
                <span key={i} ref={(el) => { charsRef.current[i] = el }} className="inline-block" style={{ opacity: 0 }}>{c}</span>
              ))}
            </p>
            <div ref={lineRef} className="h-px w-24 mt-4 origin-left" style={{ background: 'linear-gradient(90deg, #F59E0B, #22D3EE, transparent)', transform: 'scaleX(0)' }} />
            <p ref={subRef} className="text-[10px] tracking-[0.3em] uppercase mt-3" style={{ color: 'rgba(255,255,255,0.2)', opacity: 0 }}>Crafting digital experiences</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadScreen
