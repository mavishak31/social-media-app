import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/post';

export function ProfilePostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className='grid grid-cols-3 gap-1'>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Image
            src={post.imageUrl}
            alt={post.caption || 'Post image'}
            width={500}
            height={500}
            className='aspect-square w-full object-cover'
          />
        </Link>
      ))}
    </div>
  );
}
