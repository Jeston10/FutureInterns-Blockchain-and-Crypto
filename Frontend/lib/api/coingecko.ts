// CoinGecko API service for crypto prices
// Free tier: 10-50 calls per minute, no API key required

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  last_updated: string
}

export interface CryptoPriceData {
  [key: string]: {
    usd: number
    usd_24h_change: number
  }
}

// Supported cryptocurrencies for our portfolio tracker
export const SUPPORTED_CRYPTOS = {
  bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
  ethereum: { symbol: 'ETH', name: 'Ethereum' },
  tether: { symbol: 'USDT', name: 'Tether' },
  'usd-coin': { symbol: 'USDC', name: 'USD Coin' },
  monero: { symbol: 'XMR', name: 'Monero' },
  solana: { symbol: 'SOL', name: 'Solana' },
} as const

export type SupportedCryptoId = keyof typeof SUPPORTED_CRYPTOS

// Cache for API responses to avoid rate limiting
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60000 // 60 seconds (increased for better performance)

async function fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
  const cached = cache.get(cacheKey)
  const now = Date.now()

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Cache the response
    cache.set(cacheKey, { data, timestamp: now })
    
    return data
  } catch (error) {
    console.error('CoinGecko API error:', error)
    throw error
  }
}

// Get current prices for all supported cryptocurrencies
export async function getCryptoPrices(): Promise<CryptoPriceData> {
  const ids = Object.keys(SUPPORTED_CRYPTOS).join(',')
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  
  return fetchWithCache<CryptoPriceData>(url, 'crypto-prices')
}

// Get detailed information for all supported cryptocurrencies
export async function getCryptoDetails(): Promise<CryptoPrice[]> {
  const ids = Object.keys(SUPPORTED_CRYPTOS).join(',')
  const url = `https://api.coingecko.com/api/v3/coins/markets?ids=${ids}&vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
  
  return fetchWithCache<CryptoPrice[]>(url, 'crypto-details')
}

// Get price for a specific cryptocurrency
export async function getCryptoPrice(cryptoId: SupportedCryptoId): Promise<number> {
  const prices = await getCryptoPrices()
  return prices[cryptoId]?.usd || 0
}

// Get 24h price change for a specific cryptocurrency
export async function getCryptoPriceChange(cryptoId: SupportedCryptoId): Promise<number> {
  const prices = await getCryptoPrices()
  return prices[cryptoId]?.usd_24h_change || 0
}

// Format price for display
export function formatPrice(price: number): string {
  if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price)
  }
}

// Format percentage change
export function formatPercentageChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

// Get crypto symbol by ID
export function getCryptoSymbol(cryptoId: SupportedCryptoId): string {
  return SUPPORTED_CRYPTOS[cryptoId].symbol
}

// Get crypto name by ID
export function getCryptoName(cryptoId: SupportedCryptoId): string {
  return SUPPORTED_CRYPTOS[cryptoId].name
}

// Validate if crypto ID is supported
export function isSupportedCrypto(cryptoId: string): cryptoId is SupportedCryptoId {
  return cryptoId in SUPPORTED_CRYPTOS
}
