// This is a Server Component
import { prophetStories } from '../../data/prophetStories';

export async function generateStaticParams() {
  return prophetStories.map((story) => ({
    id: story.id,
  }));
}

// Create a dummy metadata function to make Next.js happy
export function generateMetadata({ params }) {
  const { id } = params;
  const story = prophetStories.find((s) => s.id === id);
  
  return {
    title: story ? story.title : 'Prophet Story',
    description: story ? story.description : '',
  };
} 