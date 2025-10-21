"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PortfolioOverview } from "@/components/portfolio-overview"
import { TransactionHistory } from "@/components/transaction-history"
import { AssetList } from "@/components/asset-list"
import { TrendingUp, Wallet, Activity, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export function Dashboard() {
  const statsCards = [
    {
      title: "Total Balance",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "#00d4aa",
      changeColor: "#10b981",
      gradient: "from-emerald-500/20 to-green-500/20",
    },
    {
      title: "Active Positions",
      value: "12",
      change: "Across 5 protocols",
      icon: Wallet,
      color: "#0066cc",
      changeColor: "#94a3b8",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "24h Change",
      value: "+$1,234",
      change: "+2.8% increase",
      icon: TrendingUp,
      color: "#00d4aa",
      changeColor: "#10b981",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Transactions",
      value: "847",
      change: "This month",
      icon: Activity,
      color: "#00a3cc",
      changeColor: "#94a3b8",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
  ]

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-responsive relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient-primary mb-4">Your Portfolio Dashboard</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Monitor your assets, track performance, and manage your blockchain investments in real-time
          </p>
        </motion.div>

        <div className="grid-stats mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotateX: "5deg",
                rotateY: "5deg",
                z: 20,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="glass-card hover:shadow-2xl transition-all duration-500 relative overflow-hidden group cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}20` }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      backgroundColor: `${stat.color}30`,
                    }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  >
                    <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                  </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.div
                    className="text-2xl font-bold text-white mb-1"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.p
                    className="text-xs font-medium"
                    style={{ color: stat.changeColor }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stat.change}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="lg:col-span-8 xl:col-span-8"
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioOverview />
          </motion.div>
          <motion.div
            className="lg:col-span-4 xl:col-span-4"
            whileHover={{ scale: 1.01, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <AssetList />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.005, y: -3 }}
        >
          <TransactionHistory />
        </motion.div>
      </div>
    </section>
  )
}
