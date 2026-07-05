import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { UserSummary } from '@/types/user';

export function UserCard({ user }: { user: UserSummary }) {
  return (
    <Link
      href={`/users/${user.username}`}
      className='flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950 p-4 hover:bg-zinc-900'
    >
      <Image
        src={user.avatarUrl || DEFAULT_AVATAR}
        alt={user.name}
        width={48}
        height={48}
        className='size-12 rounded-full object-cover'
      />

      <div className='min-w-0'>
        <p className='truncate font-semibold text-white'>{user.name}</p>
        <p className='truncate text-sm text-zinc-400'>@{user.username}</p>
      </div>
    </Link>
  );
}
