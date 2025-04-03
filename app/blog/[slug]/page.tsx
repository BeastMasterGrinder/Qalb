import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import * as motion from "motion/react-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Animated Blog Post Component
export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return <AnimatedBlogContent slug={params.slug} />;
}

async function getBlogData(slug: string) {
  const supabase = await createClient();
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !blog) {
    console.error('Error fetching blog:', error);
    return null;
  }
  
  return blog as Blog;
}

// Client-side animated blog content
async function AnimatedBlogContent({ slug }: { slug: string }) {
  const blog = await getBlogData(slug);
  
  if (!blog) {
    notFound();
  }
  
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
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </motion.div>
      </div>
    </motion.article>
  );
}