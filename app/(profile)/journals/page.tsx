import { Suspense } from "react"
import { SearchInput } from "@/components/journal/search-input"
import { TagFilter } from "@/components/journal/tag-filter"
import { JournalResults } from "@/components/journal/journal-results"
import JournalsLoader from "@/components/loading/journals"
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function JournalPage({ searchParams }: PageProps) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in?next=/journals');
  }

  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <Suspense>
            <SearchInput />
          </Suspense>
          <Suspense>
            <TagFilter/>
          </Suspense>
        </div>

        {/* Journal Results */}
        <Suspense fallback={<JournalsLoader />}>
          <JournalResults searchParams={await searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

