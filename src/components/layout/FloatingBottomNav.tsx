'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { House, Plus, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export function FloatingBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleHomeClick = async () => {
    // Jika bukan di halaman timeline
    if (!pathname.startsWith('/timeline')) {
      router.push('/timeline');
      return;
    }

    // Scroll ke paling atas
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Refresh data timeline
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ['feed'],
      }),
      queryClient.invalidateQueries({
        queryKey: ['explore'],
      }),
    ]);
  };

  return (
    <div
      className='
        fixed
        bottom-6
        left-1/2
        z-50
        -translate-x-1/2
      '
    >
      <div
        className='
          flex
          items-center
          gap-6
          rounded-full
          border
          border-white/10
          bg-zinc-950/90
          px-6
          py-4
          backdrop-blur-xl
          shadow-2xl
        '
      >
        {/* HOME */}
        <button
          onClick={handleHomeClick}
          className={`rounded-full p-3 transition ${
            pathname.startsWith('/timeline')
              ? 'bg-violet-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <House size={22} />
        </button>

        {/* CREATE POST */}
        <Link
          href='/posts/create'
          className='text-zinc-300 transition hover:text-white'
        >
          <Plus size={28} />
        </Link>

        {/* PROFILE */}
        <Link
          href='/me'
          className={`rounded-full p-3 transition ${
            pathname.startsWith('/me')
              ? 'bg-violet-600 text-white'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <User size={22} />
        </Link>
      </div>
    </div>
  );
}
