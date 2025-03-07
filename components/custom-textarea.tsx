"use client"

import type React from "react"
import { useState, type KeyboardEvent, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getSentiments } from "@/app/actions/getSentiments"
import { ArrowUp } from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

interface CustomExpandingTextareaProps {
  placeholder?: string
  className?: string
}

export function CustomExpandingTextarea({
  placeholder = "Start typing to expand...",
  className,
}: CustomExpandingTextareaProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second when expanded
  useEffect(() => {
    if (!isExpanded) return

    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [isExpanded])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (!isExpanded && e.target.value.length > 0) {
      setIsExpanded(true)
    } else if (isExpanded && e.target.value.length === 0) {
      setIsExpanded(false)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log("sending message")
      // Replace with your API endpoint
      const response = await getSentiments(message)

      console.log(response)
      if (!response) {
        throw new Error("Failed to send message")
      }
      // Save the json to local storage
      localStorage.setItem("sentiments", JSON.stringify(response))

      // Clear the input after successful submission
      setMessage("")
      setIsExpanded(false)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Variants for smoother animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const containerVariants = {
    collapsed: {
      width: "100%",
      height: "5rem",
      scale: 1,
      position: "relative" as const,
      top: "auto",
      left: "auto",
      x: 0,
      y: 0,
    },
    expanded: {
      width: "min(90vw, 800px)",
      height: "min(70vh, 500px)",
      scale: 1,
      position: "fixed" as const,
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-50 overflow-hidden rounded-xl shadow-lg"
        variants={containerVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
      >
        <div className="relative w-full h-full bg-background/80 backdrop-blur-sm rounded-xl">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="grid grid-cols-3 items-center px-4 py-2 absolute top-0 left-0 right-0 z-10 bg-background/50 backdrop-blur-sm"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.1,
                }}
              >
                <div /> {/* Empty div for left alignment */}
                <span className="text-base font-medium justify-self-center">{format(currentTime, "h:mm:ss a")}</span>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-muted-foreground">{format(currentTime, "EEEE, MMMM d, yyyy")}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Textarea
            value={message}
            onChange={handleChange}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full h-full pr-12 resize-none",
              "focus:ring-0 focus:ring-offset-0 focus:outline-none border-0",
              "bg-transparent",
              isExpanded ? "text-lg pt-14" : "text-base pt-2",
              className,
            )}
          />

          <motion.div
            className="absolute bottom-3 right-3"
            animate={{
              scale: isExpanded ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Button
              onClick={handleSubmit}
              className="p-2 rounded-full bg-primary/80 hover:bg-primary/90 shadow-md hover:shadow-lg"
              size="icon"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

