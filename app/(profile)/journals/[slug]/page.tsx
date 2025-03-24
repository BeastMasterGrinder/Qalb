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

const dummyData = [
    {
        sentence: "I went to school today",
        sentiment: "joy",
        createdAt: "2024-01-01"
    },
    {
        sentence: "I had a bad day",
        sentiment: "sadness",
        createdAt: "2024-01-02"
    },
    {
        sentence: "I'm feeling happy today",
        sentiment: "anger",
        createdAt: "2024-01-03"
    },
    {
        sentence: "I was scared of the dark",
        sentiment: "fear",
        createdAt: "2024-01-04"
    },    
]

export default function JournalPage() {
    // Color for sentiments - harmonized with theme
    const sentimentColors = {
        joy: "selection:bg-amber-200 dark:selection:bg-amber-700 text-foreground", // Warm golden tones
        sadness: "selection:bg-slate-300 dark:selection:bg-slate-700 text-foreground", // Cool muted tones
        fear: "selection:bg-emerald-100 dark:selection:bg-emerald-900 text-foreground", // Subtle earthy greens
        anger: "selection:bg-rose-200 dark:selection:bg-rose-900 text-foreground" // Subtle warm reds
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1>Journal</h1>
            <div>
                {dummyData.map((item) => (
                    <p className={`p-2 rounded ${sentimentColors[item.sentiment as keyof typeof sentimentColors]}`}>
                        {item.sentence}
                    </p>
                ))}
            </div>
        </div>
    )
}