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

'use client';

import { useState } from 'react';
import { JournalModal } from '@/components/journal/journal-modal';
import styles from './styles.module.css';

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
    const [selectedEntry, setSelectedEntry] = useState<typeof dummyData[0] | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);
    
    const handleSlide = (newDirection: 1 | -1) => {
        const currentIndex = dummyData.findIndex(entry => entry === selectedEntry);
        const nextIndex = currentIndex + newDirection;
        
        if (nextIndex >= 0 && nextIndex < dummyData.length) {
            setSelectedEntry(dummyData[nextIndex]);
            setDirection(newDirection);
        }
    };

    

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center">
                <h1>Journal</h1>
                <div className="p-2 rounded">
                    {dummyData.map((item, index) => (
                        <div 
                            key={index}
                            onClick={() => setSelectedEntry(item)}
                            className={`relative cursor-pointer ${styles[item.sentiment as keyof typeof styles]}`}
                        >
                            {item.sentence}.&nbsp;
                        </div>
                    ))}
                </div>
            </div>
            <JournalModal 
                isOpen={!!selectedEntry}
                onClose={() => setSelectedEntry(null)}
                sentence={selectedEntry?.sentence || ''}
                sentiment={selectedEntry?.sentiment || ''}
                onNext={() => handleSlide(1)}
                onPrevious={() => handleSlide(-1)}
                direction={direction}
                isFirst={selectedEntry === dummyData[0]}
                isLast={selectedEntry === dummyData[dummyData.length - 1]}
            />
        </>
    )
}