"use client"

import { Hero } from "@/components/hero"
import { CryptoTicker } from "@/components/crypto-ticker"
import { CryptoPriceCards } from "@/components/crypto-price-cards"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { WelcomeUserCard } from "@/components/welcome-user-card"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

export default function Home() {
  const { data: session } = useSession()

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <main>
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>
        
        {/* Welcome User Card for authenticated users */}
        {session && (
          <motion.div variants={sectionVariants} className="container mx-auto px-4 py-8">
            <WelcomeUserCard />
          </motion.div>
        )}
        
        {/* Live Crypto Prices Ticker */}
        <motion.section 
          variants={sectionVariants}
          className="py-8 bg-muted/20 border-y border-border"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Live Crypto Prices</h2>
              <p className="text-muted-foreground">Real-time prices updated every 30 seconds</p>
            </motion.div>
            <CryptoTicker />
          </div>
        </motion.section>

        {/* Crypto Price Cards */}
        <motion.section 
          variants={sectionVariants}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Track Your Favorite Cryptocurrencies
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Monitor real-time prices, market cap, and 24h changes for BTC, ETH, USDT, USDC, XMR, and SOL
              </p>
            </motion.div>
            <CryptoPriceCards />
          </div>
        </motion.section>

        <motion.div variants={sectionVariants}>
          <Features />
        </motion.div>
      </main>
      <motion.div variants={sectionVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  )
}
