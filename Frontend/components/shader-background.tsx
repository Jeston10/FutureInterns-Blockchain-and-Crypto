"use client"

import { useEffect, useRef } from "react"

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

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

    // Shader-like noise function
    const noise = (x: number, y: number, time: number) => {
      const n1 = Math.sin(x * 0.01 + time * 0.001) * Math.cos(y * 0.01 + time * 0.001)
      const n2 = Math.sin(x * 0.02 + time * 0.002) * Math.cos(y * 0.02 + time * 0.002)
      const n3 = Math.sin(x * 0.005 + time * 0.0005) * Math.cos(y * 0.005 + time * 0.0005)
      return (n1 + n2 * 0.5 + n3 * 2) / 3.5
    }

    // Fractal noise
    const fractalNoise = (x: number, y: number, time: number) => {
      let value = 0
      let amplitude = 1
      let frequency = 0.01

      for (let i = 0; i < 4; i++) {
        value += noise(x * frequency, y * frequency, time) * amplitude
        amplitude *= 0.5
        frequency *= 2
      }

      return value
    }

    const animate = () => {
      timeRef.current += 16

      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let x = 0; x < canvas.width; x += 2) {
        for (let y = 0; y < canvas.height; y += 2) {
          const index = (y * canvas.width + x) * 4

          // Generate noise-based colors
          const noiseValue = fractalNoise(x, y, timeRef.current)
          const normalizedNoise = (noiseValue + 1) / 2

          // Create flowing color patterns
          const r = Math.sin(normalizedNoise * Math.PI + timeRef.current * 0.001) * 127 + 128
          const g = Math.sin(normalizedNoise * Math.PI + timeRef.current * 0.0015 + Math.PI / 3) * 127 + 128
          const b = Math.sin(normalizedNoise * Math.PI + timeRef.current * 0.002 + (2 * Math.PI) / 3) * 127 + 128

          // Apply blockchain-themed color palette
          const blueShift = Math.max(0, Math.sin(timeRef.current * 0.001 + x * 0.01))
          const tealShift = Math.max(0, Math.cos(timeRef.current * 0.0015 + y * 0.01))

          data[index] = Math.floor(r * 0.3 + blueShift * 100) // Red
          data[index + 1] = Math.floor(g * 0.4 + tealShift * 150) // Green
          data[index + 2] = Math.floor(b * 0.8 + 100) // Blue
          data[index + 3] = Math.floor(normalizedNoise * 30 + 10) // Alpha

          // Fill adjacent pixels for performance
          if (x + 1 < canvas.width) {
            data[index + 4] = data[index]
            data[index + 5] = data[index + 1]
            data[index + 6] = data[index + 2]
            data[index + 7] = data[index + 3]
          }

          if (y + 1 < canvas.height) {
            const nextRowIndex = ((y + 1) * canvas.width + x) * 4
            data[nextRowIndex] = data[index]
            data[nextRowIndex + 1] = data[index + 1]
            data[nextRowIndex + 2] = data[index + 2]
            data[nextRowIndex + 3] = data[index + 3]

            if (x + 1 < canvas.width) {
              data[nextRowIndex + 4] = data[index]
              data[nextRowIndex + 5] = data[index + 1]
              data[nextRowIndex + 6] = data[index + 2]
              data[nextRowIndex + 7] = data[index + 3]
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Add flowing wave overlay
      ctx.globalCompositeOperation = "screen"
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(59, 130, 246, ${0.1 + Math.sin(timeRef.current * 0.001) * 0.05})`)
      gradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.08 + Math.cos(timeRef.current * 0.0015) * 0.03})`)
      gradient.addColorStop(1, `rgba(16, 185, 129, ${0.06 + Math.sin(timeRef.current * 0.002) * 0.02})`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "source-over"

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.15, mixBlendMode: "screen" }}
    />
  )
}
