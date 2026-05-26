import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { charStagger } from '../utils/motion'

const highlights = [
  { label: '550k+', desc: 'Monthly active users', color: '#F59E0B' },
  { label: '96.4%', desc: 'ML model accuracy', color: '#22D3EE' },
  { label: '4+', desc: 'Years building', color: '#EC4899' },
  { label: 'Edge', desc: 'Global low-latency infra', color: '#FBBF24' },
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
          anime({ targets: el, opacity: [0, 1], translateY: [15, 0], duration: 700, easing: 'easeOutCubic' })
          o.unobserve(el)
        }
      })
    }, { threshold: 0.3 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <section className="relative py-28 lg:py-40 px-6 md:px-16 lg:px-24" id="about">
      <div className="section-aura">
        <div className="aurora-blob" style={{ top: '15%', left: '-8%', width: '45%', height: '55%', background: 'radial-gradient(circle, rgba(34,211,238,0.06), transparent 70%)', filter: 'blur(90px)' }} />
        <div className="aurora-blob" style={{ bottom: '5%', right: '-5%', width: '25%', height: '35%', background: 'radial-gradient(circle, rgba(236,72,153,0.04), transparent 70%)', filter: 'blur(90px)' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-7">
            <div ref={titleRef} className="mb-8">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-primary leading-[0.85]">
                {'About'.split('').map((c, i) => (
                  <span key={i} className="char inline-block text-gradient-cyan" style={{ opacity: 0 }}>{c}</span>
                ))}
              </h2>
            </div>
            <div ref={textRef} className="space-y-5" style={{ opacity: 0 }}>
              <p className="text-sm text-muted font-light leading-relaxed" style={{ lineHeight: 1.85 }}>
                I build systems that sit at the intersection of AI, full-stack engineering, and large-scale infrastructure. 
                My work spans production ML pipelines with explainable predictions, serverless backends serving half a million 
                monthly users, and full-stack applications with real-time data synchronization.
              </p>
              <p className="text-sm text-muted font-light leading-relaxed" style={{ lineHeight: 1.85 }}>
                I focus on practical engineering — choosing the right tool for each problem, whether that's XGBoost for 
                hierarchical classification, Cloudflare's edge network for global low-latency auth, or vanilla React 
                for a clean frontend.
              </p>
              <p className="text-sm text-muted/50 font-light leading-relaxed" style={{ lineHeight: 1.85 }}>
                Currently exploring WebGPU compute shaders, real-time collaborative features with Cloudflare Durable 
                Objects, and expanding my ML toolkit beyond XGBoost into transformer-based architectures.
              </p>
              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-medium rounded-xl transition-all duration-500 cinematic-ease"
                  style={{ background: 'linear-gradient(135deg, #22D3EE, #0891B2)', color: '#F8FAFC' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 md:pt-16">
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl p-5 text-center"
                  style={{ background: 'rgba(20,20,30,0.4)', border: '1px solid rgba(255,255,255,0.03)' }}
                >
                  <span className="text-lg md:text-2xl font-semibold tracking-tight block" style={{ color: h.color }}>{h.label}</span>
                  <span className="text-[10px] text-muted/50 font-light mt-1.5 block leading-relaxed">{h.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
