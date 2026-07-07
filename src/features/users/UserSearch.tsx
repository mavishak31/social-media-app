'use client';

import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { searchUsers } from '@/api/users';
import { EmptyState } from '@/components/states/EmptyState';
import { ErrorState } from '@/components/states/ErrorState';
import { LoadingState } from '@/components/states/LoadingState';
import { Input } from '@/components/ui/input';
import { UserCard } from '@/components/users/UserCard';
import { useDebounce } from '@/lib/use-debounce';

export function UserSearch() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '');
  const debouncedKeyword = useDebounce(keyword.trim(), 500);

  const query = useQuery({
    queryKey: ['users', 'search', debouncedKeyword],
    queryFn: () => searchUsers({ q: debouncedKeyword, page: 1, limit: 12 }),
    enabled: debouncedKeyword.length > 0,
  });

  return (
    <section className='space-y-5'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500' />
        <Input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder='Search name or username'
          className='h-11 bg-zinc-950 pl-10 text-white'
        />
      </div>

      {!debouncedKeyword ? (
        <EmptyState text='Ketik nama atau username untuk mulai mencari user.' />
      ) : null}

      {query.isLoading ? <LoadingState text='Mencari user...' /> : null}
      {query.isError ? <ErrorState text='Gagal mencari user.' /> : null}

      {query.data?.users.length === 0 ? (
        <EmptyState text='User tidak ditemukan.' />
      ) : null}

      {query.data?.users.length ? (
        <div className='grid gap-3 sm:grid-cols-2'>
          {query.data.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
