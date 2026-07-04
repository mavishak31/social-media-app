'use client';

import Link from 'next/link';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { LogoutButton } from '@/features/auth/LogoutButton';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className='min-h-screen bg-black text-white'>
        <header className='border-b border-white/10 bg-zinc-950/80'>
          <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-4'>
            <Link href='/timeline' className='text-lg font-bold'>
              Sociality
            </Link>

            <nav className='flex items-center gap-3 text-sm'>
              <Link href='/timeline' className='text-zinc-300 hover:text-white'>
                Timeline
              </Link>
              <Link href='/me' className='text-zinc-300 hover:text-white'>
                My Profile
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>

        {children}
      </div>
    </AuthGuard>
  );
}
