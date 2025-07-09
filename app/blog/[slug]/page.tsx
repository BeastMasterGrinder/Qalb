import { notFound } from "next/navigation";
import getBlogData from "@/lib/blog/getBlogData";
import BlogContent from "@/components/blog/slug/BlogContent";
import { Metadata, ResolvingMetadata } from "next";
import { Blog } from "@/types/blogs";

type Params = Promise<{ slug: string }>



export default async function BlogPost(props: {
  params: Params
}) {
  const blog = await getBlogData((await props.params).slug);
  
  if (!blog) {
    notFound();
  }
  
  return <BlogContent blog={blog} />;
}
