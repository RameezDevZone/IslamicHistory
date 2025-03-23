'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OtherStoriesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/swahabi-stories')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Redirecting to Swahabi Stories...</p>
    </div>
  )
} 