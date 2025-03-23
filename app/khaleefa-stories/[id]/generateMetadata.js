// This is a Server Component
import { khaleefaStories } from '../../data/khaleefaStories';

export async function generateStaticParams() {
  return khaleefaStories.map((story) => ({
    id: story.id,
  }));
}

// Create a metadata function
export function generateMetadata({ params }) {
  const { id } = params;
  const story = khaleefaStories.find((s) => s.id === id);
  
  return {
    title: story ? story.title : 'Khaleefa Story',
    description: story ? story.description : '',
  };
} 