"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "glass-card bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 glow-blue hover:shadow-blue-500/30 hover:shadow-2xl",
        destructive:
          "glass-card bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 shadow-lg hover:shadow-red-500/30",
        outline: "glass border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-xl",
        secondary:
          "glass-card bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500",
        ghost: "hover:glass hover:bg-white/5 text-white/80 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const motionButtonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    y: -2,
    transition: { duration: 0.2, type: "spring", stiffness: 400 },
  },
  tap: { scale: 0.95, y: 0 },
}

const shimmerVariants = {
  initial: { x: "-100%" },
  hover: {
    x: "100%",
    transition: { duration: 0.8, ease: "easeInOut" },
  },
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  animated?: boolean
  shimmer?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = true, shimmer = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (!animated) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {shimmer && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          )}
          {children}
        </Comp>
      )
    }

    return (
      <motion.div
        variants={motionButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="inline-block"
      >
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {shimmer && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              variants={shimmerVariants}
              initial="initial"
            />
          )}
          {children}
        </Comp>
      </motion.div>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
