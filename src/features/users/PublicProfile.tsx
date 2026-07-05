'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getPublicProfile, getUserPosts } from '@/api/users';
import { PostGrid } from '@/components/posts/PostGrid';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { DEFAULT_AVATAR } from '@/lib/images';

export function PublicProfile() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username);

  const profileQuery = useQuery({
    queryKey: ['users', username],
    queryFn: () => getPublicProfile(username),
  });

  const postsQuery = useQuery({
    queryKey: ['users', username, 'posts'],
    queryFn: () => getUserPosts(username, 1, 12),
  });

  if (profileQuery.isLoading) return <LoadingState text='Mengambil profile...' />;
  if (profileQuery.isError) return <ErrorState text='Profile gagal dimuat.' />;
  if (!profileQuery.data) return <EmptyState text='User tidak ditemukan.' />;

  const profile = profileQuery.data;

  return (
    <section className='space-y-6'>
      <div className='rounded-lg border border-white/10 bg-zinc-950 p-5'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <Image
            src={profile.avatarUrl || DEFAULT_AVATAR}
            alt={profile.name}
            width={80}
            height={80}
            className='size-20 rounded-full object-cover'
          />

          <div>
            <h1 className='text-2xl font-bold text-white'>{profile.name}</h1>
            <p className='text-sm text-zinc-400'>@{profile.username}</p>
            <p className='mt-2 max-w-2xl whitespace-pre-line text-sm text-zinc-300'>
              {profile.bio || 'Belum ada bio.'}
            </p>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <div className='rounded-md bg-white/5 p-3 text-center'>
            <p className='font-bold text-white'>{profile.counts?.post ?? 0}</p>
            <p className='text-xs text-zinc-500'>posts</p>
          </div>
          <div className='rounded-md bg-white/5 p-3 text-center'>
            <p className='font-bold text-white'>{profile.counts?.followers ?? 0}</p>
            <p className='text-xs text-zinc-500'>followers</p>
          </div>
          <div className='rounded-md bg-white/5 p-3 text-center'>
            <p className='font-bold text-white'>{profile.counts?.following ?? 0}</p>
            <p className='text-xs text-zinc-500'>following</p>
          </div>
          <div className='rounded-md bg-white/5 p-3 text-center'>
            <p className='font-bold text-white'>{profile.counts?.likes ?? 0}</p>
            <p className='text-xs text-zinc-500'>likes</p>
          </div>
        </div>
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-bold text-white'>Posts</h2>
        {postsQuery.isLoading ? <LoadingState text='Mengambil post user...' /> : null}
        {postsQuery.isError ? <ErrorState text='Post user gagal dimuat.' /> : null}
        {postsQuery.data?.posts.length === 0 ? (
          <EmptyState text='User ini belum punya post.' />
        ) : null}
        {postsQuery.data?.posts.length ? (
          <PostGrid posts={postsQuery.data.posts} />
        ) : null}
      </div>
    </section>
  );
}
