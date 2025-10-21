import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { AuthSessionProvider } from "@/components/session-provider"
import { GlobalNavbar } from "@/components/global-navbar"
import { SimpleCursor } from "@/components/simple-cursor"
import { AnimatedGradientBg } from "@/components/animated-gradient-bg"
import { Toaster } from "sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "JustCrypto - Cryptocurrency Portfolio Tracker",
  description: "JustCrypto - A modern cryptocurrency portfolio tracker with mock trading functionality for BTC, ETH, USDT, USDC, XMR, and SOL.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}>
      <body className="font-sans">
        <AuthSessionProvider>
          <AnimatedGradientBg />
          <SimpleCursor />
          <GlobalNavbar />
          <main className="pt-16">
            {children}
          </main>
          <Toaster position="top-right" />
        </AuthSessionProvider>
      </body>
    </html>
  )
}
