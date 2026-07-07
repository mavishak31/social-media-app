'use client';

import { useQuery } from '@tanstack/react-query';
import { LogOut, Search, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getMyProfile } from '@/api/profile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearSession } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { APP_LOGO, DEFAULT_AVATAR } from '@/lib/images';

export function PrivateNavbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [keyword, setKeyword] = useState('');

  const profileQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMyProfile,
  });

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = keyword.trim();

    if (value) {
      router.push(`/users/search?q=${encodeURIComponent(value)}`);
    }
  }

  function handleLogout() {
    localStorage.removeItem('sociality_token');
    localStorage.removeItem('sociality_user');
    dispatch(clearSession());
    router.replace('/login');
  }

  return (
    <header className='sticky top-0 z-40 border-b border-white/10 bg-black/95 backdrop-blur'>
      <div className='mx-auto flex h-[86px] max-w-7xl items-center justify-between gap-4 px-5 md:px-10'>
        <Link href='/timeline' className='flex items-center gap-3'>
          <Image src={APP_LOGO} alt='Sociality logo' width={34} height={34} />
          <span className='text-2xl font-bold text-white'>Sociality</span>
        </Link>

        <form onSubmit={handleSearch} className='hidden flex-1 justify-center md:flex'>
          <div className='relative w-full max-w-[520px]'>
            <Search className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500' />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder='Search'
              className='h-12 w-full rounded-full border border-white/10 bg-zinc-950 pl-12 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500'
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center gap-3 rounded-full px-2 py-1 outline-none hover:bg-white/5'>
            <Image
              src={profileQuery.data?.avatarUrl || DEFAULT_AVATAR}
              alt={profileQuery.data?.name || 'Profile'}
              width={44}
              height={44}
              className='size-11 rounded-full object-cover'
            />
            <span className='hidden font-semibold text-white sm:block'>
              {profileQuery.data?.name || 'My Profile'}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-44 border-white/10 bg-zinc-950 text-white'>
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href='/me'>
                <User className='mr-2 size-4' />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-white/10' />
            <DropdownMenuItem onClick={handleLogout} className='cursor-pointer text-red-300'>
              <LogOut className='mr-2 size-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <form onSubmit={handleSearch} className='border-t border-white/10 px-5 py-3 md:hidden'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-500' />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder='Search'
            className='h-10 w-full rounded-full border border-white/10 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500'
          />
        </div>
      </form>
    </header>
  );
}
