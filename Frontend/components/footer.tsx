"use client"

import { Github, Twitter, Diamond as Discord, Globe } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const socialIconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: 5,
    color: "#ffffff",
    transition: { duration: 0.3, type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.9 },
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

const linkVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  hover: {
    x: 5,
    color: "#ffffff",
    transition: { duration: 0.2 },
  },
}

export function Footer() {
  const socialIcons = [
    { Icon: Twitter, href: "#", hoverColor: "#1DA1F2" },
    { Icon: Discord, href: "#", hoverColor: "#5865F2" },
    { Icon: Github, href: "#", hoverColor: "#ffffff" },
    { Icon: Globe, href: "#", hoverColor: "#0066cc" },
  ]

  return (
    <motion.footer
      className="bg-background border-t border-border"
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] rounded-lg flex items-center justify-center"
                variants={logoVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 20px rgba(0, 102, 204, 0.5)",
                }}
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
                className="text-xl font-bold text-foreground"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                BlockChain Platform
              </motion.span>
            </div>
            <motion.p
              className="text-muted-foreground mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              The most secure and user-friendly platform for managing your digital assets and participating in
              decentralized finance.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {socialIcons.map(({ Icon, href, hoverColor }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover={{
                    ...socialIconVariants.hover,
                    color: hoverColor,
                    filter: `drop-shadow(0 0 8px ${hoverColor}40)`,
                  }}
                  whileTap="tap"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-foreground font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Platform
            </motion.h3>
            <ul className="space-y-2">
              {["Dashboard", "Portfolio", "Staking", "Trading"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <motion.a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-foreground font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Resources
            </motion.h3>
            <ul className="space-y-2">
              {["Documentation", "API Reference", "Support", "Security"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <motion.a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-muted-foreground">
            © 2024 BlockChain Platform. All rights reserved. Built with security and transparency in mind.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
