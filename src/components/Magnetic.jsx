import { useRef, useCallback } from 'react'
import anime from 'animejs'

function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null)
  const currentTween = useRef(null)

  const handleMouse = useCallback((e) => {
    if (!ref.current) return
    if (currentTween.current) currentTween.current.pause()

    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength

    currentTween.current = anime({
      targets: ref.current,
      translateX: dx,
      translateY: dy,
      easing: 'easeOutCubic',
      duration: 400,
    })
  }, [strength])

  const handleLeave = useCallback(() => {
    if (!ref.current) return
    if (currentTween.current) currentTween.current.pause()

    currentTween.current = anime({
      targets: ref.current,
      translateX: 0,
      translateY: 0,
      easing: 'easeOutElastic(1, 0.4)',
      duration: 1000,
    })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      data-cursor="magnetic"
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

export default Magnetic
