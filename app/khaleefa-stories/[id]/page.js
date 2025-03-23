'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import { khaleefaStories } from '../../data/stories'

export default function KhaleefaStoryPage() {
  const { id } = useParams()
  
  const story = khaleefaStories.find(s => s.id === id)
  const currentIndex = khaleefaStories.findIndex(s => s.id === id)
  const prevStory = currentIndex > 0 ? khaleefaStories[currentIndex - 1] : null
  const nextStory = currentIndex < khaleefaStories.length - 1 ? khaleefaStories[currentIndex + 1] : null
  
  if (!story) {
    return (
      <main>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Story not found</h1>
          <Link
            href="/khaleefa-stories"
            className="text-primary hover:text-primary/90"
          >
            ← Back to Khaleefa Stories
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
          href="/khaleefa-stories"
          className="inline-block text-primary hover:text-primary/90 mb-8"
        >
          ← Back to Khaleefa Stories
        </Link>
        
        <Image
          src={story.imageUrl}
          alt={story.title}
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {story.title}
        </h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{new Date(story.publishedDate).toLocaleDateString()}</span>
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
              href={`/khaleefa-stories/${prevStory.id}`}
              className="text-primary hover:text-primary/90"
            >
              ← {prevStory.title}
            </Link>
          ) : (
            <div />
          )}
          
          {nextStory ? (
            <Link
              href={`/khaleefa-stories/${nextStory.id}`}
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