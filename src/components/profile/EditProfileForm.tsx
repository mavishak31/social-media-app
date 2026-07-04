'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateMyProfile } from '@/api/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import type { MyProfile } from '@/types/profile';

export function EditProfileForm({ profile }: { profile: MyProfile }) {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState('');

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

  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      className='mt-6 space-y-4 rounded-lg border border-white/10 bg-zinc-950 p-5'
    >
      <h2 className='text-lg font-bold text-white'>Edit Profile</h2>

      {apiError ? <p className='text-sm text-red-400'>{apiError}</p> : null}

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
