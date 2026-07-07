'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { savePost, unsavePost } from '@/api/saves';

export function SaveButton({
  postId,
  initialSaved,
}: {
  postId: number;
  initialSaved?: boolean;
}) {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(Boolean(initialSaved));

  const mutation = useMutation({
    mutationFn: () => (saved ? unsavePost(postId) : savePost(postId)),
    onMutate: () => {
      setSaved((value) => !value);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'saved'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success(saved ? 'Post berhasil disimpan' : 'Post dihapus dari saved');
    },
    onError: () => {
      setSaved((value) => !value);
      toast.error('Save gagal diproses');
    },
  });

  return (
    <button
      type='button'
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      aria-label={saved ? 'Unsave post' : 'Save post'}
      className='text-white'
    >
      <Bookmark className={`size-5 ${saved ? 'fill-white' : ''}`} />
    </button>
  );
}
