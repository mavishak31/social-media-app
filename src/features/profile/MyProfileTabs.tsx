'use client';

import { useQuery } from '@tanstack/react-query';
import { Bookmark, Grid3X3 } from 'lucide-react';
import { getMyPosts } from '@/api/profile';
import { getMySavedPosts } from '@/api/saves';
import { ProfilePostGrid } from '@/components/posts/ProfilePostGrid';
import { EmptyGalleryState } from '@/components/profile/EmptyGalleryState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostCollection } from '@/features/posts/PostCollection';

export function MyProfileTabs({ username }: { username: string }) {
  const postsQuery = useQuery({
    queryKey: ['me', 'posts', username],
    queryFn: () => getMyPosts(1, 12),
  });
  const posts = postsQuery.data?.items ?? [];

  return (
    <Tabs defaultValue='gallery' className='mx-auto mt-6 max-w-3xl space-y-5'>
      <TabsList
        variant='line'
        className='grid w-full grid-cols-2 border-b border-white/10'
      >
        <TabsTrigger
          value='gallery'
          className='gap-2 py-3 text-zinc-400 data-active:text-white'
        >
          <Grid3X3 className='size-4' />
          Gallery
        </TabsTrigger>
        <TabsTrigger
          value='saved'
          className='gap-2 py-3 text-zinc-400 data-active:text-white'
        >
          <Bookmark className='size-4' />
          Saved
        </TabsTrigger>
      </TabsList>

      <TabsContent value='gallery'>
        {postsQuery.isLoading && <LoadingState text='Mengambil gallery...' />}

        {postsQuery.isError && <ErrorState text='Gallery gagal dimuat.' />}

        {!postsQuery.isLoading && !postsQuery.isError && posts.length === 0 && (
          <EmptyGalleryState />
        )}

        {!postsQuery.isLoading && !postsQuery.isError && posts.length > 0 && (
          <ProfilePostGrid posts={posts} />
        )}
      </TabsContent>

      <TabsContent value='saved'>
        <PostCollection
          queryKey={['me', 'saved']}
          queryFn={() => getMySavedPosts(1, 20)}
          loadingText='Mengambil post tersimpan...'
          errorText='Saved gagal dimuat.'
          emptyText='Belum ada post yang kamu simpan.'
          variant='profile'
        />
      </TabsContent>
    </Tabs>
  );
}
