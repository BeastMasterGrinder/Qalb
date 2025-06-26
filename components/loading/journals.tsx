'use client'

import { motion } from "framer-motion"

const SkeletonCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border rounded-lg p-4 space-y-3"
    >
      {/* Content skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
      </div>
      
      {/* Tags skeleton */}
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
        <div className="h-6 w-16 bg-muted rounded-full animate-pulse"></div>
      </div>
      
      {/* Date skeleton */}
      <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
    </motion.div>
  )
}

export default function JournalsLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max mt-10">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}
