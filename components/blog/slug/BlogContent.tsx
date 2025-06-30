"use client";

import { staggerContainer, fadeInUp } from "@/app/(bread-cumbs)/blog/[slug]/variants";
import { Blog } from "@/types/blogs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import MarkDownToHTML from "./MarkDownToHTML";


export default function BlogContent({ blog }: { blog: Blog }) {
  return (
    <motion.article 
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          className="mb-6"
        >
          <Link 
            href="/blog"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all blogs
          </Link>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          variants={fadeInUp}
          layoutId={`blog-${blog.id}`}
        >
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <span>{format(new Date(blog.created_at), 'MMMM d, yyyy')}</span>
            {blog.author && (
              <>
                <span className="mx-2">•</span>
                <span>{blog.author}</span>
              </>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none"
          variants={fadeInUp}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* This is where the MDX content would be rendered */}
          {/* For now, we'll just display the raw content */}
          <div className="text-lg markdown">
            <MarkDownToHTML markdown={blog.content} />
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}