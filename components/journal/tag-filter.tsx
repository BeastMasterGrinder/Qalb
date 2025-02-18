"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"

const AVAILABLE_TAGS = ["gratitude", "islam", "reflection", "prayer", "goals", "family", "today", "yesterday", "last week", "last month", "last year"]

export function TagFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const selectedTags = searchParams.get("tags")?.split(",").filter(Boolean) || []

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams)
    const currentTags = params.get("tags")?.split(",").filter(Boolean) || []
    
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]

    if (newTags.length > 0) {
      params.set("tags", newTags.join(","))
    } else {
      params.delete("tags")
    }

    router.replace(`/journals?${params.toString()}`)
  }


  const handleScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 100
    }
  }

  return (
    <div className="relative flex items-center w-3/4">
      {showLeftArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 z-10 bg-gradient-to-l from-background to-transparent"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft -= 100
            }
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
        onScroll={handleScroll}
      >
        {AVAILABLE_TAGS.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap hover:bg-primary/90"
            onClick={() => handleTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 z-10 bg-gradient-to-r opacity-40 from-background to-transparent"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft += 100
            }
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

