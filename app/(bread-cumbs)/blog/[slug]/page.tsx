import { notFound } from "next/navigation";
import getBlogData from "@/lib/blog/getBlogData";
import BlogContent from "@/components/blog/slug/BlogContent";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog = await getBlogData( (await params).slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  // Get the parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: blog.title,
    description: blog.excerpt || blog.content.substring(0, 160),
    authors: [{ name: blog.author || 'Qalb Team' }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      type: 'article',
      publishedTime: blog.created_at,
      authors: [blog.author || 'Qalb Team'],
      images: previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
    },
    alternates: {
      canonical: `/blog/${(await params).slug}`,
    },
  }
}

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
