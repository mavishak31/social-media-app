'use client';

import { Compass, House } from 'lucide-react';
import { useState } from 'react';

import { getFeed } from '@/api/feed';
import { getExplorePosts } from '@/api/posts';
import { FeedList } from '@/features/posts/FeedList';

export default function TimelinePage() {
  const [tab, setTab] = useState<'feed' | 'explore'>('feed');

  return (
    <main className='mx-auto max-w-6xl px-4 py-8'>
      <div className='mb-10 flex items-center justify-center'>
        <div className='flex rounded-full border border-white/10 bg-zinc-950 p-1'>
          <button
            onClick={() => setTab('feed')}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm transition

            ${
              tab === 'feed'
                ? 'bg-violet-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }
            `}
          >
            <House size={18} />
            Feed
          </button>

          <button
            onClick={() => setTab('explore')}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm transition

            ${
              tab === 'explore'
                ? 'bg-violet-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }
            `}
          >
            <Compass size={18} />
            Explore
          </button>
        </div>
      </div>

      <div className='mb-8' />

      {tab === 'feed' ? (
        <FeedList
          queryKey='feed'
          queryFn={getFeed}
          loadingText='Mengambil timeline...'
          errorText='Timeline gagal dimuat.'
          emptyText='Timeline masih kosong.'
        />
      ) : (
        <FeedList
          queryKey='explore'
          queryFn={getExplorePosts}
          loadingText='Mengambil explore...'
          errorText='Explore gagal dimuat.'
          emptyText='Belum ada post.'
        />
      )}
    </main>
  );
}
