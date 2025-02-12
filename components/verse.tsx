"use client"

import { useEffect, useState } from "react"
import { getRandomVerse } from "@/app/actions/getVerse"

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

    // Set up interval to fetch new verse every 20 seconds
    const intervalId = setInterval(fetchVerse, 20000)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return <div className="animate-pulse">Loading verse...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!verse) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-quran-kareem text-right">{verse.text}</div>
      <div className="text-lg">{verse.translation}</div>
      <div className="text-sm text-gray-500">{verse.key}</div>
    </div>
  )
}