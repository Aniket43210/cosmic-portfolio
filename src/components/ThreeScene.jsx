import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const COLORS = ['#fb923c', '#22d3ee', '#d946ef', '#34d399', '#f472b6']

function ThreeScene({ scrollRef }) {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const geo = new THREE.TorusKnotGeometry(0.8, 0.3, 128, 16)
    const mat = new THREE.MeshPhysicalMaterial({
      color: COLORS[0],
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
      emissive: COLORS[0],
      emissiveIntensity: 0.05,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = 0.5
    scene.add(mesh)

    const glowGeo = new THREE.TorusKnotGeometry(0.85, 0.35, 64, 8)
    const glowMat = new THREE.MeshBasicMaterial({
      color: COLORS[0],
      transparent: true,
      opacity: 0.06,
      wireframe: true,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    glowMesh.position.y = 0.5
    scene.add(glowMesh)

    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    let id
    function animate(time) {
      const t = time * 0.001
      const scroll = scrollRef?.current || 0
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const progress = Math.min(scroll / 3000, 1)
      const colorIdx = Math.floor(progress * (COLORS.length - 1))
      const colorMix = (progress * (COLORS.length - 1)) - colorIdx
      const nextIdx = Math.min(colorIdx + 1, COLORS.length - 1)

      const currentColor = new THREE.Color(COLORS[colorIdx])
      const nextColor = new THREE.Color(COLORS[nextIdx])
      const mixedColor = currentColor.clone().lerp(nextColor, colorMix)

      mat.color.copy(mixedColor)
      mat.emissive.copy(mixedColor)
      glowMat.color.copy(mixedColor)

      const rotSpeed = 0.3 + progress * 0.8
      mesh.rotation.x += 0.003 * rotSpeed
      mesh.rotation.y += 0.005 * rotSpeed
      mesh.rotation.z += 0.001 * rotSpeed
      glowMesh.rotation.x = mesh.rotation.x
      glowMesh.rotation.y = mesh.rotation.y
      glowMesh.rotation.z = mesh.rotation.z

      const breathe = 1 + Math.sin(t * 0.5) * 0.04
      mesh.scale.setScalar(breathe)
      glowMesh.scale.setScalar(breathe * 1.05)

      mesh.position.x += (mx * 0.3 - mesh.position.x) * 0.02
      mesh.position.y += (my * 0.2 + 0.5 - mesh.position.y) * 0.02
      glowMesh.position.x = mesh.position.x
      glowMesh.position.y = mesh.position.y

      const scrollOffset = -progress * 1.5
      mesh.position.z = scrollOffset
      glowMesh.position.z = scrollOffset

      mat.emissiveIntensity = 0.03 + progress * 0.08
      mat.opacity = 0.6 + progress * 0.3
      glowMat.opacity = 0.04 + progress * 0.06

      renderer.render(scene, camera)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      geo.dispose(); mat.dispose()
      glowGeo.dispose(); glowMat.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [scrollRef])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.35 }} />
}

export default ThreeScene
