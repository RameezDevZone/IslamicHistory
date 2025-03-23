'use client'

import { useState } from 'react'

export default function Search({ onSearch, onFilter, onSort }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilterBy(value)
    onFilter(value)
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    onSort(value)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search input */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stories..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Filter dropdown */}
          <div className="flex-1">
            <select
              value={filterBy}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              <option value="quran-stories">Quran Stories</option>
              <option value="prophet-stories">Prophet Stories</option>
              <option value="khaleefa-stories">Khaleefa Stories</option>
              <option value="other-stories">Other Stories</option>
            </select>
          </div>

          {/* Sort dropdown */}
          <div className="flex-1">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  )
} 