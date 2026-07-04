'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { register } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerSchema, type RegisterFormValues } from '@/schemas/register';
import { PasswordInput } from './PasswordInput';

export function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState('');

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.replace('/login');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setApiError(message ?? 'Register gagal, cek kembali datanya');
    },
  });

  function handleRegister(values: RegisterFormValues) {
    const payload = {
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    mutation.mutate(payload);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleRegister)}
      className='space-y-3'
    >
      {apiError ? (
        <p className='rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400'>
          {apiError}
        </p>
      ) : null}

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Name</span>
        <Input
          placeholder='Enter your name'
          {...form.register('name')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.name ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.name.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Username</span>
        <Input
          placeholder='Enter your username'
          {...form.register('username')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.username ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.username.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Email</span>
        <Input
          placeholder='Enter your email'
          {...form.register('email')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.email ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.email.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Number Phone</span>
        <Input
          placeholder='Enter your number phone'
          {...form.register('phone')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.phone ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.phone.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Password</span>
        <PasswordInput
          placeholder='Enter your password'
          {...form.register('password')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.password ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.password.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Confirm Password</span>
        <PasswordInput
          placeholder='Enter your confirm password'
          {...form.register('confirmPassword')}
          className='h-10 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.confirmPassword ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.confirmPassword.message}
          </span>
        ) : null}
      </label>

      <Button
        type='submit'
        disabled={mutation.isPending}
        className='h-11 w-full rounded-full bg-violet-600 font-semibold text-white hover:bg-violet-500'
      >
        {mutation.isPending ? 'Loading...' : 'Submit'}
      </Button>

      <p className='text-center text-sm font-medium text-white'>
        Already have an account?{' '}
        <Link href='/login' className='text-violet-400 hover:text-violet-300'>
          Log in
        </Link>
      </p>
    </form>
  );
}
