'use client';

import { useEffect, useState } from 'react';
import type { QuranVerse } from '@/lib/actions/SentimentVerses';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { VerseSkeleton } from './verse-skeleton';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type JournalSentimentEntry = {
    sentence: string;
    sentiment: string;
};

export default function SentimentVerses({
    sentiment
}: {
    sentiment: JournalSentimentEntry[] | { error: string; }
}) {
    const [verses, setVerses] = useState<QuranVerse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVerses() {
            try {
                setLoading(true);
                setError(null);
                
                // Extract unique sentiments from journal entries
                if (Array.isArray(sentiment)) {
                    // Get the most common sentiment
                    const sentimentCounts: Record<string, number> = {};
                    sentiment.forEach(entry => {
                        sentimentCounts[entry.sentiment] = (sentimentCounts[entry.sentiment] || 0) + 1;
                    });
                    
                    // Find the most common sentiment
                    let dominantSentiment = '';
                    let maxCount = 0;
                    
                    Object.entries(sentimentCounts).forEach(([key, count]) => {
                        if (count > maxCount) {
                            maxCount = count;
                            dominantSentiment = key;
                        }
                    });
                    
                    if (dominantSentiment) {
                        // Fetch verses from the API endpoint instead of direct database access
                        const response = await fetch(`/api/sentiment-verses?sentiment=${dominantSentiment}&limit=3`);
                        const data = await response.json();
                        
                        if (data.error) {
                            setError(data.error);
                        } else {
                            setVerses(data.verses);
                        }
                    }
                }
            } catch (err) {
                setError('Failed to fetch verses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchVerses();
    }, [sentiment]);

    if ('error' in sentiment) {
        return null; // Don't show anything if there's an error in the sentiment data
    }
    
    if (loading) {
        return <VerseSkeleton />;
    }
    
    if (error) {
        return (
            <motion.div 
                className="py-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
            </motion.div>
        );
    }
    
    if (verses.length === 0) {
        return null;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className="py-8 px-5 md:px-[20rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
            >
                <h2 className="text-xl font-semibold mb-4">Relevant Quranic Verses</h2>
                <Accordion type="single" collapsible className="space-y-6">
                    {verses.map((verse, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <AccordionItem value={index.toString()} className="p-4 rounded-2xl shadow">
                                <AccordionTrigger className="text-xl md:text-2xl lg:text-3xl quran-text justify-center text-verse verse-text">
                                    {verse.verse_uthmani}
                                </AccordionTrigger>
                                <AccordionContent className="text-lg md:text-xl lg:text-xl leading-loose verse-translation">
                                    <span className="text-gray-500">Translation:</span> {verse.verse_text}
                                </AccordionContent>
                                {verse.verse_key && (
                                    <AccordionContent className="text-sm text-gray-500">
                                        Verse: {verse.verse_key}
                                    </AccordionContent>
                                )}
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </motion.div>
        </AnimatePresence>
    );
}