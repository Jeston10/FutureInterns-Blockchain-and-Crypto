"use client"

import { motion } from "framer-motion"

export function HolographicEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Holographic grid lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Scanning lines effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(6, 182, 212, 0.03) 2px,
            rgba(6, 182, 212, 0.03) 4px
          )`,
        }}
        animate={{
          transform: ["translateY(-100%)", "translateY(100vh)"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Holographic orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(${i % 2 === 0 ? "59, 130, 246" : "6, 182, 212"}, 0.2) 0%, 
              rgba(${i % 2 === 0 ? "59, 130, 246" : "6, 182, 212"}, 0.1) 30%, 
              transparent 70%
            )`,
            filter: "blur(1px)",
            left: `${20 + ((i * 15) % 60)}%`,
            top: `${10 + ((i * 20) % 80)}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Data stream effect */}
      <motion.div
        className="absolute right-0 top-0 w-1 h-full"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(16, 185, 129, 0.8) 20%,
            rgba(16, 185, 129, 0.4) 40%,
            rgba(16, 185, 129, 0.2) 60%,
            transparent 100%
          )`,
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
        }}
        animate={{
          height: ["0%", "100%", "0%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Glitch effect overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(236, 72, 153, 0.1) 50%,
            transparent 100%
          )`,
          transform: "skewX(-15deg)",
        }}
        animate={{
          x: ["-100%", "100vw"],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          repeatDelay: 6,
        }}
      />
    </div>
  )
}
