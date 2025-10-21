"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CryptoTicker } from '@/components/crypto-ticker'
import { WelcomeUserCard } from '@/components/welcome-user-card'
import { DollarSign, TrendingUp, TrendingDown, Wallet, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatPrice, formatPercentageChange } from '@/lib/api/coingecko'
import Link from 'next/link'

interface Portfolio {
  id: string
  totalValue: number
  cashBalance: number
  holdings: Array<{
    id: string
    symbol: string
    amount: number
    averagePrice: number
  }>
  trades: Array<{
    id: string
    symbol: string
    type: string
    amount: number
    price: number
    totalValue: number
    timestamp: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session) {
      fetchPortfolio()
    }
  }, [session, status, router])

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/portfolio')
      
      if (response.ok) {
        const data = await response.json()
        setPortfolio(data)
      } else {
        setError('Failed to fetch portfolio')
      }
    } catch (err) {
      setError('An error occurred while fetching portfolio')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-[#0066cc] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={fetchPortfolio} className="bg-[#0066cc] hover:bg-[#004499]">
            Try Again
          </Button>
        </motion.div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">No portfolio found</p>
          <Button onClick={fetchPortfolio} className="bg-[#0066cc] hover:bg-[#004499]">
            Create Portfolio
          </Button>
        </motion.div>
      </div>
    )
  }

  const totalInvested = portfolio.holdings.reduce((sum, holding) => sum + (holding.amount * holding.averagePrice), 0)
  const currentValue = portfolio.totalValue
  const profitLoss = currentValue - 10000 // Starting balance was $10,000
  const profitLossPercentage = (profitLoss / 10000) * 100

  const statsCards = [
    {
      title: "Total Portfolio Value",
      value: formatPrice(currentValue),
      change: `${formatPercentageChange(profitLossPercentage)} from start`,
      icon: DollarSign,
      color: "#00d4aa",
      changeColor: profitLoss >= 0 ? "#10b981" : "#ef4444",
      gradient: profitLoss >= 0 ? "from-emerald-500/20 to-green-500/20" : "from-red-500/20 to-rose-500/20",
    },
    {
      title: "Cash Balance",
      value: formatPrice(portfolio.cashBalance),
      change: "Available for trading",
      icon: Wallet,
      color: "#0066cc",
      changeColor: "#94a3b8",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Total Invested",
      value: formatPrice(totalInvested),
      change: "In crypto assets",
      icon: Activity,
      color: "#00a3cc",
      changeColor: "#94a3b8",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "P&L",
      value: formatPrice(profitLoss),
      change: `${formatPercentageChange(profitLossPercentage)} return`,
      icon: profitLoss >= 0 ? TrendingUp : TrendingDown,
      color: profitLoss >= 0 ? "#00d4aa" : "#ef4444",
      changeColor: profitLoss >= 0 ? "#10b981" : "#ef4444",
      gradient: profitLoss >= 0 ? "from-green-500/20 to-emerald-500/20" : "from-red-500/20 to-rose-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Portfolio Dashboard</h1>
          </div>
          <Link href="/trading">
            <Button className="bg-gradient-to-r from-[#0066cc] to-[#004499] hover:from-[#004499] hover:to-[#0066cc] text-white">
              Start Trading
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Welcome User Card */}
        <div className="mb-8">
          <WelcomeUserCard />
        </div>

        {/* Live Crypto Ticker */}
        <div className="py-4 bg-muted/20 border-b border-border rounded-lg mb-8">
          <CryptoTicker />
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="glass-card hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {stat.title}
                  </CardTitle>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <p
                    className="text-xs font-medium"
                    style={{ color: stat.changeColor }}
                  >
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Holdings and Recent Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Holdings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.holdings.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.holdings.map((holding) => (
                      <div key={holding.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-foreground">{holding.symbol}</p>
                          <p className="text-sm text-muted-foreground">{holding.amount.toFixed(6)} {holding.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{formatPrice(holding.amount * holding.averagePrice)}</p>
                          <p className="text-sm text-muted-foreground">Avg: {formatPrice(holding.averagePrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No holdings yet</p>
                    <Link href="/trading">
                      <Button className="bg-[#0066cc] hover:bg-[#004499]">
                        Start Trading
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Trades */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.trades.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.trades.slice(0, 5).map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {trade.type === 'buy' ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                          )}
                          <div>
                            <p className="font-semibold text-foreground">
                              {trade.type.toUpperCase()} {trade.symbol}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(trade.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{formatPrice(trade.totalValue)}</p>
                          <p className="text-sm text-muted-foreground">{trade.amount.toFixed(6)} @ {formatPrice(trade.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No trades yet</p>
                    <Link href="/trading">
                      <Button className="bg-[#0066cc] hover:bg-[#004499]">
                        Start Trading
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
