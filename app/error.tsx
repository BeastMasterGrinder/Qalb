'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12"
    >
      <h1 className="text-6xl font-bold text-primary mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-6">Something went wrong</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        {error.message || "An unexpected error occurred. Please try again later."}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
    </motion.div>
  );
} 