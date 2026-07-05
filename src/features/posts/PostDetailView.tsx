'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getPostDetail } from '@/api/posts';
import { PostDetail } from '@/components/posts/PostDetail';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import type { RootState } from '@/store';
import { DeletePostButton } from './DeletePostButton';

export function PostDetailView() {
  const params = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);
  const postId = Number(params.id);

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostDetail(postId),
    enabled: Number.isFinite(postId),
  });

  if (query.isLoading) return <LoadingState text='Mengambil detail post...' />;
  if (query.isError) return <ErrorState text='Detail post gagal dimuat.' />;
  if (!query.data) return <EmptyState text='Post tidak ditemukan.' />;

  const isOwner = user?.username === query.data.author.username;

  return (
    <section className='space-y-4'>
      <PostDetail post={query.data} />
      {isOwner ? <DeletePostButton postId={query.data.id} /> : null}
    </section>
  );
}
