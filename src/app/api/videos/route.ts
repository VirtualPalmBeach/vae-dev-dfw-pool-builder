import { NextRequest, NextResponse } from 'next/server'
import { getVideos } from '@/lib/api'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || '1')
  const limit = Number(searchParams.get('limit') || '9')
  const siteKey = searchParams.get('siteKey') || undefined

  const data = await getVideos(page, limit, siteKey)

  if (!data) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }

  return NextResponse.json(data)
}
