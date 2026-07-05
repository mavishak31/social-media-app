'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deletePost } from '@/api/posts';
import { Button } from '@/components/ui/button';

export function DeletePostButton({ postId }: { postId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.replace('/timeline');
    },
    onError: (err) => {
      const message = axios.isAxiosError(err) ? err.response?.data?.message : null;
      setError(message ?? 'Post gagal dihapus.');
    },
  });

  return (
    <div className='space-y-2'>
      {error ? <p className='text-sm text-red-400'>{error}</p> : null}
      <Button
        type='button'
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className='rounded-full bg-red-500/10 text-red-300 hover:bg-red-500/20'
      >
        <Trash2 className='mr-2 size-4' />
        {mutation.isPending ? 'Deleting...' : 'Delete Post'}
      </Button>
    </div>
  );
}
