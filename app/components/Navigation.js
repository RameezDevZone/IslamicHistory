'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { SearchProvider } from '../context/SearchContext'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) { // xl breakpoint
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tabs = [
    { name: 'Quran Stories', path: '/quran-stories' },
    { name: 'Prophet Stories', path: '/prophet-stories' },
    { name: 'Khaleefa Stories', path: '/khaleefa-stories' },
    { name: 'Swahabi Stories', path: '/swahabi-stories' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <SearchProvider>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side: Hamburger and Logo */}
            <div className="flex items-center space-x-2">
              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors xl:hidden"
                aria-expanded={isOpen}
              >
                <div className="relative flex flex-col justify-center items-center w-6 h-6">
                  <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
                  <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
                </div>
              </button>

              {/* Logo and Site Name */}
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/islamic_history_logo.png"
                  alt="Islamic History Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-primary font-bold text-xl hidden xl:inline">
                  Malayalam Islamic History
                </span>
              </Link>
            </div>

            {/* Desktop Menu - Only visible on extra large screens */}
            <div className="hidden xl:flex space-x-8">
              {tabs.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side: Search and Settings */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Search Stories"
              >
                <svg className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div 
            className={`xl:hidden absolute left-0 right-0 bg-white dark:bg-black transform transition-all duration-300 ease-in-out ${
              isOpen 
                ? 'opacity-100 translate-y-0 shadow-lg' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              {tabs.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="block py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary border-b border-gray-100 dark:border-gray-800 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm">
          <div className="fixed top-16 right-4 left-4 md:left-auto md:w-[600px] md:right-16 bg-white dark:bg-black rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Search Stories</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary focus:outline-none"
              >
                <span className="sr-only">Close search</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Content Spacer */}
      <div className="h-16" />
    </SearchProvider>
  )
} 