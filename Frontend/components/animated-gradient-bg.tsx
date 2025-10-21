"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AnimatedGradientBg() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          background: theme === "dark" 
            ? [
                "radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 163, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 212, 170, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(0, 102, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 163, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(0, 212, 170, 0.2) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(0, 102, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(0, 163, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(0, 212, 170, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 163, 204, 0.25) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 212, 170, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
              ]
            : [
                "radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 163, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 212, 170, 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(0, 102, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(0, 163, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(0, 212, 170, 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(0, 102, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(0, 163, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(0, 212, 170, 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(0, 102, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 163, 204, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(0, 212, 170, 0.05) 0%, transparent 50%)",
              ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Animated mesh gradient overlay */}
      <motion.div
        className={`absolute inset-0 ${theme === "dark" ? "opacity-40" : "opacity-30"}`}
        style={{
          background: theme === "dark"
            ? `
                conic-gradient(from 0deg at 50% 50%, 
                  rgba(59, 130, 246, 0.15) 0deg, 
                  rgba(6, 182, 212, 0.15) 120deg, 
                  rgba(16, 185, 129, 0.15) 240deg, 
                  rgba(99, 102, 241, 0.1) 300deg,
                  rgba(59, 130, 246, 0.15) 360deg
                )
              `
            : `
                conic-gradient(from 0deg at 50% 50%, 
                  rgba(59, 130, 246, 0.05) 0deg, 
                  rgba(6, 182, 212, 0.05) 120deg, 
                  rgba(16, 185, 129, 0.05) 240deg, 
                  rgba(59, 130, 246, 0.05) 360deg
                )
              `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className={`absolute top-1/4 left-1/4 w-32 h-32 border rounded-full ${
          theme === "dark" ? "border-blue-500/30" : "border-blue-500/10"
        }`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute bottom-1/3 right-1/3 w-24 h-24 border ${
          theme === "dark" ? "border-teal-500/30" : "border-teal-500/10"
        }`}
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{
          rotate: [0, -360],
          scale: [1, 0.8, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute top-2/3 right-1/4 w-20 h-20 border ${
          theme === "dark" ? "border-green-500/30" : "border-green-500/10"
        }`}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
