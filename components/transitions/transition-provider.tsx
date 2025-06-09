"use client"

import { motion } from "framer-motion"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

interface TransitionProviderProps {
  children: React.ReactNode
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="relative h-16 w-16">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary/40"
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </div>
        </motion.div>
      )}
      {children}
    </>
  )
} 

export function SuspenseTransitionProvider({ children }: TransitionProviderProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransitionProvider>{children}</TransitionProvider>
    </Suspense>
  )
}