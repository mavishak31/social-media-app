'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { getMyProfile } from '@/api/profile';
import { APP_LOGO, DEFAULT_AVATAR } from '@/lib/images';
import { LogoutButton } from '@/features/auth/LogoutButton';

export function PrivateNavbar() {
  const router = useRouter();
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

        <div className='flex items-center gap-3'>
          <Link href='/posts' className='hidden text-sm text-zinc-300 hover:text-white lg:block'>
            Posts
          </Link>
          <Link href='/users/search' className='hidden text-sm text-zinc-300 hover:text-white lg:block'>
            Users
          </Link>
          <Link href='/me' className='flex items-center gap-3'>
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
          </Link>
          <LogoutButton />
        </div>
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
