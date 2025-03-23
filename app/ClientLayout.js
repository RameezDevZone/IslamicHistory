'use client'

import './globals.css'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import { 
  handleKeyboardShortcut, 
  applyPreferences, 
  getPreferences,
  toggleDarkMode,
  toggleDyslexicFont,
  toggleHighContrast,
  toggleAnimations,
  adjustFontSize,
  resetFontSize
} from './utils/keyboardShortcuts'

export default function ClientLayout({ children }) {
  const [preferences, setPreferences] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    // Apply initial preferences
    const prefs = getPreferences()
    setPreferences(prefs)
    applyPreferences(prefs)

    // Add keyboard shortcut listener
    document.addEventListener('keydown', handleKeyboardShortcut)

    // Add click outside listener to close dropdown
    const handleClickOutside = (event) => {
      if (!event.target.closest('.accessibility-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    // Add scroll listener
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut)
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleToggle = (toggleFn) => {
    toggleFn()
    setPreferences(getPreferences())
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white flex flex-col">
        {/* Accessibility Controls Dropdown */}
        <div className={`fixed top-20 right-4 p-2 z-[55] accessibility-dropdown backdrop-blur-sm transition-opacity duration-300 ${scrollPosition > 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-lg bg-white/90 dark:bg-black/90 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            title="Accessibility Settings"
          >
            <span className="text-xl">⚙️</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-2 mt-2 w-64 md:w-72 bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-3">
              {/* Theme Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Theme</h3>
                <div className="flex items-center justify-between space-x-2">
                  <button
                    onClick={() => handleToggle(toggleDarkMode)}
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    title="Toggle Dark Mode (Ctrl + D)"
                  >
                    {preferences?.isDarkMode ? '🌙 Dark' : '☀️ Light'}
                  </button>
                  <button
                    onClick={() => handleToggle(toggleHighContrast)}
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    title="Toggle High Contrast (Ctrl + H)"
                  >
                    {preferences?.isHighContrast ? '◐ High' : '◯ Normal'}
                  </button>
                </div>
              </div>

              {/* Font Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Font</h3>
                <button
                  onClick={() => handleToggle(toggleDyslexicFont)}
                  className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                  title="Toggle Dyslexic Font (Ctrl + Y)"
                >
                  {preferences?.isDyslexicFont ? 'Aa Dyslexic Font' : 'aa Standard Font'}
                </button>
                <div className="flex items-center justify-between space-x-2">
                  <button
                    onClick={() => handleToggle(() => adjustFontSize(-1))}
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    title="Decrease Font Size (Ctrl + -)"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => handleToggle(resetFontSize)}
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    title="Reset Font Size (Ctrl + 0)"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => handleToggle(() => adjustFontSize(1))}
                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    title="Increase Font Size (Ctrl + +)"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Animation Controls */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Animations</h3>
                <button
                  onClick={() => handleToggle(toggleAnimations)}
                  className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-900 dark:text-white"
                  title="Toggle Animations (Alt + N)"
                >
                  {preferences?.enableAnimations ? '✨ Animations On' : '✨ Animations Off'}
                </button>
              </div>

              {/* Keyboard Shortcuts - Hide on Mobile */}
              <div className="hidden md:block pt-2 border-t border-gray-200 dark:border-white/10">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Keyboard Shortcuts</h3>
                <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Ctrl + D: Dark Mode</li>
                  <li>Ctrl + Y: Dyslexic Font</li>
                  <li>Ctrl + H: High Contrast</li>
                  <li>Ctrl + +/-: Font Size</li>
                  <li>Ctrl + 0: Reset Font</li>
                  <li>Alt + N: Animations</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
} 