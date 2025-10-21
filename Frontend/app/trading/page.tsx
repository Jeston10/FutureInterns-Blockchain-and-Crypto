"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CryptoTicker } from '@/components/crypto-ticker'
import { WelcomeUserCard } from '@/components/welcome-user-card'
import { CashBalanceCard } from '@/components/cash-balance-card'
import { useCryptoPrices } from '@/hooks/use-crypto-prices'
import { formatPrice, formatPercentageChange, getCryptoSymbol, SUPPORTED_CRYPTOS } from '@/lib/api/coingecko'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

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
}

export default function TradingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { prices, loading: pricesLoading } = useCryptoPrices()
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [trading, setTrading] = useState(false)
  
  // Trading form state
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin')
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [usdAmount, setUsdAmount] = useState('')

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
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentPrice = (cryptoId: string) => {
    return prices?.[cryptoId]?.usd || 0
  }

  const getPriceChange = (cryptoId: string) => {
    return prices?.[cryptoId]?.usd_24h_change || 0
  }

  const handleAmountChange = (value: string) => {
    setAmount(value)
    const price = getCurrentPrice(selectedCrypto)
    if (price > 0) {
      setUsdAmount((parseFloat(value) * price).toFixed(2))
    }
  }

  const handleUsdAmountChange = (value: string) => {
    setUsdAmount(value)
    const price = getCurrentPrice(selectedCrypto)
    if (price > 0) {
      setAmount((parseFloat(value) / price).toFixed(6))
    }
  }

  const executeTrade = async () => {
    if (!amount || !selectedCrypto) {
      toast.error('Please fill in all fields')
      return
    }

    const price = getCurrentPrice(selectedCrypto)
    if (price <= 0) {
      toast.error('Unable to get current price')
      return
    }

    setTrading(true)

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: tradeType,
          symbol: getCryptoSymbol(selectedCrypto as keyof typeof SUPPORTED_CRYPTOS),
          amount: parseFloat(amount),
          price: price,
        }),
      })

      if (response.ok) {
        toast.success(`${tradeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${getCryptoSymbol(selectedCrypto as keyof typeof SUPPORTED_CRYPTOS)}`)
        setAmount('')
        setUsdAmount('')
        fetchPortfolio() // Refresh portfolio
      } else {
        const error = await response.json()
        toast.error(error.error || 'Trade failed')
      }
    } catch (error) {
      toast.error('An error occurred while executing the trade')
    } finally {
      setTrading(false)
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
          <p className="text-muted-foreground">Loading trading interface...</p>
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

  const currentPrice = getCurrentPrice(selectedCrypto)
  const priceChange = getPriceChange(selectedCrypto)
  const isPositive = priceChange >= 0

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Trading</h1>
          <p className="text-muted-foreground">Buy and sell cryptocurrencies</p>
        </div>

        {/* Welcome User Card */}
        <div className="mb-8">
          <WelcomeUserCard />
        </div>

        {/* Cash Balance Card */}
        <div className="mb-8">
          <CashBalanceCard cashBalance={portfolio.cashBalance} />
        </div>

        {/* Live Crypto Ticker */}
        <div className="py-4 bg-muted/20 border-b border-border rounded-lg mb-8">
          <CryptoTicker />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Trade Cryptocurrency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}>
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger 
                      value="buy" 
                      className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=inactive]:text-green-400 data-[state=inactive]:hover:text-green-300"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Buy</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sell" 
                      className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=inactive]:text-red-400 data-[state=inactive]:hover:text-red-300"
                    >
                      <TrendingDown className="w-4 h-4" />
                      <span>Sell</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="buy" className="space-y-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-400">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="font-medium">Buy Order</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Purchase cryptocurrency with your cash balance
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="sell" className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-400">
                        <ArrowDownRight className="w-4 h-4" />
                        <span className="font-medium">Sell Order</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sell your cryptocurrency holdings for cash
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Crypto Selection */}
                <div className="space-y-2">
                  <Label className="text-foreground">Select Cryptocurrency</Label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="bg-muted/50 border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      {Object.entries(SUPPORTED_CRYPTOS).map(([id, crypto]) => (
                        <SelectItem key={id} value={id} className="text-foreground hover:bg-accent">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{crypto.symbol}</span>
                            <span className="text-muted-foreground">{crypto.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Price Display */}
                {currentPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">Current Price</p>
                        <p className="text-xl font-bold text-foreground">{formatPrice(currentPrice)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">24h Change</p>
                        <div className={`flex items-center space-x-1 ${
                          isPositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">
                            {formatPercentageChange(priceChange)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Amount Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">
                      Amount ({getCryptoSymbol(selectedCrypto as keyof typeof SUPPORTED_CRYPTOS)})
                    </Label>
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      placeholder="0.000000"
                      className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">USD Value</Label>
                    <Input
                      type="number"
                      value={usdAmount}
                      onChange={(e) => handleUsdAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Trade Summary */}
                {amount && currentPrice > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/30 rounded-lg border border-border"
                  >
                    <h4 className="font-medium text-foreground mb-2">Trade Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Action:</span>
                        <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                          tradeType === 'buy' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {tradeType === 'buy' ? '🟢 BUY' : '🔴 SELL'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="text-foreground">{amount} {getCryptoSymbol(selectedCrypto as keyof typeof SUPPORTED_CRYPTOS)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="text-foreground">{formatPrice(currentPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="text-foreground font-medium">{formatPrice(parseFloat(usdAmount))}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Execute Trade Button */}
                <Button
                  onClick={executeTrade}
                  disabled={trading || !amount || currentPrice <= 0}
                  className={`w-full py-4 text-lg font-bold transition-all duration-200 ${
                    tradeType === 'buy'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/25 hover:shadow-green-500/40'
                      : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40'
                  } text-white border-0`}
                >
                    {trading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Executing {tradeType === 'buy' ? 'Buy' : 'Sell'} Order...
                      </>
                    ) : (
                      <>
                        {tradeType === 'buy' ? (
                          <>
                            <TrendingUp className="w-5 h-5 mr-2" />
                            <span className="bg-white/20 px-2 py-1 rounded-full text-xs mr-2">BUY</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-5 h-5 mr-2" />
                            <span className="bg-white/20 px-2 py-1 rounded-full text-xs mr-2">SELL</span>
                          </>
                        )}
                        {tradeType === 'buy' ? 'Purchase' : 'Sell'} {getCryptoSymbol(selectedCrypto as keyof typeof SUPPORTED_CRYPTOS)}
                      </>
                    )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portfolio Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Portfolio Value */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Total Value</p>
                  <p className="text-3xl font-bold text-foreground">{formatPrice(portfolio.totalValue)}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cash Balance</span>
                    <span className="text-foreground font-medium">{formatPrice(portfolio.cashBalance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Crypto Holdings</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(portfolio.totalValue - portfolio.cashBalance)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Holdings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Your Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.holdings.length > 0 ? (
                  <div className="space-y-3">
                    {portfolio.holdings.map((holding) => (
                      <div key={holding.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold text-foreground">{holding.symbol}</p>
                          <p className="text-sm text-muted-foreground">{holding.amount.toFixed(6)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {formatPrice(holding.amount * holding.averagePrice)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Avg: {formatPrice(holding.averagePrice)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No holdings yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Start trading to build your portfolio</p>
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
