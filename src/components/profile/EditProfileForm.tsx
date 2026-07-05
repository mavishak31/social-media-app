'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateMyProfile } from '@/api/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_AVATAR } from '@/lib/images';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import type { MyProfile } from '@/types/profile';

export function EditProfileForm({ profile }: { profile: MyProfile }) {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(profile.avatarUrl || DEFAULT_AVATAR);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      username: profile.username,
      phone: profile.phone ?? '',
      bio: profile.bio ?? '',
      avatarUrl: profile.avatarUrl ?? '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setApiError(message ?? 'Update profile gagal');
    },
  });

  function handleAvatarChange(file?: File) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setApiError('Ukuran foto maksimal 5MB.');
      return;
    }

    setApiError('');
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(values: ProfileFormValues) {
    mutation.mutate({
      ...values,
      avatarUrl: avatar ? undefined : values.avatarUrl,
      avatar: avatar ?? undefined,
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className='mt-6 space-y-4 rounded-lg border border-white/10 bg-zinc-950 p-5'
    >
      <h2 className='text-lg font-bold text-white'>Edit Profile</h2>

      {apiError ? <p className='text-sm text-red-400'>{apiError}</p> : null}

      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <Image
          src={preview}
          alt='Preview profile'
          width={88}
          height={88}
          className='size-[88px] rounded-full object-cover'
          unoptimized={preview.startsWith('blob:')}
        />

        <label className='block flex-1 space-y-2'>
          <span className='text-sm font-semibold text-white'>Profile Picture</span>
          <input
            type='file'
            accept='image/png,image/jpeg,image/webp'
            onChange={(event) => handleAvatarChange(event.target.files?.[0])}
            className='block w-full cursor-pointer rounded-lg border border-white/10 bg-black text-sm text-zinc-300 file:mr-4 file:border-0 file:bg-violet-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white'
          />
        </label>
      </div>

      {/* Input ubah data profile */}
      <Input
        placeholder='Name'
        {...form.register('name')}
        className='h-11 bg-black text-white'
      />
      <Input
        placeholder='Username'
        {...form.register('username')}
        className='h-11 bg-black text-white'
      />
      <Input
        placeholder='Phone'
        {...form.register('phone')}
        className='h-11 bg-black text-white'
      />
      <Input
        placeholder='Avatar URL'
        {...form.register('avatarUrl')}
        className='h-11 bg-black text-white'
      />
      <Textarea
        placeholder='Bio'
        {...form.register('bio')}
        className='min-h-24 bg-black text-white'
      />

      <Button
        disabled={mutation.isPending}
        className='h-11 rounded-full bg-violet-600 px-6 text-white hover:bg-violet-500'
      >
        {mutation.isPending ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}
