import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const highlights = [
  { label: '550k+', desc: 'Monthly active users served', color: '#f472b6' },
  { label: '96.4%', desc: 'ML model accuracy', color: '#fb923c' },
  { label: '4+', desc: 'Years building', color: '#22d3ee' },
  { label: 'Edge', desc: 'Global low-latency infra', color: '#34d399' },
]

function About() {
  const titleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { charStagger(el); o.unobserve(el) }
      })
    }, { threshold: 0.5 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const o = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: el, opacity: [0, 1], translateY: [15, 0], duration: 600, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section className="relative py-24 lg:py-36 px-6 md:px-16 lg:px-24" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          <div className="md:col-span-3">
            <div ref={titleRef} className="mb-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                {'About'.split('').map((c, i) => (
                  <span key={i} className="char inline-block text-gradient-ember" style={{ opacity: 0 }}>{c}</span>
                ))}
              </h2>
            </div>
            <div ref={textRef} className="space-y-4" style={{ opacity: 0 }}>
              <p className="text-sm text-charcoal-300 font-light leading-relaxed">
                I build systems that sit at the intersection of AI, full-stack engineering, and large-scale infrastructure. 
                My work spans production ML pipelines with explainable predictions, serverless backends serving half a million 
                monthly users, and full-stack applications with real-time data synchronization.
              </p>
              <p className="text-sm text-charcoal-400 font-light leading-relaxed">
                I focus on practical engineering — choosing the right tool for each problem, whether that's XGBoost for 
                hierarchical classification, Cloudflare's edge network for global low-latency auth, or vanilla React 
                for a clean frontend. Every project ships with monitoring, security, and a clear understanding of 
                trade-offs.
              </p>
              <p className="text-sm text-charcoal-400 font-light leading-relaxed">
                Currently exploring WebGPU compute shaders, real-time collaborative features with Cloudflare Durable 
                Objects, and expanding my ML toolkit beyond XGBoost into transformer-based architectures.
              </p>
              <div className="pt-2">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-300 hover:opacity-90"
                  style={{ background: '#fb923c', color: '#050505' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-lg p-4 text-center"
                style={{ border: `1px solid ${h.color}15`, background: `${h.color}06` }}
              >
                <span className="text-lg md:text-2xl font-bold tracking-tight block" style={{ color: h.color }}>{h.label}</span>
                <span className="text-[10px] text-charcoal-500 font-light mt-1 block leading-relaxed">{h.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
