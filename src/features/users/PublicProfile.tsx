'use client';

import { useQuery } from '@tanstack/react-query';
import { Bookmark, Grid3X3 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getMySavedPosts } from '@/api/saves';
import { getPublicProfile, getUserPosts } from '@/api/users';
import { PostGrid } from '@/components/posts/PostGrid';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FollowButton } from '@/components/users/FollowButton';
import { FollowListModal } from '@/components/users/FollowListModal';
import { DEFAULT_AVATAR } from '@/lib/images';

export function PublicProfile() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username);
  const [followModal, setFollowModal] = useState<'followers' | 'following' | null>(
    null
  );

  const profileQuery = useQuery({
    queryKey: ['users', username],
    queryFn: () => getPublicProfile(username),
  });

  const postsQuery = useQuery({
    queryKey: ['users', username, 'posts'],
    queryFn: () => getUserPosts(username, 1, 12),
  });

  const savedQuery = useQuery({
    queryKey: ['me', 'saved', username],
    queryFn: () => getMySavedPosts(1, 12),
    enabled: Boolean(profileQuery.data?.isMe),
  });

  if (profileQuery.isLoading) return <LoadingState text='Mengambil profile...' />;
  if (profileQuery.isError) return <ErrorState text='Profile gagal dimuat.' />;
  if (!profileQuery.data) return <EmptyState text='User tidak ditemukan.' />;

  const profile = profileQuery.data;

  return (
    <section className='space-y-6'>
      <div className='rounded-lg border border-white/10 bg-black p-5'>
        <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <Image
              src={profile.avatarUrl || DEFAULT_AVATAR}
              alt={profile.name}
              width={84}
              height={84}
              className='size-[84px] rounded-full object-cover'
            />

            <div>
              <h1 className='text-2xl font-bold text-white'>{profile.name}</h1>
              <p className='text-sm text-zinc-400'>@{profile.username}</p>
              <p className='mt-2 max-w-2xl whitespace-pre-line text-sm text-zinc-300'>
                {profile.bio || 'Belum ada bio.'}
              </p>
            </div>
          </div>

          <FollowButton
            username={profile.username}
            isFollowing={profile.isFollowing}
            isMe={profile.isMe}
          />
        </div>

        <div className='mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4'>
          <div className='border-r border-white/10 text-center'>
            <p className='font-bold text-white'>{profile.counts?.post ?? 0}</p>
            <p className='text-xs text-zinc-500'>Post</p>
          </div>
          <button
            type='button'
            onClick={() => setFollowModal('followers')}
            className='border-r border-white/10 text-center'
          >
            <p className='font-bold text-white'>{profile.counts?.followers ?? 0}</p>
            <p className='text-xs text-zinc-500'>Followers</p>
          </button>
          <button
            type='button'
            onClick={() => setFollowModal('following')}
            className='border-r border-white/10 text-center'
          >
            <p className='font-bold text-white'>{profile.counts?.following ?? 0}</p>
            <p className='text-xs text-zinc-500'>Following</p>
          </button>
          <div className='text-center'>
            <p className='font-bold text-white'>{profile.counts?.likes ?? 0}</p>
            <p className='text-xs text-zinc-500'>Likes</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue='gallery' className='space-y-5'>
        <TabsList variant='line' className='grid w-full grid-cols-2 border-b border-white/10'>
          <TabsTrigger value='gallery' className='gap-2 py-3 text-zinc-400 data-active:text-white'>
            <Grid3X3 className='size-4' />
            Gallery
          </TabsTrigger>
          <TabsTrigger value='saved' className='gap-2 py-3 text-zinc-400 data-active:text-white'>
            <Bookmark className='size-4' />
            Saved
          </TabsTrigger>
        </TabsList>

        <TabsContent value='gallery'>
          {postsQuery.isLoading ? <LoadingState text='Mengambil post user...' /> : null}
          {postsQuery.isError ? <ErrorState text='Post user gagal dimuat.' /> : null}
          {postsQuery.data?.posts.length === 0 ? (
            <EmptyState text='User ini belum punya post.' />
          ) : null}
          {postsQuery.data?.posts.length ? (
            <PostGrid posts={postsQuery.data.posts} />
          ) : null}
        </TabsContent>

        <TabsContent value='saved'>
          {!profile.isMe ? (
            <EmptyState text='Saved hanya bisa dilihat oleh pemilik akun.' />
          ) : null}
          {profile.isMe && savedQuery.isLoading ? (
            <LoadingState text='Mengambil post tersimpan...' />
          ) : null}
          {profile.isMe && savedQuery.isError ? (
            <ErrorState text='Saved gagal dimuat.' />
          ) : null}
          {profile.isMe && savedQuery.data?.posts.length === 0 ? (
            <EmptyState text='Belum ada post yang disimpan.' />
          ) : null}
          {profile.isMe && savedQuery.data?.posts.length ? (
            <PostGrid posts={savedQuery.data.posts} />
          ) : null}
        </TabsContent>
      </Tabs>

      <FollowListModal
        username={profile.username}
        type={followModal ?? 'followers'}
        open={Boolean(followModal)}
        onOpenChange={(open) => setFollowModal(open ? followModal : null)}
      />
    </section>
  );
}
