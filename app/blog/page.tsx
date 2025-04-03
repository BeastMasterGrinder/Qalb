import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { format } from "date-fns";
import { Suspense } from "react";
import * as motion from "motion/react-client";

// Define blog type
interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  created_at: string;
  author?: string;
}

// Loading component for the blogs
function BlogsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div 
          key={item} 
          className="border rounded-lg p-4 animate-pulse"
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2.5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2.5 w-5/6"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Animation variants for blog cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17 
    }
  },
  tap: { 
    scale: 0.98 
  }
};


function AnimatedBlogCard({ blog }: { blog: Blog }) {
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

// Server component for the list of blogs
async function BlogList() {
  const supabase = await createClient();
  
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return <div className="text-red-500">Failed to load blogs</div>;
  }
  
  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">No blogs published yet</h3>
        <p className="text-muted-foreground mb-6">
          Check back soon for new content or subscribe to receive updates.
        </p>
      </div>
    );
  }
  
  return (
    <BlogGrid blogs={blogs} />
  );
}


function BlogGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {blogs.map((blog: Blog) => (
        <AnimatedBlogCard key={blog.id} blog={blog} />
      ))}
    </motion.div>
  );
}


function AnimatedHeader() {
  return (
    <div className="mb-8">
      <motion.h1 
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog
      </motion.h1>
      <motion.p 
        className="text-xl text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Explore our latest articles, updates, and insights
      </motion.p>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeader />
        
        <Suspense fallback={<BlogsLoading />}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}