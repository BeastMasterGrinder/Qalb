import { JournalCard } from "./journal-card"
import { getAllJournals } from "@/lib/actions/journal"
import { formatJournalSentiments } from "@/lib/utils"

interface JournalResultsProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

interface Journal {
  id: string;
  created_at: string;
  user_id: string;
  is_deleted: boolean;
  content: string;
  sentiments: string;
}

export async function JournalResults({ searchParams }: JournalResultsProps) {
  // Get search query and tags from URL params
  const query = searchParams.q?.toString().toLowerCase() || ""
  const tags = searchParams.tags?.toString().split(",").filter(Boolean) || []

  // Get journals data
  const journalsData = await getAllJournals();
  
  // Handle error case
  if ('error' in journalsData) {
    return (
      <div className="text-center text-red-500">
        {journalsData.error}
      </div>
    );
  }

  // Filter journals based on search params
  const filteredJournals = (journalsData as Journal[]).filter((journal) => {
    const matchesSearch = journal.content.toLowerCase().includes(query);
    // Parse sentiments to check for matching tags
    const sentiments = JSON.parse(journal.sentiments);
    const matchesTags = tags.length === 0 || tags.some((tag) => 
      Object.keys(sentiments).includes(tag) && sentiments[tag].length > 0
    );
    return matchesSearch && matchesTags;
  });

  // Format the journal data for display
  const formattedJournals = filteredJournals.map(journal => ({
    id: journal.id,
    content: journal.content,
    createdAt: journal.created_at,
    tags: Object.keys(JSON.parse(journal.sentiments)).filter(
      key => JSON.parse(journal.sentiments)[key].length > 0
    ),
    sentiment: Object.keys(JSON.parse(journal.sentiments)).find(
      key => JSON.parse(journal.sentiments)[key].length > 0
    ) || 'neutral'
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max mt-10">
      {formattedJournals.map((journal) => (
        <JournalCard key={journal.id} journal={journal} />
      ))}
    </div>
  )
}