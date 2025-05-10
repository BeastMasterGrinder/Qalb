import { ImageResponse } from 'next/og';
import getBlogData from "@/lib/blog/getBlogData";

export const runtime = 'edge';
export const alt = 'Blog Post Preview';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const blog = await getBlogData((await params).slug);

  if (!blog) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div style={{ color: '#1a1a1a', marginBottom: '20px' }}>Blog Post Not Found</div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div style={{ color: '#1a1a1a', marginBottom: '20px' }}>{blog.title}</div>
        <div style={{ color: '#666', fontSize: 30, textAlign: 'center' }}>
          {blog.excerpt || blog.content.substring(0, 100) + '...'}
        </div>
        <div style={{ color: '#999', fontSize: 24, marginTop: '20px' }}>
          {blog.author || 'Qalb Team'}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 