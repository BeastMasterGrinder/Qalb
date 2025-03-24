'use client';

import { motion } from "framer-motion";

interface JournalContentProps {
    sentence: string;
    sentiment: string;
    direction: 1 | -1;
}

export function JournalContent({ sentence, sentiment, direction }: JournalContentProps) {
    return (
        <motion.div
            key={sentence}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }
            }}
            exit={{ opacity: 0, x: direction * -50 }}
            className="p-6 space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Entry</h4>
                    <p className="text-lg">{sentence}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Sentiment</h4>
                    <p className="text-lg capitalize">{sentiment}</p>
                </div>
            </div>
        </motion.div>
    );
} 