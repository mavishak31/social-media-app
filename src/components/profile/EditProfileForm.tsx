'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateMyProfile } from '@/api/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_AVATAR } from '@/lib/images';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import type { MyProfile } from '@/types/profile';

export function EditProfileForm({ profile }: { profile: MyProfile }) {
  const router = useRouter();
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
      toast.success('Profile Success Update');
      router.replace('/me');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setApiError(message ?? 'Update profile gagal');
      toast.error(message ?? 'Update profile gagal');
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
      name: values.name,
      username: values.username,
      phone: values.phone,
      bio: values.bio,
      avatarUrl: avatar ? undefined : values.avatarUrl,
      avatar: avatar ?? undefined,
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='mx-auto max-w-2xl space-y-5'>
      <Link href='/me' className='inline-flex items-center gap-2 text-sm font-semibold text-white'>
        <ArrowLeft className='size-4' />
        Edit Profile
      </Link>

      {apiError ? <p className='text-sm text-red-400'>{apiError}</p> : null}

      <div className='flex flex-col gap-5 sm:flex-row'>
        <div className='flex w-36 flex-col items-center gap-3'>
          <Image
            src={preview}
            alt='Preview profile'
            width={104}
            height={104}
            className='size-[104px] rounded-full object-cover'
            unoptimized={preview.startsWith('blob:')}
          />

          <label className='cursor-pointer rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10'>
            Change Photo
            <input
              type='file'
              accept='image/png,image/jpeg,image/webp'
              onChange={(event) => handleAvatarChange(event.target.files?.[0])}
              className='sr-only'
            />
          </label>
        </div>

        <div className='flex-1 space-y-4'>
          {/* Form ini untuk ubah data profile dari API /api/me */}
          <label className='block space-y-2'>
            <span className='text-xs font-semibold text-white'>Name</span>
            <Input
              placeholder={profile.name || 'John Doe'}
              {...form.register('name')}
              className='h-11 border-white/10 bg-zinc-950 text-white'
            />
            {form.formState.errors.name ? (
              <span className='text-xs text-red-400'>{form.formState.errors.name.message}</span>
            ) : null}
          </label>

          <label className='block space-y-2'>
            <span className='text-xs font-semibold text-white'>Username</span>
            <Input
              placeholder={profile.username || 'johndoe'}
              {...form.register('username')}
              className='h-11 border-white/10 bg-zinc-950 text-white'
            />
            {form.formState.errors.username ? (
              <span className='text-xs text-red-400'>{form.formState.errors.username.message}</span>
            ) : null}
          </label>

          <label className='block space-y-2'>
            <span className='text-xs font-semibold text-white'>Email</span>
            <Input
              value={profile.email || 'Email tidak tersedia dari API'}
              readOnly
              className='h-11 border-white/10 bg-zinc-950 text-white'
            />
          </label>

          <label className='block space-y-2'>
            <span className='text-xs font-semibold text-white'>Number Phone</span>
            <Input
              placeholder={profile.phone || '081234567890'}
              {...form.register('phone')}
              className='h-11 border-white/10 bg-zinc-950 text-white'
            />
          </label>

          <label className='block space-y-2'>
            <span className='text-xs font-semibold text-white'>Bio</span>
            <Textarea
              placeholder={profile.bio || 'Create your bio'}
              {...form.register('bio')}
              className='min-h-28 border-white/10 bg-zinc-950 text-white'
            />
            {form.formState.errors.bio ? (
              <span className='text-xs text-red-400'>{form.formState.errors.bio.message}</span>
            ) : null}
          </label>

          <Button
            disabled={mutation.isPending}
            className='h-11 w-full rounded-full bg-violet-600 text-white hover:bg-violet-500'
          >
            {mutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </form>
  );
}
