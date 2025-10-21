"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export function Hero() {
  const { data: session } = useSession()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  }

  const morphingVariants = {
    initial: { scale: 1, borderRadius: "50%" },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      borderRadius: ["50%", "25%", "50%", "50%"],
      transition: {
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <section ref={ref} className="relative space-section overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: yParallax, opacity: opacityParallax, scale: scaleParallax }}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/10 to-[#00a3cc]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0066cc]/20 blur-3xl"
          variants={morphingVariants}
          initial="initial"
          animate="animate"
        />

        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#00a3cc]/15 blur-2xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1 }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#00d4aa]/15 blur-2xl"
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
        />
      </motion.div>

      <div className="container-responsive relative">
        <motion.div
          ref={ref}
          className="text-center max-w-5xl mx-auto"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-display text-fluid-5xl text-foreground mb-8 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The Future of{" "}
            </motion.span>
            <motion.span
              className="text-white inline-block"
              initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
              }}
            >
              JustCrypto
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-body text-fluid-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>
              Track your cryptocurrency portfolio, execute mock trades, and monitor real-time prices for BTC, ETH, USDT, USDC, XMR, and SOL.
            </motion.span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-fluid justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {session ? (
              <>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    z: 10,
                    rotateX: "10deg",
                    rotateY: "10deg",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#0066cc] to-[#004499] hover:from-[#004499] hover:to-[#0066cc] text-white px-10 py-4 text-fluid-base font-semibold"
                      data-cursor="pointer"
                      data-cursor-text="View Dashboard"
                    >
                      <motion.span className="relative z-10" whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                        View Dashboard
                      </motion.span>
                      <motion.div whileHover={{ x: 5, rotate: 45 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    z: 10,
                    rotateX: "-10deg",
                    rotateY: "-10deg",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href="/trading">
                    <Button
                      size="lg"
                      variant="outline"
                      className="glass border-2 border-border text-foreground hover:bg-accent hover:border-border/50 bg-transparent px-10 py-4 text-fluid-base font-semibold"
                      data-cursor="pointer"
                      data-cursor-text="Start Trading"
                    >
                      Start Trading
                    </Button>
                  </Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    z: 10,
                    rotateX: "10deg",
                    rotateY: "10deg",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href="/auth/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#0066cc] to-[#004499] hover:from-[#004499] hover:to-[#0066cc] text-white px-10 py-4 text-fluid-base font-semibold"
                      data-cursor="pointer"
                      data-cursor-text="Get Started"
                    >
                      <motion.span className="relative z-10" whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                        Get Started
                      </motion.span>
                      <motion.div whileHover={{ x: 5, rotate: 45 }} transition={{ duration: 0.2 }}>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.05,
                    z: 10,
                    rotateX: "-10deg",
                    rotateY: "-10deg",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href="/auth/signin">
                    <Button
                      size="lg"
                      variant="outline"
                      className="glass border-2 border-border text-foreground hover:bg-accent hover:border-border/50 bg-transparent px-10 py-4 text-fluid-base font-semibold"
                      data-cursor="pointer"
                      data-cursor-text="Sign In"
                    >
                      Sign In
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              {
                icon: Shield,
                color: "#0066cc",
                title: "Bank-Grade Security",
                desc: "Multi-signature wallets and advanced encryption protect your assets",
              },
              {
                icon: Zap,
                color: "#00a3cc",
                title: "Lightning Fast",
                desc: "Execute transactions in seconds with minimal gas fees",
              },
              {
                icon: Globe,
                color: "#00d4aa",
                title: "Global Access",
                desc: "Access your portfolio anywhere, anytime, from any device",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer space-fluid-y"
                initial={{ opacity: 0, y: 30, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  z: 20,
                  rotateX: "5deg",
                  rotateY: index % 2 === 0 ? "5deg" : "-5deg",
                }}
                style={{ transformStyle: "preserve-3d" }}
                data-cursor="pointer"
              >
                <motion.div
                  className="relative w-20 h-20 rounded-xl flex items-center justify-center mb-6 glass-card"
                  style={{ backgroundColor: `${feature.color}20` }}
                  whileHover={{
                    backgroundColor: `${feature.color}30`,
                    boxShadow: `0 20px 40px ${feature.color}40`,
                    rotateY: 360,
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-10 h-10" style={{ color: feature.color }} />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100"
                    style={{ borderColor: feature.color }}
                    initial={{ scale: 0.8, rotate: 0 }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 180,
                      transition: { duration: 0.8 },
                    }}
                  />
                </motion.div>

                <motion.h3 className="text-heading text-fluid-lg text-foreground mb-3" whileHover={{ scale: 1.05 }}>
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="text-body text-fluid-base text-muted-foreground leading-relaxed max-w-xs"
                  whileHover={{ color: "var(--foreground)" }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
