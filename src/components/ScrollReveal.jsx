import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 40,
  x = 0,
  stagger = 0,
  scrub = false,
  start = 'top 85%',
  end = 'top 20%',
  markers = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = stagger ? el.children : el

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        end,
        toggleActions: 'play none none none',
        markers,
      },
      defaults: { ease: 'power3.out', duration },
    })

    if (stagger > 0) {
      tl.fromTo(
        items,
        { y, x, opacity: 0 },
        { y: 0, x: 0, opacity: 1, stagger, delay }
      )
    } else {
      tl.fromTo(
        el,
        { y, x, opacity: 0 },
        { y: 0, x: 0, opacity: 1, delay }
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el || st.trigger?.contains?.(el)) st.kill()
      })
    }
  }, [delay, duration, y, x, stagger, scrub, start, end])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default ScrollReveal
