'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getPostLikes } from '@/api/likes';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DEFAULT_AVATAR } from '@/lib/images';
import { FollowButton } from '@/components/users/FollowButton';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';

export function LikesModal({
  postId,
  open,
  onOpenChange,
}: {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const query = useQuery({
    queryKey: ['likes', postId],
    queryFn: () => getPostLikes(postId),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-white/10 bg-zinc-950 text-white sm:max-w-[440px]'>
        <DialogTitle>Likes</DialogTitle>

        {query.isLoading ? <LoadingState text='Mengambil data likes...' /> : null}

        {query.data?.users.length === 0 ? (
          <EmptyState text='Belum ada yang like post ini.' />
        ) : null}

        {query.data?.users.length ? (
          <div className='max-h-[420px] space-y-4 overflow-y-auto pr-1'>
            {query.data.users.map((user) => (
              <div key={user.id} className='flex items-center justify-between gap-3'>
                <Link href={`/users/${user.username}`} className='flex min-w-0 items-center gap-3'>
                  <Image
                    src={user.avatarUrl || DEFAULT_AVATAR}
                    alt={user.name}
                    width={44}
                    height={44}
                    className='size-11 rounded-full object-cover'
                  />
                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold'>{user.name}</p>
                    <p className='truncate text-xs text-zinc-500'>@{user.username}</p>
                  </div>
                </Link>

                <FollowButton
                  username={user.username}
                  isFollowing={user.isFollowedByMe}
                  isMe={user.isMe}
                />
              </div>
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
