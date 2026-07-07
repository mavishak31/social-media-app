import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { UserSummary } from '@/types/user';
import { FollowButton } from './FollowButton';

export function UserCard({ user }: { user: UserSummary }) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-zinc-950 p-4'>
      <Link href={`/users/${user.username}`} className='flex min-w-0 items-center gap-3'>
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

      <div className='shrink-0'>
        <FollowButton
          username={user.username}
          isFollowing={user.isFollowedByMe}
          isMe={user.isMe}
        />
      </div>
    </div>
  );
}
