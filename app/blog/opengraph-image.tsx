import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Qalb Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        <div style={{ color: '#1a1a1a', marginBottom: '20px' }}>Qalb Blog</div>
        <div style={{ color: '#666', fontSize: 30, textAlign: 'center' }}>
          Islamic Articles, Quranic Insights, and Spiritual Guidance
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}