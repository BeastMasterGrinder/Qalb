'use client';

import { useState } from 'react';
import { JournalModal } from '@/components/journal/journal-modal';
import JournalText from '@/components/journal/journal-text';
import { motion } from 'framer-motion';

export default function JournalClientContainer({
    dummyData,
    slug,
    journalData,
    className
}: {
    dummyData: Array<{
        sentiment: string;
        sentence: string;
    }>,
    slug: string,
    journalData: any,
    className: string
}) {
    const [selectedEntry, setSelectedEntry] = useState<typeof dummyData[0] | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);

    // Use real data if available, otherwise fallback to dummy data
    const data = Array.isArray(journalData) && journalData.length > 0 
        ? journalData 
        : (journalData && journalData.error 
            ? dummyData 
            : dummyData);
    
    const handleSlide = (newDirection: 1 | -1) => {
        const currentIndex = data.findIndex((entry: any) => entry === selectedEntry);
        const nextIndex = currentIndex + newDirection;
        
        if (nextIndex >= 0 && nextIndex < data.length) {
            setSelectedEntry(data[nextIndex]);
            setDirection(newDirection);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
                duration: 0.8,
                ease: "easeInOut" as const
            }}
            className={className}
        >
            <div className="flex flex-col gap-4 items-center justify-center">
                <JournalText 
                    dummyData={data} 
                    slug={slug} 
                    selectedEntry={selectedEntry} 
                    setSelectedEntry={setSelectedEntry} 
                />
            </div>
            {data && data.length > 0 && (
                <JournalModal 
                    isOpen={!!selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                    sentence={selectedEntry?.sentence || ''}
                    sentiment={selectedEntry?.sentiment || ''}
                    onNext={() => handleSlide(1)}
                    onPrevious={() => handleSlide(-1)}
                    direction={direction}
                    isFirst={data.length > 0 ? selectedEntry === data[0] : true}
                    isLast={data.length > 0 ? selectedEntry === data[data.length - 1] : true}
                />
            )}
        </motion.div>
    );
} 