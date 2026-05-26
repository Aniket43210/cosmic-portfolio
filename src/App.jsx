import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import anime from 'animejs'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Particles from './components/Particles'
import Hero from './components/Hero'
import About from './components/About'
import Capabilities from './components/Capabilities'
import Skills from './components/Skills'
import Projects from './components/Projects'
import TechConstellation from './components/TechConstellation'
import Currently from './components/Currently'
import Contact from './components/Contact'
import RippleEffect from './components/RippleEffect'
import LoadScreen from './components/LoadScreen'
import ThreeScene from './components/ThreeScene'
import AuroraBg from './components/AuroraBg'
import CaseStudyModal from './components/CaseStudyModal'
import { projects } from './data/projects'

const sectionColors = {
  about: '#22D3EE',
  work: '#F59E0B',
  capabilities: '#FBBF24',
  skills: '#22D3EE',
  stack: '#D97706',
  now: '#EC4899',
  contact: '#D97706',
}

function Navbar() {
  const logoRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!logoRef.current) return
    anime({
      targets: logoRef.current,
      rotate: [0, 45, 0],
      duration: 2000,
      delay: 1500,
      loop: true,
      easing: 'easeInOutSine',
    })
  }, [])

  const links = ['About', 'Work', 'Capabilities', 'Skills', 'Now', 'Contact']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4" style={{ transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
          <div ref={logoRef} className="w-5 h-5 rounded-sm" style={{ background: 'linear-gradient(135deg, #F59E0B, #22D3EE)' }} />
          <span className="text-sm font-semibold text-primary tracking-tight opacity-60 group-hover:opacity-100 transition-opacity duration-500 cinematic-ease">Portfolio</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const id = l.toLowerCase()
            return (
              <a key={l} href={`#${id}`} data-magnetic className="text-xs tracking-wider uppercase relative group transition-all duration-500 cinematic-ease text-muted/60 hover:text-primary">
                {l}
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-700 w-0 group-hover:w-full" style={{ background: sectionColors[id], transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
              </a>
            )
          })}
        </div>

        <button
          className="md:hidden relative z-50 w-6 h-5 flex flex-col justify-between"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`block h-px w-full bg-muted/60 transition-all duration-500 cinematic-ease ${mobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block h-px w-full bg-muted/60 transition-all duration-500 cinematic-ease ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-full bg-muted/60 transition-all duration-500 cinematic-ease ${mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </button>
      </div>

      <div className={`fixed inset-0 bg-surface/95 backdrop-blur-2xl transition-all duration-700 cinematic-ease md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l) => {
            const id = l.toLowerCase()
            return (
              <a
                key={l}
                href={`#${id}`}
                className="text-lg tracking-wider uppercase text-muted/60 transition-colors duration-500 cinematic-ease"
                style={{ color: mobileOpen ? sectionColors[id] : undefined }}
                onClick={() => setMobileOpen(false)}
              >
                {l}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

function App() {
  const bgRef = useRef(null)
  const [projectPage, setProjectPage] = useState(null)
  const firstLoad = useRef(true)
  const lenisRef = useRef(null)
  const scrollRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const lenisOpts = {
    duration: 1.8,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    wheelMultiplier: 0.9,
    touchMultiplier: 1.8,
    smoothWheel: true,
  }

  function initLenis() {
    if (lenisRef.current) lenisRef.current.destroy()
    const lenis = new Lenis(lenisOpts)
    function raf(t) { lenis.raf(t); scrollRef.current = window.scrollY; requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenisRef.current = lenis
  }

  useEffect(() => {
    initLenis()
    return () => lenisRef.current?.destroy()
  }, [])

  useEffect(() => {
    if (projectPage) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      document.documentElement.style.overflow = ''
    } else {
      initLenis()
      document.documentElement.style.overflow = 'hidden'
    }
  }, [projectPage])

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    const handleClick = (e) => {
      const href = e.currentTarget.getAttribute('href')
      if (!href || href === '#') return
      e.preventDefault()
      lenisRef.current?.scrollTo(href)
    }
    links.forEach(l => l.addEventListener('click', handleClick))
    return () => links.forEach(l => l.removeEventListener('click', handleClick))
  }, [])

  useEffect(() => {
    const ids = Object.keys(sectionColors)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const nav = document.querySelector('nav')
    if (!els.length || !nav) return
    const o = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('id')
            const color = sectionColors[id]
            const link = nav.querySelector(`a[href="#${id}"]`)
            if (link) {
              nav.querySelectorAll('a[href^="#"]').forEach((a) => { a.style.color = '' })
              link.style.color = color
            }
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [])

  useEffect(() => { firstLoad.current = false }, [])

  return (
    <>
      {firstLoad.current && typeof window !== 'undefined' && window.innerWidth >= 768 && <LoadScreen />}
      <AuroraBg />
      <RippleEffect />
      {!isMobile && <Background scrollRef={scrollRef} />}
      {!isMobile && <ThreeScene scrollRef={scrollRef} />}
      {!isMobile && <div className="grain" />}
      <Particles count={isMobile ? 0 : 6} />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects onOpenStudy={(p) => setProjectPage(p)} />
        <Capabilities />
        <Currently />
        <Skills />
        <TechConstellation />
        <Contact />
      </main>
      <AnimatePresence>
        {projectPage && (
          <CaseStudyModal key={projectPage.id} project={projectPage} onClose={() => setProjectPage(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
