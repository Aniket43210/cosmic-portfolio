import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import anime from 'animejs'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Particles from './components/Particles'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Skills from './components/Skills'
import Projects from './components/Projects'
import TechConstellation from './components/TechConstellation'
import Currently from './components/Currently'
import Contact from './components/Contact'
import RippleEffect from './components/RippleEffect'
import LoadScreen from './components/LoadScreen'
import ThreeScene from './components/ThreeScene'
import CaseStudyModal from './components/CaseStudyModal'
import { projects } from './data/projects'

function Navbar() {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const [active, setActive] = useState('')

  useEffect(() => {
    let last = 0
    const cb = () => {
      if (!navRef.current) return
      const s = window.scrollY
      navRef.current.style.transform = 'translateY(0)'
      last = s
    }
    window.addEventListener('scroll', cb, { passive: true })
    return () => window.removeEventListener('scroll', cb)
  }, [])

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

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4" style={{ transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div ref={logoRef} className="w-5 h-5 rounded-sm" style={{ background: 'linear-gradient(135deg, #fb923c, #22d3ee)' }} />
          <span className="text-sm font-semibold text-white tracking-tight opacity-70 group-hover:opacity-100 transition-opacity duration-300">Portfolio</span>
        </a>
        <div className="flex items-center gap-8">
          {['Work', 'Capabilities', 'Skills', 'Now', 'Contact'].map((l) => {
            const id = l.toLowerCase()
            return (
              <a key={l} href={`#${id}`} data-magnetic className={`text-xs tracking-wider uppercase relative group transition-colors duration-300 ${active === id ? 'text-ember-400' : 'text-charcoal-500 hover:text-ember-400'}`}>
                {l}
                <span className={`absolute -bottom-1 left-0 h-px bg-ember-400/60 transition-all duration-500 ${active === id ? 'w-full' : 'w-0 group-hover:w-full'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }} />
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      smoothWheel: true,
    })
    function raf(t) { lenis.raf(t); scrollRef.current = window.scrollY; requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    lenisRef.current = lenis
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    if (projectPage) { lenisRef.current?.stop() } else { lenisRef.current?.start() }
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

  useEffect(() => { firstLoad.current = false }, [])

  return (
    <>
      {projectPage ? (
        <AnimatePresence mode="wait">
          <CaseStudyModal key={projectPage.id} project={projectPage} onClose={() => setProjectPage(null)} />
        </AnimatePresence>
      ) : (
        <>
          {firstLoad.current && <LoadScreen />}
          <RippleEffect />
          <Background scrollRef={scrollRef} />
          <ThreeScene scrollRef={scrollRef} />
          <div className="grain" />
          <Particles count={6} />
          <Cursor />
          <Navbar />
          <main>
            <Hero />
            <Projects onOpenStudy={(p) => setProjectPage(p)} />
            <Capabilities />
            <Currently />
            <Skills />
            <TechConstellation />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}

export default App
