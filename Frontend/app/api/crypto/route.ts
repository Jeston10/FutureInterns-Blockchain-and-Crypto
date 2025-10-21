import { NextRequest, NextResponse } from 'next/server'
import { getCryptoPrices, getCryptoDetails } from '@/lib/api/coingecko'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'prices'

    if (type === 'details') {
      const details = await getCryptoDetails()
      return NextResponse.json(details)
    } else {
      const prices = await getCryptoPrices()
      return NextResponse.json(prices)
    }
  } catch (error) {
    console.error('Crypto API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crypto data' },
      { status: 500 }
    )
  }
}
