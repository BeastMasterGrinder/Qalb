"use client"

import { useEffect, useState } from "react"
import { getRandomVerse } from "@/lib/actions/getVerse"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle } from "lucide-react"

export default function Verse() {
  const [verse, setVerse] = useState<{ text: string; translation: string; key: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const verseData = await getRandomVerse()
        if (!verseData) {
          throw new Error("Failed to fetch verse")
        }
        setVerse(verseData)
        setError(null)
      } catch (err) {
        setError("Error loading verse")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchVerse()

    // Set up interval to fetch new verse every 2 minutes
    const intervalId = setInterval(fetchVerse, 120000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="animate-pulse"
      >
        <div className="loader"></div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div 
          className="py-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
      >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
          </div>
      </motion.div>
    );
  }

  if (!verse) {
    return null
  }

  return (
    <div className="px-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={verse.key} // Important for triggering re-render on verse change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="space-y-8"
        >
          <motion.div 
            className="text-2xl  md:text-3xl lg:text-4xl quran-text text-center text-verse verse-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut"
            }}
          >
            {verse.text}
          </motion.div>
          
          <motion.div 
            className="text-xl md:text-2xl lg:text-xl leading-loose verse-translation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            {verse.translation}
          </motion.div>
          
          <motion.div 
            className="text-sm md:text-lg text-verse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: "easeOut"
            }}
          >
            {verse.key}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}