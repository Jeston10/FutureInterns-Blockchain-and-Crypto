"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Calendar, TrendingUp, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

interface WelcomeUserCardProps {
  className?: string
}

export function WelcomeUserCard({ className = "" }: WelcomeUserCardProps) {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [greeting, setGreeting] = useState("Good Day")

  useEffect(() => {
    setMounted(true)
    const currentTime = new Date()
    const hour = currentTime.getHours()
    setGreeting(hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening")
  }, [])

  if (!session || !mounted) {
    return null
  }
  
  const userInitials = session.user?.name
    ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : session.user?.email?.[0].toUpperCase() || 'U'

  return (
    <Card className={`glass-card border-border bg-card/50 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0066cc] to-[#00a3cc] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {userInitials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{greeting}</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              {session.user?.name || "Welcome Back"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {session.user?.email}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-slate-400 mb-1">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">Member Since</span>
              </div>
              <p className="text-sm font-medium text-white">
                {new Date().getFullYear()}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-1 text-slate-400 mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">Status</span>
              </div>
              <p className="text-sm font-medium text-green-400">
                Active
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Member Since {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-400">Active</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
