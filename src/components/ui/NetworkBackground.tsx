import { useEffect, useRef, type CSSProperties } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export function NetworkBackground({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let animationFrame: number

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#ff6b00'

    function resize() {
      if (!canvas) return
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = rect?.width ?? window.innerWidth
      height = rect?.height ?? 500
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx?.scale(dpr, dpr)

      // Denser than a typical subtle background — biased toward the edges/corners
      // (via rejection sampling favoring points far from center) so the mesh reads
      // as a rich woven texture at the margins while staying open behind the text.
      const count = Math.min(140, Math.round((width * height) / 9000))
      nodes = Array.from({ length: count }, () => {
        let x = Math.random() * width
        let y = Math.random() * height
        const cx = width / 2
        const cy = height / 2
        const maxR = Math.hypot(cx, cy)
        // resample up to 3 times, preferring points further from center
        for (let attempt = 0; attempt < 3; attempt++) {
          const r = Math.hypot(x - cx, y - cy) / maxR
          if (Math.random() < r + 0.25) break
          x = Math.random() * width
          y = Math.random() * height
        }
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
        }
      })
    }

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > width) node.vx *= -1
          if (node.y < 0 || node.y > height) node.vy *= -1
        }
      }

      const maxDist = 170
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < maxDist) {
            ctx.strokeStyle = accent
            ctx.globalAlpha = (1 - dist / maxDist) * 0.4
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.65
      ctx.fillStyle = accent
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(draw)
      }
    }

    resize()
    draw()

    const observer = new ResizeObserver(resize)
    if (canvas.parentElement) observer.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
}
