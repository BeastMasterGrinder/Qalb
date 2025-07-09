import { Metadata, ResolvingMetadata } from 'next';
import getBlogData from "@/lib/blog/getBlogData";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : "https://qalbjournal.com";

type Params = Promise<{ slug: string }>

export async function generateMetadata(
  props: {
    params: Params
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog = await getBlogData((await props.params).slug);
  
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
      url: `${defaultUrl}/blog/${(await props.params).slug}`,
      siteName: 'Qalb',
      locale: 'en_US',
      images: blog.coverImage ? [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
        ...previousImages
      ] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || blog.content.substring(0, 160),
      creator: '@QalbApp',
      images: blog.coverImage ? [blog.coverImage] : undefined,
    },
    alternates: {
      canonical: `/blog/${(await props.params).slug}`,
    },
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}