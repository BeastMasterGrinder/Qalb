'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DonateSuccessPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 py-16 max-w-4xl"
        >
            <Card className="p-8 text-center">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Thank You!</h1>
                    <p className="text-muted-foreground mb-6">
                        Your donation has been successfully processed. We truly appreciate your support!
                    </p>
                </div>
                <Link href="/">
                    <Button>Return to Home</Button>
                </Link>
            </Card>
        </motion.div>
    );
} 