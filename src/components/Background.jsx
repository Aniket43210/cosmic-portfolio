import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uScroll;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.08 + uScroll * 0.003;
    float mouseInfluence = length(p - uMouse * 0.2);
    float mouseDist = 1.0 - smoothstep(0.0, 1.2, mouseInfluence);

    float n1 = noise(p * 3.0 + t);
    float n2 = noise(p * 5.0 - t * 0.7);
    float n3 = noise(p * 8.0 + t * 1.3);
    float pattern = (n1 * 0.6 + n2 * 0.3 + n3 * 0.1);

    float sweep1 = sin(p.y * 4.0 + t * 0.3 + uScroll * 0.002) * 0.5 + 0.5;
    float sweep2 = cos(p.x * 3.0 - t * 0.2 + uScroll * 0.001) * 0.5 + 0.5;
    float lightSweep = (sweep1 * sweep2) * 0.04;

    vec2 pocket1 = vec2(0.3 + uScroll * 0.0003, -0.2 + uScroll * 0.0002);
    vec2 pocket2 = vec2(-0.4 + uScroll * 0.0002, 0.3 + uScroll * 0.0003);
    float gp1 = 0.03 / (length(p - pocket1) + 0.3);
    float gp2 = 0.02 / (length(p - pocket2) + 0.4);
    float glowPocket = gp1 + gp2;

    float fog = smoothstep(0.0, 1.5, length(p));

    vec3 c1 = vec3(0.02, 0.01, 0.04);
    vec3 c2 = vec3(0.06, 0.03, 0.10);
    vec3 amber = vec3(0.97, 0.57, 0.24);
    vec3 teal = vec3(0.13, 0.83, 0.87);

    float scrollMix = sin(uScroll * 0.002) * 0.1 + 0.5;
    vec3 col = mix(c1, c2, pattern);
    col += lightSweep * vec3(0.97, 0.57, 0.24);
    col += amber * glowPocket * 0.5;
    col += teal * glowPocket * 0.3;
    col += amber * (0.04 / (mouseInfluence + 0.4)) * (0.5 + 0.5 * sin(t)) * 0.6;
    col += teal * (0.04 / (mouseInfluence + 0.4)) * (0.5 + 0.5 * cos(t * 0.7 + 1.0)) * 0.3;
    col += vec3(0.15, 0.05, 0.25) * pattern * 0.1;

    col *= 1.0 - fog * 0.2;

    float vignette = 1.0 - length(p) * 0.35;
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`

function Background({ scrollRef }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: 'low-power' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x05050a)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uScroll: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    })
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))

    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })

    let id
    const animate = (time) => {
      material.uniforms.uTime.value = time / 1000
      const m = mouseRef.current
      const s = smoothRef.current
      s.x += (m.x - s.x) * 0.03
      s.y += (m.y - s.y) * 0.03
      material.uniforms.uMouse.value.set(s.x, s.y)
      material.uniforms.uScroll.value = scrollRef?.current || 0
      renderer.render(scene, camera)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouse); renderer.dispose() }
  }, [scrollRef])

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1 }} />
}

export default Background
