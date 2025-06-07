'use client';

import { useEffect } from 'react';
import { pingMicroservice } from '@/lib/utils/ping-service';

export default function ServicePinger() {
    useEffect(() => {
        // Ping when component mounts
        pingMicroservice();

        // Set up an interval to ping every 5 minutes to keep the service warm
        const interval = setInterval(() => {
            pingMicroservice();
        }, 5 * 60 * 1000); // 5 minutes

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    // This component doesn't render anything
    return null;
} 