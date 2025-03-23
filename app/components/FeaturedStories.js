'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { quranStories, prophetStories, khaleefaStories, swahabiStories } from '../data/stories'

export default function StoryListing() {
  const [activeTab, setActiveTab] = useState('quran')
  const [imageError, setImageError] = useState({})
  const [isClient, setIsClient] = useState(false)

  // Ensure component only runs client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const tabs = [
    { id: 'quran', label: 'Quran Stories', stories: quranStories },
    { id: 'prophet', label: 'Prophet Stories', stories: prophetStories },
    { id: 'khaleefa', label: 'Khaleefa Stories', stories: khaleefaStories },
    { id: 'swahabi', label: 'Swahabi Stories', stories: swahabiStories }
  ]

  const activeStories = tabs.find(tab => tab.id === activeTab)?.stories || []

  const handleImageError = (storyId) => {
    setImageError(prev => ({
      ...prev,
      [storyId]: true
    }))
  }

  // Function to ensure image has a valid path
  const getImagePath = (story) => {
    if (!story.image && !story.imageUrl || story.image === '' && story.imageUrl === '') {
      return '/images/placeholder.png'
    }
    return story.image || story.imageUrl
  }

  if (!isClient) {
    return null // Avoid rendering on server to prevent hydration issues
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Islamic History Stories</h2>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="border border-gray-200 rounded-lg p-1 bg-white">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeStories.map(story => (
            <div
              key={story.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-48 bg-gray-100">
                {story && (
                  <Image
                    src={imageError[story.id] ? '/images/placeholder.png' : getImagePath(story)}
                    alt={story.title || 'Story image'}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(story.id)}
                    unoptimized={true}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {story.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{story.date}</span>
                  <Link
                    href={`/${story.category}-stories/${story.id}`}
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href={`/${activeTab}-stories`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors duration-200"
          >
            View All {tabs.find(tab => tab.id === activeTab)?.label}
          </Link>
        </div>
      </div>
    </section>
  )
} 