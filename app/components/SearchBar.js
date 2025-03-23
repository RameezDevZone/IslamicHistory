'use client'

import { useEffect, useRef } from 'react'
import { useSearch } from '../context/SearchContext'

export default function SearchBar({ onClose }) {
  const {
    searchTerm,
    setSearchTerm,
    isSearchOpen,
    searchResults,
    navigateToResult,
    closeSearch
  } = useSearch()

  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch()
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [closeSearch, onClose])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeSearch()
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeSearch, onClose])

  const handleResultClick = (url) => {
    navigateToResult(url)
    onClose?.()
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <div className="relative flex items-center">
          <svg 
            className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all stories..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => {
                closeSearch()
                setSearchTerm('')
              }}
              className="absolute right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isSearchOpen && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto">
          {searchResults.map((result) => (
            <button
              key={result.url}
              onClick={() => handleResultClick(result.url)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{result.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {result.description}
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}

      {isSearchOpen && searchTerm.length >= 2 && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 text-center text-gray-500 dark:text-gray-400">
          No results found
        </div>
      )}
    </div>
  )
} 