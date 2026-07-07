import Link from 'next/link';
import { PublicProfile } from '@/features/users/PublicProfile';

export default function PublicProfilePage() {
  return (
    <main className='min-h-screen bg-black px-4 py-8 text-white'>
      <div className='mx-auto max-w-5xl space-y-6'>
        <Link href='/users/search' className='text-sm text-violet-400 hover:text-violet-300'>
          Back to search
        </Link>

        <PublicProfile />
      </div>
    </main>
  );
}
