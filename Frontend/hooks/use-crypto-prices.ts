"use client"

import { useState, useEffect, useCallback } from 'react'
import { CryptoPriceData, CryptoPrice } from '@/lib/api/coingecko'

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPriceData | null>(null)
  const [details, setDetails] = useState<CryptoPrice[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async () => {
    try {
      setError(null)
      const [pricesResponse, detailsResponse] = await Promise.all([
        fetch('/api/crypto'),
        fetch('/api/crypto?type=details')
      ])
      
      if (!pricesResponse.ok || !detailsResponse.ok) {
        throw new Error('Failed to fetch crypto data')
      }
      
      const [pricesData, detailsData] = await Promise.all([
        pricesResponse.json(),
        detailsResponse.json()
      ])
      
      setPrices(pricesData)
      setDetails(detailsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices')
      console.error('Error fetching crypto prices:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    
    // Auto-refresh every 60 seconds (reduced frequency for better performance)
    const interval = setInterval(fetchPrices, 60000)
    
    return () => clearInterval(interval)
  }, [fetchPrices])

  return {
    prices,
    details,
    loading,
    error,
    refetch: fetchPrices
  }
}

export function useCryptoPrice(cryptoId: string) {
  const { prices, loading, error } = useCryptoPrices()
  
  return {
    price: prices?.[cryptoId]?.usd || 0,
    change24h: prices?.[cryptoId]?.usd_24h_change || 0,
    loading,
    error
  }
}
