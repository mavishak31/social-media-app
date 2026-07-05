import { PostCard } from './PostCard';
import type { Post } from '@/types/post';

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
