'use client';

import Link from 'next/link';
import { getMySavedPosts } from '@/api/saves';
import { PostCollection } from '@/features/posts/PostCollection';

export default function MySavedPage() {
  return (
    <main className='mx-auto max-w-5xl space-y-6 px-4 py-8'>
      <Link href='/me' className='text-sm text-violet-400 hover:text-violet-300'>
        Back to profile
      </Link>

      <div>
        <h1 className='text-3xl font-bold'>My Saved</h1>
        <p className='text-sm text-zinc-400'>Post yang kamu simpan.</p>
      </div>

      <PostCollection
        queryKey={['me', 'saved']}
        queryFn={() => getMySavedPosts(1, 20)}
        loadingText='Mengambil post tersimpan...'
        errorText='Saved gagal dimuat.'
        emptyText='Belum ada post yang kamu simpan.'
      />
    </main>
  );
}
