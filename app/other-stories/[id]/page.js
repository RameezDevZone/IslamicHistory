'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

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