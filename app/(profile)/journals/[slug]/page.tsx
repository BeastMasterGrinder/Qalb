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
import { getRandomVersesBySentiment } from '@/lib/actions/SentimentVerses';
import SentimentVerses  from '@/components/journal/sentiments/Sentiment-Verses'


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

const sizing = "flex flex-col items-center justify-center py-5 md:py-16 px-5 md:px-[20rem]  h-full ";

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
        <div className='border-2 border-red-500'>
            {/* Journal */}
            <JournalClientContainer 
                dummyData={dummyData} 
                slug={slug} 
                journalData={journalData}
                className={sizing}
            />
            {/* Sentiment Quran Verses*/}
            <SentimentVerses 
                sentiment={journalData}
            />
        </div>
    )
}