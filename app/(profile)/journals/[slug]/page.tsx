/**
 * Colors for sentiments
 * love/joy
 * #C7395F, #DED4E8, #E8BA40
 * anger
 * #EB523F #832C2E
 * sadness
 * #DDDBDE, #CAD4DF #656E77 
 * fear
 * #2C3E50, #34495E, #7F8C8D
 * 
 */

import { getJournal } from '@/lib/actions/journal';
import JournalClientContainer from '@/components/journal/journal-client-container';

const dummyData = [
    {
        sentence: "I went to school today",
        sentiment: "joy",
    },
    {
        sentence: "I had a bad day",
        sentiment: "sadness",
    },
    {
        sentence: "I'm feeling happy today",
        sentiment: "anger",
    },
    {
        sentence: "I was scared of the dark",
        sentiment: "fear",
    },    
]

export default async function JournalPage(
    {
        params,
    }: {
        params: {
            slug: string;
        }
    }
) {
    const { slug } = await params;
    const journalData = await getJournal(slug);
    console.log("journalData", journalData);
    return (
        <JournalClientContainer 
            dummyData={dummyData} 
            slug={slug} 
            journalData={journalData}
        />
    )
}