import { Suspense } from 'react';
import DonateForm from '@/app/donate/DonateForm';

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