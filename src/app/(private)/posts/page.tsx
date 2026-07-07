'use client';

import Link from 'next/link';
import { getExplorePosts } from '@/api/posts';
import { FeedList } from '@/features/posts/FeedList';

export default function PostsPage() {
  return (
    <main className='mx-auto max-w-5xl space-y-6 px-4 py-8'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Explore Posts</h1>
          <p className='text-sm text-zinc-400'>Semua post dari API explore.</p>
        </div>

        <Link
          href='/posts/create'
          className='rounded-full bg-violet-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-violet-500'
        >
          Create Post
        </Link>
      </div>

      <FeedList
        queryKey='explore'
        queryFn={getExplorePosts}
        loadingText='Mengambil explore...'
        errorText='Explore gagal dimuat.'
        emptyText='Belum ada post.'
      />
    </main>
  );
}
