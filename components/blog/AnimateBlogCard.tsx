"use client"

import * as motion from "motion/react-client";
import { Blog } from "@/types/blogs";
import { cardVariants } from "./variants";
import Link from "next/link";
import { format } from "date-fns";

export default function AnimatedBlogCard({ blog }: { blog: Blog }) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        layoutId={`blog-${blog.id}`}
      >
        <Link 
          href={`/blog/${blog.slug}`} 
          className="block border rounded-lg p-6 h-full"
        >
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
          <p className="text-muted-foreground mb-3 line-clamp-3">{blog.excerpt || blog.content?.substring(0, 120)}</p>
          <div className="text-sm text-muted-foreground">
            {format(new Date(blog.created_at), 'MMMM d, yyyy')}
          </div>
        </Link>
      </motion.div>
    );
  }