'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import { swahabiStories } from '../../data/stories'
import { useState } from 'react'

// Add generateStaticParams for static export
export async function generateStaticParams() {
  // Import swahabiStories directly here to avoid client/server mismatch
  const { swahabiStories } = await import('../../data/swahabiStories')
  
  return swahabiStories.map((story) => ({
    id: story.id,
  }))
}

export default function SwahabiStoryPage() {
  const params = useParams()
  const storyId = params.id
  const [imageError, setImageError] = useState(false)

  // Find the current story and its index
  const currentIndex = swahabiStories.findIndex(story => story.id === storyId)
  const story = swahabiStories[currentIndex]

  // Get previous and next stories for navigation
  const prevStory = currentIndex > 0 ? swahabiStories[currentIndex - 1] : null
  const nextStory = currentIndex < swahabiStories.length - 1 ? swahabiStories[currentIndex + 1] : null

  if (!story) {
    return (
      <main>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Story not found</h1>
          <Link
            href="/swahabi-stories"
            className="text-primary hover:text-primary/90"
          >
            ← Back to Swahabi Stories
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/swahabi-stories"
          className="inline-block mb-8 text-primary hover:text-primary/90"
        >
          ← Back to Swahabi Stories
        </Link>

        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={imageError ? '/images/placeholder.png' : (story.image || story.imageUrl || '/images/placeholder.png')}
            alt={story.title}
            fill
            className="object-cover rounded-lg"
            onError={() => setImageError(true)}
            unoptimized={true}
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {story.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{(story.publishedDate || story.date) ? new Date(story.publishedDate || story.date).toLocaleDateString() : ''}</span>
          <span className="mx-2">•</span>
          <span>{story.author}</span>
        </div>

        <div className="prose prose-lg max-w-none mb-8">
          {typeof story.content === 'string' ? 
            story.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            )) : 
            story.content
          }
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Story Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          {prevStory ? (
            <Link
              href={`/swahabi-stories/${prevStory.id}`}
              className="text-primary hover:text-primary/90"
            >
              ← {prevStory.title}
            </Link>
          ) : (
            <div />
          )}

          {nextStory ? (
            <Link
              href={`/swahabi-stories/${nextStory.id}`}
              className="text-primary hover:text-primary/90"
            >
              {nextStory.title} →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>
    </main>
  )
} 