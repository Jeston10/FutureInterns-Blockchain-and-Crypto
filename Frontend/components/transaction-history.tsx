"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Repeat } from "lucide-react"
import { motion } from "framer-motion"

const transactions = [
  {
    id: "1",
    type: "send",
    asset: "ETH",
    amount: "2.5",
    value: "$4,750",
    to: "0x742d...8D4C",
    status: "completed",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "receive",
    asset: "USDC",
    amount: "1,000",
    value: "$1,000",
    from: "0x123a...9B2F",
    status: "completed",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "swap",
    asset: "BTC → ETH",
    amount: "0.1 → 1.8",
    value: "$3,200",
    status: "completed",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "send",
    asset: "LINK",
    amount: "50",
    value: "$625",
    to: "0x456b...7C8E",
    status: "pending",
    timestamp: "2 days ago",
  },
]

const cardVariants = {
  initial: { opacity: 0, scale: 0.95, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const transactionItemVariants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function TransactionHistory() {
  const getIcon = (type: string) => {
    const iconProps = { className: "w-4 h-4" }
    switch (type) {
      case "send":
        return <ArrowUpRight {...iconProps} className="w-4 h-4 text-red-400" />
      case "receive":
        return <ArrowDownLeft {...iconProps} className="w-4 h-4 text-[#10b981]" />
      case "swap":
        return <Repeat {...iconProps} className="w-4 h-4 text-[#00a3cc]" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#10b981]/20 text-[#10b981]"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      whileHover={{
        rotateX: "2deg",
        rotateY: "2deg",
        z: 10,
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
            <CardTitle className="text-white">Recent Transactions</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg bg-[#1a2332] border border-slate-700 hover:border-slate-600 cursor-pointer"
                variants={transactionItemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "#1f2937",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#374151",
                      rotate: tx.type === "swap" ? 180 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getIcon(tx.type)}
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-white font-medium capitalize"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {tx.type} {tx.asset}
                    </motion.div>
                    <div className="text-slate-400 text-sm">
                      {tx.type === "send" && `To: ${tx.to}`}
                      {tx.type === "receive" && `From: ${tx.from}`}
                      {tx.type === "swap" && "DEX Swap"}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <motion.div
                    className="text-white font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    {tx.amount}
                  </motion.div>
                  <div className="text-slate-400 text-sm">{tx.value}</div>
                </div>
                <div className="text-right">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status === "pending" && (
                        <motion.div
                          className="w-2 h-2 bg-yellow-400 rounded-full mr-1"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                      {tx.status}
                    </Badge>
                  </motion.div>
                  <div className="text-slate-400 text-sm mt-1">{tx.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
