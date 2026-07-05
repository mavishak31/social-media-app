'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getExplorePosts } from '@/api/posts';
import { PostGrid } from '@/components/posts/PostGrid';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Button } from '@/components/ui/button';

export function ExplorePosts() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const query = useQuery({
    queryKey: ['posts', 'explore', page],
    queryFn: () => getExplorePosts(page, limit),
  });

  return (
    <section className='space-y-5'>
      {query.isLoading ? <LoadingState text='Mengambil posts...' /> : null}
      {query.isError ? <ErrorState text='Posts gagal dimuat.' /> : null}

      {query.data?.posts.length === 0 ? (
        <EmptyState text='Belum ada post.' />
      ) : null}

      {query.data?.posts.length ? <PostGrid posts={query.data.posts} /> : null}

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
