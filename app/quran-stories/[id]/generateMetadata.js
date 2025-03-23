// This is a Server Component
import { quranStories } from '../../data/quranStories';

export async function generateStaticParams() {
  return quranStories.map((story) => ({
    id: story.id,
  }));
}

// Create a metadata function
export function generateMetadata({ params }) {
  const { id } = params;
  const story = quranStories.find((s) => s.id === id);
  
  return {
    title: story ? story.title : 'Quran Story',
    description: story ? story.description : '',
  };
} 