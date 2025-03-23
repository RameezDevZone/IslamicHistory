'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

// Add generateStaticParams for static export
export async function generateStaticParams() {
  // Import swahabiStories directly since other-stories redirects to swahabi-stories
  const { swahabiStories } = await import('../../data/swahabiStories')
  
  return swahabiStories.map((story) => ({
    id: story.id,
  }))
}

export default function OtherStoryRedirect() {
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    router.replace(`/swahabi-stories/${id}`)
  }, [router, id])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Redirecting to Swahabi Stories...</p>
    </div>
  )
} 