import { Suspense } from "react"
import { SearchInput } from "@/components/journal/search-input"
import { TagFilter } from "@/components/journal/tag-filter"
import { JournalResults } from "@/components/journal/journal-results"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function JournalPage({ searchParams }: PageProps) {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <SearchInput />
          <TagFilter/>
        </div>

        {/* Journal Results */}
        <Suspense fallback={<div>Loading journals...</div>}>
          <JournalResults searchParams={await searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

