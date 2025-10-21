"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, TrendingUp, Smartphone, BarChart3, Coins } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Shield,
    title: "Multi-Signature Security",
    description:
      "Advanced security protocols with multi-signature wallets and hardware wallet integration for maximum protection.",
    color: "#0066cc",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Lightning Fast Transactions",
    description: "Execute trades and transfers in seconds with optimized gas fees and layer-2 scaling solutions.",
    color: "#00a3cc",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
  {
    icon: TrendingUp,
    title: "DeFi Yield Farming",
    description: "Maximize your returns with automated yield farming strategies across multiple protocols.",
    color: "#00d4aa",
    gradient: "from-teal-500/20 to-green-500/20",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive portfolio tracking with real-time analytics and performance insights.",
    color: "#0066cc",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    icon: Coins,
    title: "Multi-Chain Support",
    description: "Access assets across Ethereum, Polygon, BSC, and other major blockchain networks.",
    color: "#00a3cc",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Full-featured mobile experience with responsive design and native app performance.",
    color: "#00d4aa",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    rotateX: 45,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
}

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 200,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 300,
    },
  },
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        style={{ y: yParallax }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ scale: scaleParallax }}
        >
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            Powerful Features for Modern DeFi
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Everything you need to manage, trade, and grow your digital assets in one secure platform
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                rotateX: "10deg",
                rotateY: index % 2 === 0 ? "10deg" : "-10deg",
                z: 50,
              }}
              style={{ transformStyle: "preserve-3d" }}
              data-cursor="pointer"
            >
              <Card className="glass-card hover:shadow-2xl transition-all duration-500 h-full cursor-pointer relative overflow-hidden group">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100`}
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 0.5 },
                  }}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                <CardHeader className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 glass relative"
                    style={{ backgroundColor: `${feature.color}20` }}
                    variants={iconVariants}
                    whileHover={{
                      backgroundColor: `${feature.color}30`,
                      boxShadow: `0 20px 40px ${feature.color}40`,
                    }}
                  >
                    <motion.div variants={iconVariants}>
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100"
                      style={{ borderColor: feature.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02, x: 5 }} transition={{ duration: 0.2 }}>
                    <CardTitle className="text-foreground group-hover:text-gradient-primary transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                  </motion.div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <motion.p
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
