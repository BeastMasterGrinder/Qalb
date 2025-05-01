'use client';

import { useEffect, useState } from 'react';
import moment from "moment";
import StatsCard from './StatsCard';
import ActivityCalendar from './ActivityCalendar';

interface StreaksProps {
    journals: string[];
}

export default function Streaks({ journals }: StreaksProps) {
    const [currentStreak, setCurrentStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        calculateStreaks();
    }, [journals]);

    const calculateStreaks = () => {
        let current = 0;
        let longest = 0;
        let currentCount = 0;
        
        // Sort dates in ascending order
        const sortedDates = [...journals].sort();
        setTotalEntries(sortedDates.length);

        for (let i = 0; i < sortedDates.length; i++) {
            const currentDate = moment(sortedDates[i]);
            const previousDate = i > 0 ? moment(sortedDates[i - 1]) : null;

            if (!previousDate || currentDate.diff(previousDate, 'days') === 1) {
                currentCount++;
            } else {
                currentCount = 1;
            }

            if (currentCount > longest) {
                longest = currentCount;
            }

            // Check if the streak continues to today
            if (i === sortedDates.length - 1 && 
                moment().diff(currentDate, 'days') <= 1) {
                current = currentCount;
            }
        }

        setCurrentStreak(current);
        setLongestStreak(longest);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-4">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard 
                    title="Current Streak" 
                    value={currentStreak}
                    unit="days"
                />
                <StatsCard 
                    title="Longest Streak" 
                    value={longestStreak}
                    unit="days"
                />
                <StatsCard 
                    title="Total Entries" 
                    value={totalEntries}
                />
            </div>

            {/* Calendar Section */}
            <ActivityCalendar journals={journals} />
        </div>
    );
}