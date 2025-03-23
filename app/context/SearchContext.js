'use client'

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { quranStories, prophetStories, khaleefaStories, swahabiStories } from '../data/stories'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()

  const performSearch = (term) => {
    const allStories = [
      ...quranStories,
      ...prophetStories,
      ...khaleefaStories,
      ...swahabiStories
    ]

    const results = allStories.filter(story =>
      story.title.toLowerCase().includes(term.toLowerCase()) ||
      story.description.toLowerCase().includes(term.toLowerCase()) ||
      (typeof story.content === 'string' && story.content.toLowerCase().includes(term.toLowerCase())) ||
      (Array.isArray(story.tags) && story.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
    ).map(story => {
      // Determine the correct URL based on category
      let urlPrefix;
      switch(story.category) {
        case 'quran':
          urlPrefix = '/quran-stories/';
          break;
        case 'prophet':
        case 'prophet-stories':
          urlPrefix = '/prophet-stories/';
          break;
        case 'khaleefa':
          urlPrefix = '/khaleefa-stories/';
          break;
        case 'swahabi':
        case 'other':
          urlPrefix = '/swahabi-stories/';
          break;
        default:
          urlPrefix = '/';
      }
      
      return {
        ...story,
        url: `${urlPrefix}${story.id}`
      };
    })

    setSearchResults(results)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.length >= 2) {
      performSearch(term)
      setIsSearchOpen(true)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }

  const navigateToResult = (url) => {
    router.push(url)
    setIsSearchOpen(false)
    setSearchTerm('')
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
    setSearchTerm('')
    setSearchResults([])
  }

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm: handleSearch,
        isSearchOpen,
        setIsSearchOpen,
        searchResults,
        navigateToResult,
        closeSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 