"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { withSearchParams } from "@/components/common/with-search-params"

function SearchInputBase() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")

  useEffect(() => {
    // Keep input in sync with URL
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  const handleSearch = (term: string) => {
    setQuery(term)
    const params = new URLSearchParams(searchParams)
    
    if (term) {
      params.set("q", term)
    } else {
      params.delete("q")
    }

    // Update URL with search params
    router.replace(`/journals?${params.toString()}`)
  }

  return (
    <div className="relative w-full flex justify-center">
      <div className="w-3/4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search your journals..."
          className="pl-10 rounded-full border-[1px] border-gray-300 w-full"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  )
}

export const SearchInput = withSearchParams(SearchInputBase)