import { getVideos } from '@/lib/api'
import VideoGallery from '@/components/VideoGallery'

export default async function Page() {
  const initial = await getVideos(1, 9)
  const videos = initial?.docs || []
  const totalPages = initial?.totalPages || 1

  return (
    <main className="min-h-screen p-4">
      <h1 className="mb-4 text-3xl font-bold">Videos</h1>
      <VideoGallery initialVideos={videos} totalPages={totalPages} />
    </main>
  )
}
