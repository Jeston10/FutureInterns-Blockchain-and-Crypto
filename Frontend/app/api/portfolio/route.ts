import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get or create portfolio for the user
    let portfolio = await prisma.portfolio.findFirst({
      where: {
        userId: session.user.id
      },
      include: {
        holdings: true,
        trades: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 10
        }
      }
    })

    // If no portfolio exists, create one with $10,000 starting balance
    if (!portfolio) {
      portfolio = await prisma.portfolio.create({
        data: {
          userId: session.user.id,
          totalValue: 10000,
          cashBalance: 10000,
        },
        include: {
          holdings: true,
          trades: true
        }
      })
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Portfolio API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { action, symbol, amount, price } = await request.json()

    if (!action || !symbol || !amount || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user's portfolio
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        userId: session.user.id
      },
      include: {
        holdings: true
      }
    })

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      )
    }

    const totalValue = amount * price

    if (action === 'buy') {
      // Check if user has enough cash
      if (portfolio.cashBalance < totalValue) {
        return NextResponse.json(
          { error: 'Insufficient cash balance' },
          { status: 400 }
        )
      }

      // Update cash balance
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          cashBalance: portfolio.cashBalance - totalValue
        }
      })

      // Update or create holding
      const existingHolding = portfolio.holdings.find(h => h.symbol === symbol)
      
      if (existingHolding) {
        // Update existing holding with weighted average price
        const newTotalAmount = existingHolding.amount + amount
        const newAveragePrice = ((existingHolding.amount * existingHolding.averagePrice) + totalValue) / newTotalAmount
        
        await prisma.holding.update({
          where: { id: existingHolding.id },
          data: {
            amount: newTotalAmount,
            averagePrice: newAveragePrice
          }
        })
      } else {
        // Create new holding
        await prisma.holding.create({
          data: {
            portfolioId: portfolio.id,
            symbol,
            amount,
            averagePrice: price
          }
        })
      }

    } else if (action === 'sell') {
      // Check if user has enough of this crypto
      const holding = portfolio.holdings.find(h => h.symbol === symbol)
      
      if (!holding || holding.amount < amount) {
        return NextResponse.json(
          { error: 'Insufficient crypto balance' },
          { status: 400 }
        )
      }

      // Update cash balance
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          cashBalance: portfolio.cashBalance + totalValue
        }
      })

      // Update holding
      if (holding.amount === amount) {
        // Remove holding completely
        await prisma.holding.delete({
          where: { id: holding.id }
        })
      } else {
        // Update holding amount
        await prisma.holding.update({
          where: { id: holding.id },
          data: {
            amount: holding.amount - amount
          }
        })
      }
    }

    // Create trade record
    await prisma.trade.create({
      data: {
        portfolioId: portfolio.id,
        symbol,
        type: action,
        amount,
        price,
        totalValue
      }
    })

    // Update total portfolio value
    const updatedPortfolio = await prisma.portfolio.findFirst({
      where: { id: portfolio.id },
      include: {
        holdings: true
      }
    })

    if (updatedPortfolio) {
      const holdingsValue = updatedPortfolio.holdings.reduce((sum, holding) => {
        // Note: In a real app, you'd fetch current prices here
        // For now, we'll use the average price
        return sum + (holding.amount * holding.averagePrice)
      }, 0)
      
      const totalPortfolioValue = updatedPortfolio.cashBalance + holdingsValue
      
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          totalValue: totalPortfolioValue
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Portfolio trade error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
