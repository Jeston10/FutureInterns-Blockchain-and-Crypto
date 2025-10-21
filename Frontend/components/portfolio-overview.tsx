"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"

const portfolioData = [
  { name: "Jan", value: 30000 },
  { name: "Feb", value: 32000 },
  { name: "Mar", value: 28000 },
  { name: "Apr", value: 35000 },
  { name: "May", value: 38000 },
  { name: "Jun", value: 45231 },
]

export function PortfolioOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        rotateX: "2deg",
        rotateY: "2deg",
        z: 10,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="bg-[#243447] border-slate-700 hover:border-slate-600 transition-all duration-300 relative overflow-hidden group">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0066cc]/0 via-[#0066cc]/5 to-[#0066cc]/0 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardTitle className="text-white relative">
              Portfolio Performance
              <motion.div
                className="absolute -right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00d4aa] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            className="h-80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a2332",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f8fafc",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0066cc"
                  strokeWidth={3}
                  dot={{ fill: "#0066cc", strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: "#0066cc",
                    strokeWidth: 2,
                    fill: "#0066cc",
                    filter: "drop-shadow(0 0 8px #0066cc)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
