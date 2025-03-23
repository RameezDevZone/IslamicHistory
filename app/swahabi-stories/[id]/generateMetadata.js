// This is a Server Component
import { swahabiStories } from '../../data/swahabiStories';

export async function generateStaticParams() {
  return swahabiStories.map((story) => ({
    id: story.id,
  }));
}

// Create a metadata function
export function generateMetadata({ params }) {
  const { id } = params;
  const story = swahabiStories.find((s) => s.id === id);
  
  return {
    title: story ? story.title : 'Swahabi Story',
    description: story ? story.description : '',
  };
} 