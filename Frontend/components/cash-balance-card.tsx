"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet, RefreshCw } from "lucide-react"
import { formatPrice } from "@/lib/api/coingecko"

interface CashBalanceCardProps {
  cashBalance: number
  className?: string
}

export function CashBalanceCard({ cashBalance, className = "" }: CashBalanceCardProps) {
  return (
    <Card className={`glass-card border-border bg-card/50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Left Side - Icon and Label */}
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Cash Balance</h3>
              <p className="text-sm text-muted-foreground">Available for trading</p>
            </div>
          </div>

          {/* Right Side - Balance and Status */}
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground mb-1">
              {formatPrice(cashBalance)}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-400 font-medium">Ready to Trade</span>
            </div>
          </div>
        </div>

        {/* Bottom Section - Quick Stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <Wallet className="w-3 h-3" />
                <span className="text-xs">Account Type</span>
              </div>
              <p className="text-sm font-medium text-foreground">Demo Trading</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">Status</span>
              </div>
              <p className="text-sm font-medium text-green-400">Active</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
