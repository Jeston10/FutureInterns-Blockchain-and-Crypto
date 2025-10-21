"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useCryptoPrices } from '@/hooks/use-crypto-prices'
import { formatPrice, formatPercentageChange, getCryptoSymbol, SUPPORTED_CRYPTOS } from '@/lib/api/coingecko'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'

export function CryptoPriceCards() {
  const { details, loading, error } = useCryptoPrices()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="glass-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[#0066cc]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load crypto prices</p>
        <p className="text-muted-foreground text-sm mt-1">{error}</p>
      </div>
    )
  }

  if (!details) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {details.map((crypto, index) => {
        const isPositive = crypto.price_change_percentage_24h >= 0
        
        return (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {getCryptoSymbol(crypto.id as keyof typeof SUPPORTED_CRYPTOS)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {crypto.name}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {getCryptoSymbol(crypto.id as keyof typeof SUPPORTED_CRYPTOS)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(crypto.current_price)}
                    </span>
                    <div className={`flex items-center space-x-1 ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {formatPercentageChange(crypto.price_change_percentage_24h)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>24h Change</span>
                    <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                      {formatPercentageChange(crypto.price_change_percentage_24h)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Market Cap</span>
                    <span>
                      ${(crypto.market_cap / 1e9).toFixed(2)}B
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
