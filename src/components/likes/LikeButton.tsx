'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { likePost, unlikePost } from '@/api/likes';

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
  onOpenLikes,
}: {
  postId: number;
  initialLiked?: boolean;
  initialCount: number;
  onOpenLikes?: () => void;
}) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(Boolean(initialLiked));
  const [count, setCount] = useState(initialCount);

  const mutation = useMutation({
    mutationFn: () => (liked ? unlikePost(postId) : likePost(postId)),
    onMutate: () => {
      setLiked((value) => !value);
      setCount((value) => value + (liked ? -1 : 1));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['likes', postId] });
    },
    onError: () => {
      setLiked((value) => !value);
      setCount((value) => value + (liked ? 1 : -1));
      toast.error('Like gagal diproses');
    },
  });

  return (
    <div className='flex items-center gap-1 text-xs text-zinc-300'>
      <button
        type='button'
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        aria-label={liked ? 'Unlike post' : 'Like post'}
      >
        <Heart className={`size-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
      </button>
      <button type='button' onClick={onOpenLikes} className='hover:text-white'>
        {count}
      </button>
    </div>
  );
}
