"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Brain, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingState {
  text: string
  icon: React.ReactNode
  color: string
  duration: number
}

interface LoadingAnimationProps {
  isVisible: boolean
  onComplete?: () => void
}

export function ChatLoader({ isVisible, onComplete }: LoadingAnimationProps) {
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const loadingStartTime = useRef<number>(0)
  const loadingInterval = useRef<NodeJS.Timeout | null>(null)
  const typingInterval = useRef<NodeJS.Timeout | null>(null)
  const isCompleting = useRef(false)
  const hasShownStates = useRef<Set<number>>(new Set())

  // Dynamic loading states
  const loadingStates: LoadingState[] = [
    { text: "Reading your Journal", icon: <Eye className="w-5 h-5" />, color: "text-blue-500", duration: 1000 },
    {
      text: "Understanding your Journal",
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-500",
      duration: 1500,
    },
    { text: "Sabr Sheikh", icon: <Brain className="w-5 h-5" />, color: "text-amber-500", duration: 800 },
    { text: "That's very deep", icon: <Heart className="w-5 h-5" />, color: "text-rose-500", duration: 1200 },
    { text: "Analyzing emotions", icon: <Heart className="w-5 h-5" />, color: "text-pink-500", duration: 1000 },
    { text: "Connecting the dots", icon: <Sparkles className="w-5 h-5" />, color: "text-indigo-500", duration: 1100 },
    { text: "Diving deeper", icon: <Brain className="w-5 h-5" />, color: "text-teal-500", duration: 900 },
    { text: "Processing insights", icon: <Sparkles className="w-5 h-5" />, color: "text-emerald-500", duration: 1300 },
    { text: "Curating Result", icon: <Sparkles className="w-5 h-5" />, color: "text-violet-500", duration: 1000 },
    { text: "Almost there", icon: <Sparkles className="w-5 h-5" />, color: "text-cyan-500", duration: 800 },
    { text: "Polishing thoughts", icon: <Brain className="w-5 h-5" />, color: "text-orange-500", duration: 1100 },
    { text: "Gathering wisdom", icon: <Heart className="w-5 h-5" />, color: "text-lime-500", duration: 950 },
  ]

  const finalState: LoadingState = {
    text: "Finalizing",
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-green-500",
    duration: 500,
  }

  // Typewriter effect
  const typeText = (text: string, callback?: () => void) => {
    setDisplayText("")
    setIsTyping(true)
    let index = 0

    if (typingInterval.current) {
      clearInterval(typingInterval.current)
    }

    typingInterval.current = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval.current!)
        if (callback) {
          setTimeout(callback, 300)
        }
      }
    }, 50)
  }

  // Get next state to show
  const getNextState = (): LoadingState => {
    const baseStates = loadingStates.slice(0, 4) // First 4 are always shown in order
    const dynamicStates = loadingStates.slice(4) // Rest are dynamic

    // If we haven't shown all base states yet, show them in order
    if (currentLoadingIndex < baseStates.length) {
      return baseStates[currentLoadingIndex]
    }

    // For dynamic states, pick a random one we haven't shown recently
    const availableStates = dynamicStates.filter((_, index) => !hasShownStates.current.has(index + 4))

    let selectedState: LoadingState
    if (availableStates.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableStates.length)
      selectedState = availableStates[randomIndex]

      // Mark this state as shown
      const originalIndex = dynamicStates.indexOf(selectedState) + 4
      hasShownStates.current.add(originalIndex)
    } else {
      // If we've shown all dynamic states, reset and pick randomly
      hasShownStates.current.clear()
      const randomIndex = Math.floor(Math.random() * dynamicStates.length)
      selectedState = dynamicStates[randomIndex]
      hasShownStates.current.add(randomIndex + 4)
    }

    return selectedState
  }

  // Progress to next loading state
  const progressToNextState = () => {
    if (isCompleting.current || !isVisible) return

    const nextState = getNextState()

    console.log(`Progressing to: ${nextState.text} (index: ${currentLoadingIndex})`)

    typeText(nextState.text, () => {
      if (isVisible && !isCompleting.current) {
        // Random delay between states (1-2.5 seconds)
        const delay = Math.random() * 1500 + 1000
        console.log(`Next state in ${Math.round(delay)}ms`)

        loadingInterval.current = setTimeout(() => {
          setCurrentLoadingIndex((prev) => prev + 1)
        }, delay)
      }
    })
  }

  // Effect to handle state progression
  useEffect(() => {
    if (isVisible && !isCompleting.current && currentLoadingIndex >= 0) {
      progressToNextState()
    }
  }, [currentLoadingIndex, isVisible])

  // Start loading animation
  const startLoading = () => {
    console.log("Starting loading animation")
    setCurrentLoadingIndex(0)
    hasShownStates.current.clear()
    loadingStartTime.current = Date.now()
    isCompleting.current = false
  }

  // End loading animation
  const endLoading = () => {
    console.log("Ending loading animation")
    isCompleting.current = true

    if (loadingInterval.current) {
      clearTimeout(loadingInterval.current)
    }
    if (typingInterval.current) {
      clearInterval(typingInterval.current)
    }

    // Show finalizing state and ensure it's visible
    typeText(finalState.text, () => {
      // Add a small delay to ensure the finalizing state is visible
      setTimeout(() => {
        setDisplayText("")
        setCurrentLoadingIndex(-1)
        hasShownStates.current.clear()
        if (onComplete) {
          onComplete()
        }
      }, 800) // Shorter delay since we already have a delay in the parent component
    })
  }

  // Effect to handle visibility changes
  useEffect(() => {
    if (isVisible) {
      startLoading()
    } else {
      endLoading()
    }

    return () => {
      if (loadingInterval.current) clearTimeout(loadingInterval.current)
      if (typingInterval.current) clearInterval(typingInterval.current)
    }
  }, [isVisible])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingInterval.current) clearTimeout(loadingInterval.current)
      if (typingInterval.current) clearInterval(typingInterval.current)
    }
  }, [])

  // Get current state for styling
  const getCurrentState = () => {
    if (displayText === finalState.text) return finalState

    // Find the state that matches current display text
    const matchingState = loadingStates.find((state) => state.text === displayText)
    if (matchingState) return matchingState

    // Fallback to first state
    return loadingStates[0]
  }

  const currentState = getCurrentState()

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 bg-background/95 backdrop-blur-md z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-6">
            {/* Debug info - remove in production */}
            <div className="text-xs text-muted-foreground">
              Index: {currentLoadingIndex} | States shown: {Array.from(hasShownStates.current).join(", ")}
            </div>

            {/* Floating particles */}
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  animate={{
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Main loading content */}
            <motion.div
              className="flex items-center gap-3"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className={cn("transition-colors duration-500", currentState.color)}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {currentState.icon}
              </motion.div>

              <motion.span
                className={cn("text-xl font-medium transition-colors duration-500", currentState.color)}
                key={displayText}
              >
                {displayText}
                {isTyping && (
                  <motion.span
                    className="inline-block ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  >
                    |
                  </motion.span>
                )}
              </motion.span>
            </motion.div>

            {/* Progress indicator */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Breathing circle */}
            <motion.div
              className="w-16 h-16 border-2 border-purple-300 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                borderColor: ["#d8b4fe", "#a855f7", "#d8b4fe"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
