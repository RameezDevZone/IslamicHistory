// This is a Server Component
import { swahabiStories } from '../../data/swahabiStories';

export async function generateStaticParams() {
  return swahabiStories.map((story) => ({
    id: story.id,
  }));
}

// Create a dummy metadata function to make Next.js happy
export function generateMetadata() {
  return {
    title: 'Redirecting...',
  };
} 