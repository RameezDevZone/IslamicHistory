// This file serves as a compatibility layer for components that still import from a central stories file
// In the future, components should import directly from the specific story files

import { quranStories } from './quranStories'
import { prophetStories } from './prophetStories'
import { khaleefaStories } from './khaleefaStories'
import { swahabiStories } from './swahabiStories'

// Re-export all story arrays
export { quranStories, prophetStories, khaleefaStories, swahabiStories }

// For backward compatibility
export const otherStories = swahabiStories

// Helper function to get stories by category
export const getStoriesByCategory = (category) => {
  switch (category) {
    case 'quran':
      return quranStories
    case 'prophet':
      return prophetStories
    case 'khaleefa':
      return khaleefaStories
    case 'swahabi':
      return swahabiStories
    case 'other':
      return swahabiStories // For backward compatibility
    default:
      return []
  }
}

// Helper function to get a story by ID and category
export const getStoryById = (id, category) => {
  const stories = getStoriesByCategory(category)
  return stories.find(story => story.id === id)
}

// Utility function to search across all stories
export const searchStories = (searchTerm) => {
  const allStories = [
    ...quranStories,
    ...prophetStories,
    ...khaleefaStories,
    ...swahabiStories
  ]

  return allStories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof story.content === 'string' && story.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (Array.isArray(story.tags) && story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  )
} 