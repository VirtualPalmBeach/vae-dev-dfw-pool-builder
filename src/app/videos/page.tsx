import { getVideos } from '@/lib/api'
import VideoGallery from '@/components/VideoGallery'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Container } from '@/components/Container'

export default async function Page() {
  const initial = await getVideos(1, 9)
  const videos = initial?.docs || []
  const totalPages = initial?.totalPages || 1

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <h1 className="mb-6 text-3xl font-bold">Videos</h1>
          <VideoGallery initialVideos={videos} totalPages={totalPages} />
        </Container>
      </main>
      <Footer />
    </div>
  )
}
