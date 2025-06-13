"use client"

import { useEffect, useState } from "react"
import { getRandomVerse } from "@/lib/actions/getVerse"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ChevronDown, ChevronUp, Maximize2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Maximum character length for verses to prevent UI breakage
let MAX_VERSE_LENGTH = 300
let MAX_TRANSLATION_LENGTH = 500

export default function Verse() {
  const [verse, setVerse] = useState<{ text: string; translation: string; key: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if ( typeof window !== "undefined" && window.innerWidth < 768 ) {
    MAX_VERSE_LENGTH = 50
    MAX_TRANSLATION_LENGTH = 50
  }

  const fetchVerse = async () => {
    try {
      setLoading(true)
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

  useEffect(() => {
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
    )
  }

  if (!verse) {
    return null
  }

  const shouldShowExpandButton = 
    verse.text.length > MAX_VERSE_LENGTH || 
    verse.translation.length > MAX_TRANSLATION_LENGTH

  const truncatedText = verse.text.length > MAX_VERSE_LENGTH 
    ? `${verse.text.substring(0, MAX_VERSE_LENGTH)}...` 
    : verse.text

  const truncatedTranslation = verse.translation.length > MAX_TRANSLATION_LENGTH
    ? `${verse.translation.substring(0, MAX_TRANSLATION_LENGTH)}...`
    : verse.translation

  return (
    <>
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={verse.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div 
                className="text-2xl md:text-3xl lg:text-4xl quran-text text-center text-verse verse-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut"
                }}
              >
                {truncatedText}
              </motion.div>
              
              <motion.div 
                className="text-xl md:text-2xl lg:text-xl leading-loose verse-translation mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut"
                }}
              >
                {truncatedTranslation}
              </motion.div>

              {shouldShowExpandButton && (
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="absolute top-0 right-0 p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="View full verse"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              )}
            </div>
            
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center">{verse.key}</DialogTitle>
          </DialogHeader>
          <div className="space-y-8 py-4">
            <div className="text-2xl md:text-3xl quran-text text-center text-verse verse-text">
              {verse.text}
            </div>
            <div className="text-xl leading-loose verse-translation">
              {verse.translation}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}