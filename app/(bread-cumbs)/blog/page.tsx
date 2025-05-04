import { Suspense } from "react";
import AnimatedHeader from "@/components/blog/AnimateHeader";
import BlogList from "@/components/blog/BlogList";
import { LoadingBlogLists } from "./loading";
export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeader />
        
        <Suspense fallback={<LoadingBlogLists />}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}