import { quranStories, prophetStories, khaleefaStories, swahabiStories } from './data/stories'

export default async function sitemap() {
  const baseUrl = process.env.SITE_URL || 'https://www.islamichistory.in'
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quran-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prophet-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/khaleefa-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/swahabi-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Add redirect for legacy path
    {
      url: `${baseUrl}/other-stories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
  
  // Dynamic story pages
  const quranStoryPages = quranStories.map(story => ({
    url: `${baseUrl}/quran-stories/${story.id}`,
    lastModified: new Date(story.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  const prophetStoryPages = prophetStories.map(story => ({
    url: `${baseUrl}/prophet-stories/${story.id}`,
    lastModified: new Date(story.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  const khaleefaStoryPages = khaleefaStories.map(story => ({
    url: `${baseUrl}/khaleefa-stories/${story.id}`,
    lastModified: new Date(story.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  const swahabiStoryPages = swahabiStories.map(story => ({
    url: `${baseUrl}/swahabi-stories/${story.id}`,
    lastModified: new Date(story.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  
  // Add legacy redirects for individual other-stories
  const legacyOtherStoryRedirects = swahabiStories.map(story => ({
    url: `${baseUrl}/other-stories/${story.id}`,
    lastModified: new Date(story.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
  
  return [
    ...staticPages,
    ...quranStoryPages,
    ...prophetStoryPages,
    ...khaleefaStoryPages,
    ...swahabiStoryPages,
    ...legacyOtherStoryRedirects,
  ]
} 