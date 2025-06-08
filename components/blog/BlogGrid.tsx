import * as motion from "motion/react-client";
import { Blog } from "@/types/blogs";
import AnimatedBlogCard from "./AnimateBlogCard";
import { containerVariants } from "./variants";


export default function BlogGrid({ blogs }: { blogs: Blog[] }) {
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