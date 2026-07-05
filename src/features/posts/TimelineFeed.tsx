'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getFeed } from '@/api/feed';
import { TimelinePostCard } from '@/components/posts/TimelinePostCard';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Button } from '@/components/ui/button';

export function TimelineFeed() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const query = useQuery({
    queryKey: ['feed', page],
    queryFn: () => getFeed(page, limit),
  });

  return (
    <section className='space-y-5'>
      {query.isLoading ? <LoadingState text='Mengambil timeline...' /> : null}
      {query.isError ? <ErrorState text='Timeline gagal dimuat.' /> : null}

      {query.data?.items.length === 0 ? (
        <EmptyState text='Timeline masih kosong. Coba follow user lain atau buat post baru.' />
      ) : null}

      {query.data?.items.length ? (
        <div className='mx-auto max-w-[520px] space-y-8'>
          {query.data.items.map((post) => (
            <TimelinePostCard key={post.id} post={post} />
          ))}
        </div>
      ) : null}

      {query.data ? (
        <div className='flex items-center justify-center gap-3'>
          <Button
            type='button'
            disabled={page <= 1}
            onClick={() => setPage((value) => value - 1)}
            className='rounded-full bg-white/10 text-white hover:bg-white/20'
          >
            Previous
          </Button>
          <span className='text-sm text-zinc-400'>
            Page {query.data.pagination.page} / {query.data.pagination.totalPages}
          </span>
          <Button
            type='button'
            disabled={page >= query.data.pagination.totalPages}
            onClick={() => setPage((value) => value + 1)}
            className='rounded-full bg-white/10 text-white hover:bg-white/20'
          >
            Next
          </Button>
        </div>
      ) : null}
    </section>
  );
}
