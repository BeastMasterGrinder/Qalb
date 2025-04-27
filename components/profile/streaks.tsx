'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import moment from "moment";


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

    const generateCalendar = () => {
        const calendar = [];
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

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Current Streak</h3>
                    <p className="text-3xl font-bold text-pink-600">{currentStreak} days</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Longest Streak</h3>
                    <p className="text-3xl font-bold text-pink-600">{longestStreak} days</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-700">Total Entries</h3>
                    <p className="text-3xl font-bold text-pink-600">{totalEntries}</p>
                </div>
            </div>

            {/* Calendar Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Calendar</h2>
                <div className="grid grid-cols-7 sm:grid-cols-14 md:grid-cols-28 lg:grid-cols-52 gap-1">
                    {generateCalendar().map((day, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-sm ${
                                day.isActive 
                                    ? 'bg-pink-500 hover:bg-pink-600' 
                                    : 'bg-gray-100 hover:bg-gray-200'
                            } transition-colors duration-200`}
                            title={`${day.date}${day.isActive ? ' - Entry made' : ' - No entry'}`}
                        />
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-600">
                    <span>Less</span>
                    <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                    <div className="w-3 h-3 bg-pink-300 rounded-sm"></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-sm"></div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}