import * as motion from "motion/react-client"
import styles from './styles.module.css';
import { Suspense } from 'react';

const JournalTextContent = ({
    dummyData,
    selectedEntry,
    setSelectedEntry
}: {
    dummyData: Array<{
        sentiment: string;
        sentence: string;
    }>,
    selectedEntry: {
        sentiment: string;
        sentence: string;
    } | null,
    setSelectedEntry: (entry: {
        sentiment: string;
        sentence: string;
    } | null) => void
}) => {
    return (
        <motion.div 
            className="p-2"
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
};

export default function JournalText(props: {
    dummyData: Array<{
        sentiment: string;
        sentence: string;
    }>,
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
        <Suspense fallback={<div className="p-2">Loading...</div>}>
            <JournalTextContent {...props} />
        </Suspense>
    );
}