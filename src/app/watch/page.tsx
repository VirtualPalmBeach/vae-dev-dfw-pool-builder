export default function Page() {
  const videoUrl = 'https://media.selahpools.com/video/upload/v1747241796/zoelptpmr57f7csb0koc.mp4';
  
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '1rem' }}>
      <video 
        src={videoUrl}
        controls
        style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }}
      >
        Your browser does not support the video tag.
      </video>
    </main>
  );
}