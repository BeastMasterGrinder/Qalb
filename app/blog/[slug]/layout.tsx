import { Metadata } from 'next';
import getBlogData from "@/lib/blog/getBlogData";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogData(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Post Not Found | Qalb",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Qalb`,
    description: blog.excerpt || blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      url: `${defaultUrl}/blog/${params.slug}`,
      siteName: "Qalb",
      locale: "en_US",
      type: "article",
      authors: blog.author ? [blog.author] : ["Qalb Team"],
      publishedTime: blog.created_at,
      modifiedTime: blog.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      creator: "@QalbApp",
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}