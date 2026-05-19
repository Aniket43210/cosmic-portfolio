let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

export function playHover() {
  try {
    const c = getCtx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(1800, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(1200, c.currentTime + 0.08)
    g.gain.setValueAtTime(0.03, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12)
    o.connect(g).connect(c.destination)
    o.start(c.currentTime)
    o.stop(c.currentTime + 0.12)
  } catch (e) {}
}

export function playClick() {
  try {
    const c = getCtx()
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(1200, c.currentTime)
    o.frequency.exponentialRampToValueAtTime(1800, c.currentTime + 0.06)
    o.frequency.exponentialRampToValueAtTime(800, c.currentTime + 0.15)
    g.gain.setValueAtTime(0.04, c.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2)
    o.connect(g).connect(c.destination)
    o.start(c.currentTime)
    o.stop(c.currentTime + 0.2)
  } catch (e) {}
}
