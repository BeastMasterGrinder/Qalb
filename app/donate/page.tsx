import { Suspense } from 'react';
import DonateForm from '@/app/donate/DonateForm';

export const metadata = {
    title: 'Support Qalb',
    description: 'Support Qalb and help us continue providing a spiritual companion for Quranic learning and Islamic knowledge. Your contribution makes a difference.',
    openGraph: {
        title: 'Support Qalb',
        description: 'Support Qalb and help us continue providing a spiritual companion for Quranic learning and Islamic knowledge. Your contribution makes a difference.',
        type: 'website',
        url: `https://www.qalbjournal.com/donate`,
        siteName: 'Qalb',
        images: [
            {
                url: 'https://www.qalbjournal.com/images/donate-preview.jpg',
                width: 1200,
                height: 630,
                alt: 'Support Qalb - Make a Difference',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Support Qalb',
        description: 'Support Qalb and help us continue providing a spiritual companion for Quranic learning and Islamic knowledge. Your contribution makes a difference.',
        creator: '@QalbApp',
        images: ['https://www.qalbjournal.com/images/donate-preview.jpg'],
    },
};

export default function DonatePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[70vh]">
                <div className="animate-pulse text-2xl text-muted-foreground">Loading...</div>
            </div>
        }>
            <DonateForm />
        </Suspense>
    );
}