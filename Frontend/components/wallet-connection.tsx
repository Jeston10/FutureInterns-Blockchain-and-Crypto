"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(0, 102, 204, 0.3)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

const connectedButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    borderColor: "#0066cc",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
}

const dropdownVariants = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: { duration: 0.15 },
  },
}

const menuItemVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
  hover: {
    backgroundColor: "#334155",
    x: 5,
    transition: { duration: 0.15 },
  },
}

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress] = useState("0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4")
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsConnected(true)
    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  if (!isConnected) {
    return (
      <motion.div variants={buttonVariants} initial="initial" whileHover="hover" whileTap="tap">
        <Button
          onClick={connectWallet}
          className="bg-[#0066cc] hover:bg-[#004499] text-white relative overflow-hidden"
          disabled={isConnecting}
        >
          <AnimatePresence mode="wait">
            {isConnecting ? (
              <motion.div
                key="connecting"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                Connecting...
              </motion.div>
            ) : (
              <motion.div
                key="connect"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Wallet className="w-4 h-4 mr-2" />
                </motion.div>
                Connect Wallet
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </Button>
      </motion.div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div variants={connectedButtonVariants} initial="initial" whileHover="hover" whileTap="tap">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
            <motion.div
              className="w-2 h-2 bg-[#00d4aa] rounded-full mr-2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            <motion.div animate={{ rotate: 0 }} whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4 ml-2" />
            </motion.div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#243447] border-slate-700">
        <motion.div variants={dropdownVariants} initial="initial" animate="animate" exit="exit">
          <motion.div variants={menuItemVariants} whileHover="hover">
            <DropdownMenuItem onClick={copyAddress} className="text-slate-300 hover:bg-slate-700 cursor-pointer">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Copy className="w-4 h-4 mr-2" />
              </motion.div>
              Copy Address
            </DropdownMenuItem>
          </motion.div>
          <motion.div variants={menuItemVariants} whileHover="hover">
            <DropdownMenuItem className="text-slate-300 hover:bg-slate-700 cursor-pointer">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <ExternalLink className="w-4 h-4 mr-2" />
              </motion.div>
              View on Explorer
            </DropdownMenuItem>
          </motion.div>
          <DropdownMenuSeparator className="bg-slate-700" />
          <motion.div variants={menuItemVariants} whileHover="hover">
            <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 hover:bg-slate-700 cursor-pointer">
              <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.2 }}>
                <LogOut className="w-4 h-4 mr-2" />
              </motion.div>
              Disconnect
            </DropdownMenuItem>
          </motion.div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
