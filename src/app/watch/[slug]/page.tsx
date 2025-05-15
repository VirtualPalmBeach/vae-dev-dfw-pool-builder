import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export default async function VideoPage({ params }: Props) {
  const { slug } = params

  if (!slug) notFound()

  const videoUrl = `https://media.selahpools.com/video/upload/${slug}.mp4`

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
  )
}
