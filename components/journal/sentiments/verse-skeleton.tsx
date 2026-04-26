"use client"

import { motion } from "framer-motion"

export function VerseSkeleton() {
  return (
    <div className="py-8 px-5 md:px-[20rem] space-y-6">
      <div className="flex items-center space-x-4">
        <motion.div
          className="h-8 w-48 bg-muted/60 rounded-lg"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 rounded-2xl shadow space-y-4 bg-background">
          {/* Verse text skeleton */}
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              className="h-8 w-full max-w-2xl bg-muted/60 rounded-lg"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: i * 0.2,
              }}
            />
            <motion.div
              className="h-8 w-3/4 bg-muted/60 rounded-lg"
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: i * 0.2 + 0.1,
              }}
            />
          </div>
          
          {/* Translation skeleton */}
          <div className="space-y-2 pt-4">
            <motion.div
              className="h-6 w-24 bg-muted/40 rounded-lg"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: i * 0.2,
              }}
            />
            <motion.div
              className="h-6 w-full bg-muted/40 rounded-lg"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: i * 0.2 + 0.1,
              }}
            />
          </div>
          
          {/* Verse key skeleton */}
          <motion.div
            className="h-4 w-20 bg-muted/30 rounded-lg mt-2"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: i * 0.2 + 0.2,
            }}
          />
        </div>
      ))}
    </div>
  )
} 