// src/app/watch/[slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const videoUrl = `https://media.selahpools.com/video/upload/${slug}.mp4`;

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '1rem' }}>
      <iframe
        src={videoUrl}
        allow="autoplay; fullscreen"
        style={{ width: '80vw', height: '80vh', border: 'none', borderRadius: '12px' }}
        title="CDN Video"
      />
    </main>
  );
}
