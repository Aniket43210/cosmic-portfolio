import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION = 5500
const EXIT_MS = 370
const CHAR_COUNT = 9

const charAnims = 'Portfolio'.split('').map((c, i) => ({
  char: c,
  delay: 1600 + i * 40,
  exitDelay: 4900 + i * 20,
}))

function LoadScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="loadscreen"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#050505' }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.15, 0.9, 1.05, 1, 1, 0.85],
                rotate: [0, 180, -25, 10, 0, 0, 0],
                opacity: [0, 1, 1, 1, 1, 1, 0],
              }}
              transition={{
                duration: DURATION / 1000,
                ease: 'easeOut',
                times: [0, 0.07, 0.14, 0.21, 0.28, 0.85, 1],
              }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-sm mb-6"
              style={{
                background: 'linear-gradient(135deg, #fb923c, #22d3ee)',
                boxShadow: '0 0 60px rgba(251,146,60,0.2)',
              }}
            />

            <p className="text-sm font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {charAnims.map(({ char, delay, exitDelay }) => (
                <motion.span
                  key={delay}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -12] }}
                  transition={{
                    duration: (DURATION + 200) / 1000,
                    ease: 'easeOut',
                    times: [0, delay / DURATION, exitDelay / DURATION, (exitDelay + 300) / DURATION],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 2.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-px w-24 mt-4 origin-left"
              style={{ background: 'linear-gradient(90deg, #fb923c, #22d3ee, transparent)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
              transition={{
                delay: 3.2,
                duration: 1.6,
                ease: 'easeOut',
                times: [0, 0.1, 0.7, 1],
              }}
              className="text-[10px] tracking-[0.3em] uppercase mt-3"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Crafting digital experiences
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadScreen
