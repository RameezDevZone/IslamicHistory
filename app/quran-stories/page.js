'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import { quranStories } from '../data/stories'

export default function QuranStories() {
  const [sortBy, setSortBy] = useState('date') // 'date' or 'title'
  const [searchTerm, setSearchTerm] = useState('')

  // Filter and sort stories
  const filteredStories = quranStories
    .filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(story.tags) && story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedDate || b.date) - new Date(a.publishedDate || a.date)
      }
      return a.title.localeCompare(b.title)
    })

  return (
    <main>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quran Stories</h1>
        
        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
        
        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={story.imageUrl}
                alt={story.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {story.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {story.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>{new Date(story.publishedDate).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{story.author}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  href={`/quran-stories/${story.id}`}
                  className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 