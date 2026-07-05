'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginFormValues } from '@/schemas/login';
import { setSession } from '@/store/auth-slice';
import type { AppDispatch } from '@/store';
import { PasswordInput } from './PasswordInput';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [apiError, setApiError] = useState('');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { token, user } = response.data;

      localStorage.setItem('sociality_token', token);
      localStorage.setItem('sociality_user', JSON.stringify(user ?? null));
      dispatch(setSession({ token, user }));
      router.replace('/timeline');
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : null;

      setApiError(message ?? 'Email atau password salah');
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      className='space-y-4'
    >
      {apiError ? (
        <p className='rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400'>
          {apiError}
        </p>
      ) : null}

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Email</span>
        <Input
          placeholder='Enter your email'
          {...form.register('email')}
          className='h-11 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.email ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.email.message}
          </span>
        ) : null}
      </label>

      <label className='block space-y-2'>
        <span className='text-xs font-semibold text-white'>Password</span>
        <PasswordInput
          placeholder='Enter your password'
          {...form.register('password')}
          className='h-11 border-white/10 bg-zinc-950 text-white placeholder:text-zinc-600 focus-visible:border-violet-500'
        />
        {form.formState.errors.password ? (
          <span className='text-xs text-red-400'>
            {form.formState.errors.password.message}
          </span>
        ) : null}
      </label>

      <Button
        type='submit'
        disabled={mutation.isPending}
        className='h-11 w-full rounded-full bg-violet-600 font-semibold text-white hover:bg-violet-500'
      >
        {mutation.isPending ? 'Loading...' : 'Login'}
      </Button>

      <p className='text-center text-sm font-medium text-white'>
        Don&apos;t have an account?{' '}
        <Link href='/register' className='text-violet-400 hover:text-violet-300'>
          Register
        </Link>
      </p>
    </form>
  );
}
