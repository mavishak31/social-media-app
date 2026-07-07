'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserFollowers, getUserFollowing } from '@/api/follow';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { EmptyState } from '@/components/states/EmptyState';
import { LoadingState } from '@/components/states/LoadingState';
import { UserCard } from './UserCard';

export function FollowListModal({
  username,
  type,
  open,
  onOpenChange,
}: {
  username: string;
  type: 'followers' | 'following';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const query = useQuery({
    queryKey: ['users', username, type],
    queryFn: () =>
      type === 'followers'
        ? getUserFollowers(username)
        : getUserFollowing(username),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='border-white/10 bg-zinc-950 text-white sm:max-w-[520px]'>
        <DialogTitle>{type === 'followers' ? 'Followers' : 'Following'}</DialogTitle>

        {query.isLoading ? <LoadingState text='Mengambil data user...' /> : null}

        {query.data?.users.length === 0 ? (
          <EmptyState text='Belum ada data user.' />
        ) : null}

        {query.data?.users.length ? (
          <div className='max-h-[480px] space-y-3 overflow-y-auto pr-1'>
            {query.data.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
