'use client'

import { useState, useEffect, useRef } from 'react'

interface Video {
  id: string
  cloudinaryPublicId: string
}

interface Props {
  initialVideos: Video[]
  totalPages: number
}

const CLOUDINARY_BASE = 'https://res.cloudinary.com/vaibase/video/upload/'

export default function VideoGallery({ initialVideos, totalPages }: Props) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current) return
    const observer = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        setLoading(true)
        try {
          const nextPage = page + 1
          const res = await fetch(`/api/videos?page=${nextPage}`)
          if (res.ok) {
            const data = await res.json()
            setVideos(prev => [...prev, ...data.docs])
            setPage(data.page)
          }
        } finally {
          setLoading(false)
        }
      }
    })
    const el = loadMoreRef.current
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [page, totalPages, loading])

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map(video => (
          <video
            key={video.id}
            src={`${CLOUDINARY_BASE}${video.cloudinaryPublicId}.mp4`}
            controls
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
      {page < totalPages && <div ref={loadMoreRef} className="py-4" />}
      {loading && <p className="py-4 text-center">Loading...</p>}
    </div>
  )
}
