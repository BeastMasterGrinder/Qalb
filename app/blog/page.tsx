import { Suspense } from "react";
import AnimatedHeader from "@/components/blog/AnimateHeader";
import BlogList from "@/components/blog/BlogList";
import { LoadingBlogLists } from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
  openGraph: {
    title: "Blogs | Qalb",
    description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Qalb",
    description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
  },
  alternates: {
    canonical: '/blog',
  },
};

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