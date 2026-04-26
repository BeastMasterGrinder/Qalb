'use client'

import moment from 'moment';
import { motion } from 'framer-motion';

interface CalendarDay {
    date: string;
    isActive: boolean;
}

interface ActivityCalendarProps {
    journals: string[];
}

export default function ActivityCalendar({ journals }: ActivityCalendarProps) {
    const generateCalendar = () => {
        const calendar: CalendarDay[] = [];
        const today = moment();
        const startDate = moment().subtract(364, 'days');
        const datesSet = new Set(journals);

        while (startDate.isSameOrBefore(today)) {
            calendar.push({
                date: startDate.format('YYYY-MM-DD'),
                isActive: datesSet.has(startDate.format('YYYY-MM-DD'))
            });
            startDate.add(1, 'day');
        }

        return calendar;
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01,
                delayChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { scale: 0, opacity: 0 },
        show: { 
            scale: 1, 
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 20
            }
        }
    };

    const legend = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: {
                delay: 0.5,
                duration: 0.4
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 backdrop-blur-sm rounded-xl border border-primary/20 p-6 transition-all duration-300"
        >
            <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl font-semibold text-primary/90 mb-6"
            >
                Activity Calendar
            </motion.h2>
            
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-10 sm:grid-cols-14 md:grid-cols-28 lg:grid-cols-52 gap-1"
            >
                {generateCalendar().map((day, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ 
                            scale: 1.2,
                            transition: { duration: 0.2 }
                        }}
                        className={`w-3 h-3 rounded-sm ${
                            day.isActive 
                                ? 'bg-primary hover:bg-primary/80' 
                                : 'bg-primary/10 hover:bg-primary/20'
                        }`}
                        title={`${day.date}${day.isActive ? ' - Entry made' : ' - No entry'}`}
                    />
                ))}
            </motion.div>

            <motion.div 
                variants={legend}
                initial="hidden"
                animate="show"
                className="mt-6 flex items-center justify-end gap-2 text-sm text-primary/70"
            >
                <span>Less</span>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-primary/10 rounded-sm"></motion.div>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-primary/30 rounded-sm"></motion.div>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-primary/60 rounded-sm"></motion.div>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-primary rounded-sm"></motion.div>
                <span>More</span>
            </motion.div>
        </motion.div>
    );
} 