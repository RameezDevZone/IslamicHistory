'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import SEO from '../../components/SEO'
import { quranStories } from '../../data/stories'
import { useState } from 'react'

// Add generateStaticParams for static export
export async function generateStaticParams() {
  // Import quranStories directly here to avoid client/server mismatch
  const { quranStories } = await import('../../data/quranStories')
  
  return quranStories.map((story) => ({
    id: story.id,
  }))
}

export default function StoryPage() {
  const { id } = useParams()
  const [imageError, setImageError] = useState(false)
  
  // Find the current story
  const story = quranStories.find(s => s.id === id)
  
  // Find previous and next stories
  const currentIndex = quranStories.findIndex(s => s.id === id)
  const prevStory = currentIndex > 0 ? quranStories[currentIndex - 1] : null
  const nextStory = currentIndex < quranStories.length - 1 ? quranStories[currentIndex + 1] : null
  
  if (!story) {
    return (
      <main>
        <SEO 
          title="Story Not Found"
          description="The requested Quran story could not be found"
          ogType="website"
          ogUrl="/quran-stories"
        />
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Story not found</h1>
          <Link
            href="/quran-stories"
            className="text-primary hover:text-primary/90"
          >
            ← Back to Quran Stories
          </Link>
        </div>
      </main>
    )
  }

  // Get first paragraph for description
  const firstParagraph = story.content.split('\n')[0].trim();
  const description = firstParagraph.length > 160 
    ? firstParagraph.substring(0, 157) + '...' 
    : firstParagraph;

  return (
    <main>
      <SEO 
        title={story.title}
        description={description}
        keywords="Quran stories, Islamic history, Muslim stories"
        ogImage={story.imageUrl}
        ogType="article"
        ogUrl={`/quran-stories/${story.id}`}
        publishedDate={story.publishedDate}
        author={story.author}
        category="Quran Stories"
        tags={story.tags}
      />
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/quran-stories"
          className="inline-block text-primary hover:text-primary/90 mb-8"
        >
          ← Back to Quran Stories
        </Link>
        
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={imageError ? '/images/placeholder.png' : (story.imageUrl || '/images/placeholder.png')}
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
          <span>{story.publishedDate ? new Date(story.publishedDate).toLocaleDateString() : ''}</span>
          <span className="mx-2">•</span>
          <span>{story.author}</span>
        </div>
        
        <div className="prose prose-lg max-w-none mb-12">
          {story.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph.trim()}
            </p>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {story.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Navigation between stories */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          {prevStory ? (
            <Link
              href={`/quran-stories/${prevStory.id}`}
              className="text-primary hover:text-primary/90"
            >
              ← {prevStory.title}
            </Link>
          ) : (
            <div />
          )}
          
          {nextStory ? (
            <Link
              href={`/quran-stories/${nextStory.id}`}
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