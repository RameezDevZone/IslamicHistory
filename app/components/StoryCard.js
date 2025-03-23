'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function StoryCard({ title, description, image, author, date, slug, category }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageError ? '/images/placeholder.png' : (image || '/images/placeholder.png')}
          alt={title || 'Story Image'}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          unoptimized={true}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{author}</span>
          <span>{date ? new Date(date).toLocaleDateString() : ''}</span>
        </div>
        <Link
          href={`/${category}/${slug}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  )
} 