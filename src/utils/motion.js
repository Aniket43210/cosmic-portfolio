import anime from 'animejs'

export const EASING = {
  spring: 'easeOutElastic(1, 0.5)',
  springSoft: 'easeOutElastic(0.8, 0.6)',
  springBounce: 'easeOutElastic(1.2, 0.4)',
  springHeavy: 'easeOutElastic(0.6, 0.7)',
  smooth: 'easeOutCubic',
  smoothIn: 'easeInCubic',
  smoothInOut: 'easeInOutCubic',
  expo: 'easeOutExpo',
  expoIn: 'easeInExpo',
  expoInOut: 'easeInOutExpo',
  quad: 'easeOutQuad',
  sine: 'easeInOutSine',
  cinematic: 'cubicBezier(0.22, 1, 0.36, 1)',
}

export const DURATION = {
  fast: 300,
  normal: 500,
  slow: 800,
  xslow: 1200,
}

export function charStagger(target, delay = 0) {
  const chars = target.querySelectorAll('.char')
  return anime({
    targets: chars,
    opacity: [0, 1],
    translateY: [40, 0],
    rotateX: [30, 0],
    duration: 600,
    delay: anime.stagger(30, { start: delay }),
    easing: EASING.expo,
  })
}

export function wordStagger(target, delay = 0) {
  const words = target.querySelectorAll('.word')
  return anime({
    targets: words,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 400,
    delay: anime.stagger(50, { start: delay }),
    easing: EASING.expo,
  })
}

export function fadeUp(target, delay = 0, distance = 30) {
  return anime({
    targets: target,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration: DURATION.slow,
    delay,
    easing: EASING.expo,
  })
}

export function scaleIn(target, delay = 0) {
  return anime({
    targets: target,
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: DURATION.slow,
    delay,
    easing: EASING.springSoft,
  })
}

