'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPost } from '@/api/posts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function CreatePostForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState('');
  const [formError, setFormError] = useState('');

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.replace('/timeline');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setFormError(message ?? 'Post gagal dibuat.');
    },
  });

  function handleImageChange(file?: File) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Ukuran gambar maksimal 5MB.');
      return;
    }

    setFormError('');
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!image) {
      setFormError('Gambar wajib dipilih.');
      return;
    }

    mutation.mutate({ image, caption });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-5 rounded-lg border border-white/10 bg-zinc-950 p-5'
    >
      {formError ? <p className='text-sm text-red-400'>{formError}</p> : null}

      <label className='block space-y-2'>
        <span className='text-sm font-semibold text-white'>Image</span>
        <input
          type='file'
          accept='image/png,image/jpeg,image/webp'
          onChange={(event) => handleImageChange(event.target.files?.[0])}
          className='block w-full cursor-pointer rounded-lg border border-white/10 bg-black text-sm text-zinc-300 file:mr-4 file:border-0 file:bg-violet-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white'
        />
      </label>

      {preview ? (
        <Image
          src={preview}
          alt='Preview post'
          width={800}
          height={800}
          className='aspect-square w-full rounded-lg object-cover'
          unoptimized
        />
      ) : null}

      <label className='block space-y-2'>
        <span className='text-sm font-semibold text-white'>Caption</span>
        <Textarea
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          placeholder='Write caption...'
          className='min-h-28 bg-black text-white'
        />
      </label>

      <Button
        type='submit'
        disabled={mutation.isPending}
        className='h-11 w-full rounded-full bg-violet-600 text-white hover:bg-violet-500'
      >
        {mutation.isPending ? 'Uploading...' : 'Create Post'}
      </Button>
    </form>
  );
}
