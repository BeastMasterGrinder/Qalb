import { JournalCard } from "./journal-card"

interface JournalResultsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function JournalResults({ searchParams }: JournalResultsProps) {
  // Get search query and tags from URL params
  const query = searchParams.q?.toString().toLowerCase() || ""
  const tags = searchParams.tags?.toString().split(",").filter(Boolean) || []

  // Mock data - replace with your actual data fetching logic
  const journals = [
    {
      id: "1",
      content: "الحمد لله على نعمة الإسلام وكفى بها نعمة",
      tags: ["gratitude", "islam"],
      createdAt: "2024-02-18",
      sentiment: "positive",
    },
    // Add more journal entries
  ]

  // Filter journals based on search params
  const filteredJournals = journals.filter((journal) => {
    const matchesSearch = journal.content.toLowerCase().includes(query)
    const matchesTags = tags.length === 0 || tags.some((tag) => journal.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
      {filteredJournals.map((journal) => (
        <JournalCard key={journal.id} journal={journal} />
      ))}
    </div>
  )
}