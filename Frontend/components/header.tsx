"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings, User, LogOut } from "lucide-react"
import { WalletConnection } from "@/components/wallet-connection"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const headerVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

const logoVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
}

const navLinkVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  hover: {
    scale: 1.05,
    color: "#ffffff",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
}

const mobileMenuVariants = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
}

const mobileNavItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/trading", label: "Trading" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#transactions", label: "Transactions" },
  ]

  return (
    <motion.header
      className="sticky top-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-700/50"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div className="flex items-center space-x-2" variants={itemVariants}>
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] rounded-lg flex items-center justify-center"
              variants={logoVariants}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 0 20px rgba(0, 102, 204, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-sm"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              BlockChain
            </motion.span>
          </motion.div>

          <motion.nav className="hidden md:flex items-center space-x-8" variants={itemVariants}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                custom={index}
              >
                <Link
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors relative"
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0066cc] to-[#00a3cc]"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div className="hidden md:flex items-center space-x-4" variants={itemVariants}>
            {session ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-slate-300 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/auth/signup">
                    <Button size="sm" className="bg-gradient-to-r from-[#0066cc] to-[#004499] hover:from-[#004499] hover:to-[#0066cc] text-white">
                      Sign Up
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>

          <motion.div
            className="md:hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-slate-700/50 overflow-hidden"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={mobileNavItemVariants}
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      backgroundColor: "rgba(15, 23, 42, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-slate-800/50 block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div className="pt-4 border-t border-slate-700/50 space-y-2" variants={mobileNavItemVariants}>
                  {session ? (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                        className="w-full text-slate-300 hover:text-white"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/auth/signin">
                          <Button variant="ghost" size="sm" className="w-full text-slate-300 hover:text-white">
                            Sign In
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Link href="/auth/signup">
                          <Button size="sm" className="w-full bg-gradient-to-r from-[#0066cc] to-[#004499] hover:from-[#004499] hover:to-[#0066cc] text-white">
                            Sign Up
                          </Button>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
