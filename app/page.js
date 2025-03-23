import Navigation from './components/Navigation'
import StoryListing from './components/FeaturedStories'

export default function Home() {
  return (
    <main>
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Malayalam Islamic History
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the rich heritage of Islamic history through our captivating stories and insightful content.
            </p>
          </div>
        </div>
      </div>

      {/* Stories Listing Section */}
      <StoryListing />
    </main>
  )
} 