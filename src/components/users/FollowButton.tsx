'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { followUser, unfollowUser } from '@/api/follow';
import { Button } from '@/components/ui/button';

export function FollowButton({
  username,
  isFollowing,
  isMe,
}: {
  username: string;
  isFollowing?: boolean;
  isMe?: boolean;
}) {
  const queryClient = useQueryClient();
  const [followed, setFollowed] = useState(Boolean(isFollowing));

  const mutation = useMutation({
    mutationFn: () => (followed ? unfollowUser(username) : followUser(username)),
    onMutate: () => {
      setFollowed((value) => !value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(followed ? 'Berhasil follow user' : 'Berhasil unfollow user');
    },
    onError: () => {
      setFollowed((value) => !value);
      toast.error('Aksi follow gagal');
    },
  });

  if (isMe) return null;

  return (
    <Button
      type='button'
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className={
        followed
          ? 'rounded-full border border-white/10 bg-black px-4 text-white hover:bg-white/10'
          : 'rounded-full bg-violet-600 px-5 text-white hover:bg-violet-500'
      }
    >
      {followed ? (
        <>
          <CheckCircle2 className='mr-2 size-4' />
          Following
        </>
      ) : (
        'Follow'
      )}
    </Button>
  );
}
