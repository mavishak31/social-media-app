'use client';

import Link from 'next/link';
import { getMyLikedPosts } from '@/api/likes';
import { PostCollection } from '@/features/posts/PostCollection';

export default function MyLikesPage() {
  return (
    <main className='mx-auto max-w-5xl space-y-6 px-4 py-8'>
      <Link href='/me' className='text-sm text-violet-400 hover:text-violet-300'>
        Back to profile
      </Link>

      <div>
        <h1 className='text-3xl font-bold'>My Likes</h1>
        <p className='text-sm text-zinc-400'>Post yang pernah kamu like.</p>
      </div>

      <PostCollection
        queryKey={['me', 'likes']}
        queryFn={() => getMyLikedPosts(1, 20)}
        loadingText='Mengambil post yang kamu like...'
        errorText='My Likes gagal dimuat.'
        emptyText='Kamu belum like post apa pun.'
      />
    </main>
  );
}
