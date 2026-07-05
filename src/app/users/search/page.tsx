import Link from 'next/link';
import { Suspense } from 'react';
import { LoadingState } from '@/components/states/LoadingState';
import { UserSearch } from '@/features/users/UserSearch';

export default function UserSearchPage() {
  return (
    <main className='min-h-screen bg-black px-4 py-8 text-white'>
      <div className='mx-auto max-w-3xl space-y-6'>
        <Link href='/timeline' className='text-sm text-violet-400 hover:text-violet-300'>
          Back to timeline
        </Link>

        <div>
          <h1 className='text-3xl font-bold'>Search Users</h1>
          <p className='text-sm text-zinc-400'>
            Cari user berdasarkan name atau username.
          </p>
        </div>

        <Suspense fallback={<LoadingState text='Menyiapkan search...' />}>
          <UserSearch />
        </Suspense>
      </div>
    </main>
  );
}
