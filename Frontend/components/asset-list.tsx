"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

const assets = [
  { symbol: "ETH", name: "Ethereum", balance: "12.5", value: "$23,450", change: "+5.2%", positive: true },
  { symbol: "BTC", name: "Bitcoin", balance: "0.75", value: "$18,750", change: "+2.1%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "2,500", value: "$2,500", change: "0.0%", positive: true },
  { symbol: "LINK", name: "Chainlink", balance: "150", value: "$1,875", change: "-1.3%", positive: false },
]

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const assetItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function AssetList() {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={{
        rotateX: "3deg",
        rotateY: "3deg",
        z: 15,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="bg-[#243447] border-slate-700 hover:border-slate-600 transition-all duration-300">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CardTitle className="text-white">Your Assets</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          {assets.map((asset, index) => (
            <motion.div
              key={asset.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-[#1a2332] border border-slate-700 hover:border-slate-600 cursor-pointer"
              variants={assetItemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "#1f2937",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] rounded-full flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: "0 0 20px rgba(0, 102, 204, 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                </motion.div>
                <div>
                  <motion.div
                    className="text-white font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {asset.symbol}
                  </motion.div>
                  <div className="text-slate-400 text-sm">{asset.balance}</div>
                </div>
              </div>
              <div className="text-right">
                <motion.div
                  className="text-white font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {asset.value}
                </motion.div>
                <motion.div
                  className={`text-sm flex items-center ${asset.positive ? "text-[#10b981]" : "text-red-400"}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={asset.positive ? { y: [-1, 1, -1] } : { y: [1, -1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    {asset.positive ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                  </motion.div>
                  {asset.change}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
