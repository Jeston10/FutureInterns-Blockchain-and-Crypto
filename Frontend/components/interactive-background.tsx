"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 50 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid properties
    const gridSize = 50
    const dots: Array<{ x: number; y: number; opacity: number; size: number }> = []

    // Initialize grid dots
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        dots.push({
          x,
          y,
          opacity: Math.random() * 0.3,
          size: Math.random() * 2 + 1,
        })
      }
    }

    let mouseXPos = 0
    let mouseYPos = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseXPos = e.clientX
      mouseYPos = e.clientY
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated grid
      dots.forEach((dot) => {
        const distance = Math.sqrt(Math.pow(dot.x - mouseXPos, 2) + Math.pow(dot.y - mouseYPos, 2))
        const maxDistance = 150
        const influence = Math.max(0, 1 - distance / maxDistance)

        const opacity = dot.opacity + influence * 0.5
        const size = dot.size + influence * 3

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.fill()

        // Draw connections
        dots.forEach((otherDot) => {
          const dotDistance = Math.sqrt(Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2))

          if (dotDistance < gridSize * 1.5 && influence > 0.1) {
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(otherDot.x, otherDot.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${influence * 0.2})`
            ctx.lineWidth = influence * 2
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.4 }} />

      {/* Floating orbs */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-0"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="fixed w-64 h-64 pointer-events-none z-0"
        style={{
          x: useSpring(useMotionValue(0), { stiffness: 30, damping: 30 }),
          y: useSpring(useMotionValue(0), { stiffness: 30, damping: 30 }),
          translateX: "-25%",
          translateY: "-25%",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-teal-500/15 via-cyan-500/8 to-transparent rounded-full blur-2xl" />
      </motion.div>
    </>
  )
}
