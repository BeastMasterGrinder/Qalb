import { Metadata } from 'next';

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://www.${process.env.NEXT_PUBLIC_APP_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blogs | Qalb",
  description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
  openGraph: {
    title: "Blogs | Qalb",
    description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
    url: `${defaultUrl}/blog`,
    siteName: "Qalb",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs | Qalb",
    description: "Explore our collection of Islamic articles, Quranic insights, and spiritual guidance. Discover wisdom and knowledge through our carefully curated blog posts.",
    creator: "@QalbApp",
  },
};


export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mt-20">
            <div className="container mx-auto p-4">
                {children}
            </div>
        </div>
    );
}