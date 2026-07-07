'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PostCard } from '@/components/posts/PostCard';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Button } from '@/components/ui/button';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';

type FeedResult = {
  items?: Post[];
  posts?: Post[];
  pagination: Pagination;
};

type FeedListProps = {
  queryKey: string;
  queryFn: (page: number, limit: number) => Promise<FeedResult>;
  loadingText: string;
  errorText: string;
  emptyText: string;
};

export function FeedList({
  queryKey,
  queryFn,
  loadingText,
  errorText,
  emptyText,
}: FeedListProps) {
  const [page, setPage] = useState(1);

  const limit = 10;

  const query = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => queryFn(page, limit),
  });

  const posts = query.data?.items ?? query.data?.posts ?? [];

  return (
    <section className='space-y-6'>
      {query.isLoading && <LoadingState text={loadingText} />}

      {query.isError && <ErrorState text={errorText} />}

      {posts.length === 0 && !query.isLoading && (
        <EmptyState text={emptyText} />
      )}

      {posts.length > 0 && (
        <div className='mx-auto max-w-[620px] space-y-8'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {query.data && (
        <div className='flex items-center justify-center gap-4'>
          <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>

          <span className='text-sm text-zinc-400'>
            {query.data.pagination.page} /{query.data.pagination.totalPages}
          </span>

          <Button
            disabled={page >= query.data.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </section>
  );
}
