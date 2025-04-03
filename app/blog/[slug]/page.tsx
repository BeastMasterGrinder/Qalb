import { notFound } from "next/navigation";
import getBlogData from "@/lib/blog/getBlogData";
import BlogContent from "@/components/blog/slug/BlogContent";


export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = await Promise.resolve(params);
  const blog = await getBlogData(resolvedParams.slug);
  
  if (!blog) {
    notFound();
  }
  
  return <BlogContent blog={blog} />;
}
