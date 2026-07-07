'use client';

import { useQuery } from '@tanstack/react-query';
import { PostGrid } from '@/components/posts/PostGrid';
import { ProfilePostGrid } from '@/components/posts/ProfilePostGrid';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';

type PostCollectionProps = {
  queryKey: string[];
  queryFn: () => Promise<{ posts: Post[]; pagination: Pagination }>;
  loadingText: string;
  errorText: string;
  emptyText: string;
  variant?: 'card' | 'profile';
};

export function PostCollection({
  queryKey,
  queryFn,
  loadingText,
  errorText,
  emptyText,
  variant = 'card',
}: PostCollectionProps) {
  const query = useQuery({
    queryKey,
    queryFn,
  });

  if (query.isLoading) return <LoadingState text={loadingText} />;
  if (query.isError) return <ErrorState text={errorText} />;

  if (!query.data?.posts.length) {
    return <EmptyState text={emptyText} />;
  }

  if (variant === 'profile') {
    return <ProfilePostGrid posts={query.data.posts} />;
  }

  return <PostGrid posts={query.data.posts} />;
}
