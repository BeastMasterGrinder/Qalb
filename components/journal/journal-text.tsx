'use client';
import { motion } from "framer-motion";
import styles from './styles.module.css';

export default function JournalText({
    dummyData,
    slug,
    selectedEntry,
    setSelectedEntry
}: {
    dummyData: Array<{
        sentiment: string;
        sentence: string;
    }>,
    slug: string,
    selectedEntry: {
        sentiment: string;
        sentence: string;
    } | null,
    setSelectedEntry: (entry: {
        sentiment: string;
        sentence: string;
    } | null) => void
}) {
    return (
        <motion.div 
            className="p-2 text-lg md:text-3xl leading-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {dummyData.map((item, index) => (
                <span 
                    key={index}
                    onClick={() => setSelectedEntry(item)}
                    className={`relative cursor-pointer p-0 pl-1 rounded ${styles[item.sentiment as keyof typeof styles]}`}
                >
                    {item.sentence}.&nbsp;
                </span>
            ))}
        </motion.div>
    );
}