'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-12"
    >
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-6">Page Not Found</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200"
      >
        Return Home
      </Link>
    </motion.div>
  );
} 