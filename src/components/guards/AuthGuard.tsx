'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token, isReady } = useSelector((state: RootState) => state.auth);

  // Kalau belum login, user dilempar ke halaman login
  useEffect(() => {
    if (isReady && !token) {
      router.replace('/login');
    }
  }, [isReady, token, router]);

  if (!isReady) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        Loading...
      </div>
    );
  }

  if (!token) return null;

  return children;
}
