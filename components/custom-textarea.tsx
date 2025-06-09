"use client"

import type React from "react"
import { useState, type KeyboardEvent, useEffect, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { getSentiments } from "@/lib/actions/getSentiments"
import { ArrowUp } from "lucide-react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { getBrowser } from "@/lib/browser/getbrowser";
import { useRouter } from 'next/navigation'
import { ChatLoader } from "@/components/loading/chat-loader"

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
  const [isLoading, setIsLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)


  const router = useRouter();

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
    if (!message.trim() || isLoading) return
    try {
      setIsLoading(true)
      const sentimentsResponse = await getSentiments(message)

      if (!sentimentsResponse) {
        throw new Error("Failed to send message")
      }

      const response = await fetch("/api/journals", {
        method: "POST",
        body: JSON.stringify({
          sentiments: sentimentsResponse,
          content: message,
          browserInfo: getBrowser()
        })
      })
      
      if (!response.ok) {
        throw new Error("Failed to create journal")
      }

      const data = await response.json();
      
      // Clear the message but keep the textarea expanded while loading
      setMessage("")
      
      // Add a small delay to ensure the loader completes its animation
      setTimeout(() => {
        setIsLoading(false)
        setIsExpanded(false)
        router.push("/journals/" + data.id)
      }, 2000) // 2 second delay to ensure loader animation completes

    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="" ref={containerRef}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed md:w-full inset-0 bg-background/80 z-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div className=" flex justify-center">
        <motion.div
          className={cn(
            "absolute left-auto right-auto ",
            "origin-center z-10",
            "flex justify-center"
          )}
          initial={false}
          animate={{
            width: isExpanded ? "min(90vw, 800px)" : "100%",
            height: isExpanded ? "min(80vh, 600px)" : "20%",
            x: isExpanded ? "-50%" : "0%",
            y: isExpanded ? "-50%" : "0%",
            top: isExpanded ? "50vh" : "auto",
            left: isExpanded ? "50vw" : "0",
            scale: isExpanded ? 1 : 0.90,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
        >
          <div className={`${!isExpanded?"md:w-5/6":"w-full"} w-full bg-background/90 backdrop-blur-sm border rounded-xl`} >
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="grid grid-cols-3 items-center px-4 py-2 absolute top-0 left-0 right-0 z-10 bg-background/50 "
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1
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

            <ChatLoader isVisible={isLoading} onComplete={() => {}} />

            <Textarea
              value={message}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full h-full pr-12 resize-none",
                "focus:ring-0 focus:ring-offset-0 focus:outline-none border-0",
                "bg-transparent transition-all duration-300 ease-in-out",
                isExpanded ? "text-lg md:text-xl " : "text-base",
                isLoading && "opacity-50",
                className,
              )}
            />

            <motion.div
              className="absolute bottom-4 right-4"
              animate={{
                scale: isExpanded ? 1 : 1,
                opacity: message.length > 0 ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              {
                isExpanded ? 
                <Button
                  onClick={handleSubmit}
                  className={cn(
                    "p-2 rounded-full",
                    "bg-primary/80 hover:bg-primary/90",
                    "shadow-md hover:shadow-lg",
                    "transition-all duration-300",
                )}
                size="icon"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>:<></>
              }
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

