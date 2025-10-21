"use client"

import { motion } from 'framer-motion'
import { useCryptoPrices } from '@/hooks/use-crypto-prices'
import { formatPrice, formatPercentageChange, getCryptoSymbol, SUPPORTED_CRYPTOS } from '@/lib/api/coingecko'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'

export function CryptoTicker() {
  const { details, loading, error } = useCryptoPrices()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-[#0066cc]" />
        <span className="ml-2 text-muted-foreground">Loading crypto prices...</span>
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
    <div className="w-full overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: [0, -100 * details.length],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 60,
            ease: "linear",
          },
        }}
      >
        {details.map((crypto, index) => {
          const isPositive = crypto.price_change_percentage_24h >= 0
          
          return (
            <motion.div
              key={crypto.id}
              className="flex items-center space-x-3 whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">
                  {getCryptoSymbol(crypto.id as keyof typeof SUPPORTED_CRYPTOS)}
                </span>
                <span className="text-slate-300 text-sm">
                  {formatPrice(crypto.current_price)}
                </span>
              </div>
              
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">
                  {formatPercentageChange(crypto.price_change_percentage_24h)}
                </span>
              </div>
            </motion.div>
          )
        })}
        
        {/* Duplicate for seamless loop */}
        {details.map((crypto, index) => {
          const isPositive = crypto.price_change_percentage_24h >= 0
          
          return (
            <motion.div
              key={`duplicate-${crypto.id}`}
              className="flex items-center space-x-3 whitespace-nowrap"
            >
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-sm">
                  {getCryptoSymbol(crypto.id as keyof typeof SUPPORTED_CRYPTOS)}
                </span>
                <span className="text-slate-300 text-sm">
                  {formatPrice(crypto.current_price)}
                </span>
              </div>
              
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">
                  {formatPercentageChange(crypto.price_change_percentage_24h)}
                </span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