export function idleFloat(target) {
  return anime({
    targets: target,
    translateY: [0, -(5 + Math.random() * 10)],
    duration: 2000 + Math.random() * 1500,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function idlePulse(target) {
  return anime({
    targets: target,
    opacity: [0.4, 0.8],
    scale: [1, 1.03],
    duration: 1500 + Math.random() * 1000,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function idleDrift(target) {
  return anime({
    targets: target,
    translateX: [0, 5 + Math.random() * 10],
    translateY: [0, -(3 + Math.random() * 7)],
    rotate: [0, -(2 + Math.random() * 3)],
    duration: 3000 + Math.random() * 2000,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function staggerChildren(target, delay = 0, distance = 20) {
  const children = target.children
  return anime({
    targets: children,
    opacity: [0, 1],
    translateY: [distance, 0],
    duration: 500,
    delay: anime.stagger(60, { start: delay }),
    easing: EASING.expo,
  })
}

export function magneticTween(target, x, y, strength = 0.3) {
  return anime({
    targets: target,
    translateX: x * strength,
    translateY: y * strength,
    duration: 400,
    easing: EASING.smooth,
  })
}

export function magneticReset(target) {
  return anime({
    targets: target,
    translateX: 0,
    translateY: 0,
    duration: 800,
    easing: EASING.springSoft,
  })
}

export function revealLines(target) {
  const lines = target.querySelectorAll('.reveal-line')
  return anime({
    targets: lines,
    scaleX: [0, 1],
    opacity: [0, 1],
    duration: 600,
    delay: anime.stagger(150),
    easing: EASING.smooth,
  })
}

export function morphPath(target, d1, d2) {
  return anime({
    targets: target,
    d: [
      { value: d1, duration: 2000 },
      { value: d2, duration: 2000 },
    ],
    easing: EASING.sine,
    loop: true,
    direction: 'alternate',
  })
}

export function staggerGrid(targets) {
  return anime({
    targets,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 400,
    delay: anime.stagger(30, { grid: [5, 5], from: 'center' }),
    easing: EASING.spring,
  })
}

export function staggerSlide(targets, dir = 'left', dist = 60) {
  const x = dir === 'left' ? -dist : dir === 'right' ? dist : 0
  const y = dir === 'up' ? -dist : dir === 'down' ? dist : 0
  return anime({
    targets,
    opacity: [0, 1],
    translateX: [x, 0],
    translateY: [y, 0],
    duration: 700,
    delay: anime.stagger(90),
    easing: EASING.expo,
  })
}

export function staggerRotateIn(targets, angle = 15) {
  return anime({
    targets,
    opacity: [0, 1],
    rotate: [angle, 0],
    scale: [0.85, 1],
    duration: 600,
    delay: anime.stagger(60),
    easing: EASING.springSoft,
  })
}

export function staggerFlip(targets) {
  return anime({
    targets,
    opacity: [0, 1],
    rotateX: [90, 0],
    translateY: [20, 0],
    duration: 500,
    delay: anime.stagger(50),
    easing: EASING.expo,
  })
}

export function staggerBounceUp(targets) {
  return anime({
    targets,
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1],
    duration: 600,
    delay: anime.stagger(70, { from: 'center' }),
    easing: EASING.spring,
  })
}

export function slideFromCorner(target, corner = 'tl', dist = 80) {
  const x = corner.includes('l') ? -dist : dist
  const y = corner.includes('t') ? -dist : dist
  return anime({
    targets: target,
    opacity: [0, 1],
    translateX: [x, 0],
    translateY: [y, 0],
    rotate: [corner === 'tl' || corner === 'br' ? -8 : 8, 0],
    duration: 900,
    easing: EASING.expo,
  })
}

export function idleShift(target) {
  return anime({
    targets: target,
    translateX: [{ value: 0, duration: 0 }, { value: anime.random(-6, 6), duration: 2000 + Math.random() * 1500 }],
    translateY: [{ value: 0, duration: 0 }, { value: anime.random(-4, 4), duration: 2000 + Math.random() * 1500 }],
    loop: true,
    direction: 'alternate',
    easing: EASING.sine,
  })
}

export function idleGlow(target, color = 'rgba(251,146,60,0.15)') {
  return anime({
    targets: target,
    boxShadow: [`0 0 0px ${color}, 0 0 0px transparent`, `0 0 20px ${color}, 0 0 40px transparent`],
    duration: 2500 + Math.random() * 1500,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function idleBob(target) {
  const dur = 1500 + Math.random() * 1000
  return anime({
    targets: target,
    translateY: [0, -(3 + Math.random() * 5)],
    scale: [1, 1.01 + Math.random() * 0.01],
    duration: dur,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function fadeReveal(target, duration = 1200, delay = 0) {
  return anime({
    targets: target,
    opacity: [0, 1],
    duration,
    delay,
    easing: EASING.smooth,
  })
}

export function spiralIn(target, delay = 0) {
  return anime({
    targets: target,
    opacity: [0, 1],
    rotate: [60, 0],
    scale: [0.5, 1],
    translateX: [30, 0],
    duration: 800,
    delay,
    easing: EASING.expo,
  })
}

export function cascadeReveal(target, dir = 'left') {
  const items = target.children
  const x = dir === 'left' ? -40 : 40
  return anime({
    targets: items,
    opacity: [0, 1],
    translateX: [x, 0],
    rotate: [dir === 'left' ? -5 : 5, 0],
    duration: 600,
    delay: anime.stagger(60, { from: 'first' }),
    easing: EASING.expo,
  })
}

export function sectionMorphIn(target, type = 'clip') {
  if (type === 'clip') {
    target.style.clipPath = 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)'
    return anime({
      targets: target,
      clipPath: ['polygon(50% 0, 50% 0, 50% 100%, 50% 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
      duration: 1500,
      easing: EASING.smoothInOut,
    })
  }
  if (type === 'wipe') {
    target.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0 100%)'
    return anime({
      targets: target,
      clipPath: ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
      duration: 1400,
      easing: EASING.expo,
    })
  }
  return fadeUp(target)
}

export function rotateFloat(target) {
  return anime({
    targets: target,
    rotate: [0, anime.random(-3, 3)],
    translateY: [0, -(4 + Math.random() * 6)],
    duration: 2500 + Math.random() * 1500,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function swingIdle(target) {
  const dist = 2 + Math.random() * 4
  return anime({
    targets: target,
    translateX: [0, dist, -dist, 0],
    duration: 3000 + Math.random() * 2000,
    loop: true,
    easing: EASING.sine,
  })
}

export function glowPulse(target, color = 'rgba(251,146,60,0.2)') {
  return anime({
    targets: target,
    boxShadow: [`inset 0 0 0px ${color}`, `inset 0 0 20px ${color}`],
    duration: 2000 + Math.random() * 1000,
    direction: 'alternate',
    loop: true,
    easing: EASING.sine,
  })
}

export function skewReveal(target, delay = 0) {
  return anime({
    targets: target,
    opacity: [0, 1],
    skewX: [8, 0],
    translateY: [20, 0],
    duration: 700,
    delay,
    easing: EASING.expo,
  })
}

export function circleFill(canvas, pct, color = '#fb923c', delay = 0) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  const cx = w / 2
  const cy = h / 2
  const r = Math.min(cx, cy) - 4
  const start = -Math.PI / 2
  const end = start + (pct / 100) * Math.PI * 2
  let current = 0
  let id
  let frame = 0
  const totalFrames = 40
  const anim = { value: 0 }
  return anime({
    targets: anim,
    value: [0, pct],
    duration: 1000,
    delay,
    easing: EASING.expo,
    update: () => {
      ctx.clearRect(0, 0, w, h)
      const p = anim.value / 100
      const a = start + p * Math.PI * 2
      ctx.beginPath()
      ctx.arc(cx, cy, r, start, a)
      ctx.strokeStyle = color
      ctx.lineWidth = 2.5
      ctx.lineCap = 'round'
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    },
  })
}

export function typewriter(target, text, delay = 0) {
  target.textContent = ''
  let i = 0
  return anime({
    targets: {},
    duration: text.length * 40,
    delay,
    easing: 'linear',
    update: () => {
      i = Math.min(i + 1, text.length)
      target.textContent = text.slice(0, i)
    },
  })
}

export function blurReveal(target, delay = 0) {
  target.style.filter = 'blur(20px)'
  target.style.opacity = '0'
  return anime({
    targets: target,
    filter: ['blur(20px)', 'blur(0px)'],
    opacity: [0, 1],
    duration: 1200,
    delay,
    easing: EASING.cinematic,
  })
}
