'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Smile, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { addComment, deleteComment, getPostComments } from '@/api/comments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dayjs } from '@/lib/dayjs';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { RootState } from '@/store';

const emojis = ['😊', '😂', '😍', '🔥', '👏', '✨', '😭', '😎', '💜', '👍'];

export function CommentsSection({
  postId,
  postAuthorUsername,
}: {
  postId: number;
  postAuthorUsername: string;
}) {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getPostComments(postId),
  });

  const addMutation = useMutation({
    mutationFn: () => addComment(postId, text),
    onSuccess: () => {
      setText('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      toast.success('Komentar berhasil ditambahkan');
    },
    onError: () => {
      toast.error('Komentar gagal ditambahkan');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      toast.success('Komentar berhasil dihapus');
    },
    onError: () => {
      toast.error('Komentar gagal dihapus');
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) return;

    addMutation.mutate();
  }

  return (
    <section className='rounded-lg border border-white/10 bg-zinc-950 p-5'>
      <h2 className='mb-5 text-lg font-bold text-white'>Comments</h2>

      {commentsQuery.data?.comments.length === 0 ? (
        <div className='py-10 text-center'>
          <p className='font-semibold text-white'>No Comments yet</p>
          <p className='text-sm text-zinc-500'>Start the conversation</p>
        </div>
      ) : null}

      <div className='space-y-4'>
        {commentsQuery.data?.comments.map((comment) => {
          const canDelete =
            user?.username === comment.author.username ||
            user?.username === postAuthorUsername;

          return (
            <div key={comment.id} className='flex gap-3 border-b border-white/10 pb-4'>
              <Image
                src={comment.author.avatarUrl || DEFAULT_AVATAR}
                alt={comment.author.name}
                width={36}
                height={36}
                className='size-9 rounded-full object-cover'
              />

              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <p className='text-sm font-semibold text-white'>
                      {comment.author.name}
                    </p>
                    <p className='text-xs text-zinc-500'>
                      {dayjs(comment.createdAt).fromNow()}
                    </p>
                  </div>

                  {canDelete ? (
                    <button
                      type='button'
                      onClick={() => deleteMutation.mutate(comment.id)}
                      className='text-zinc-500 hover:text-red-400'
                      aria-label='Delete comment'
                    >
                      <Trash2 className='size-4' />
                    </button>
                  ) : null}
                </div>

                <p className='mt-2 text-sm text-zinc-300'>{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className='relative mt-5 flex gap-2'>
        <button
          type='button'
          onClick={() => setShowEmoji((value) => !value)}
          className='flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:bg-white/10'
          aria-label='Pilih emoji'
        >
          <Smile className='size-5' />
        </button>

        {showEmoji ? (
          <div className='absolute bottom-12 left-0 grid grid-cols-5 gap-2 rounded-lg border border-white/10 bg-black p-3 shadow-xl'>
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type='button'
                onClick={() => setText((value) => `${value}${emoji}`)}
                className='text-lg'
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : null}

        <Input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder='Add Comment'
          className='h-10 flex-1 bg-black text-white'
        />
        <Button
          type='submit'
          disabled={addMutation.isPending || !text.trim()}
          className='h-10 rounded-full bg-violet-600 px-5 text-white hover:bg-violet-500'
        >
          Post
        </Button>
      </form>
    </section>
  );
}
