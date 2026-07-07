import { Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { MyProfile } from '@/types/profile';

export function ProfileCard({ profile }: { profile: MyProfile }) {
  const stats = [
    { label: 'Post', value: profile.stats?.posts ?? profile.counts?.post ?? 0 },
    {
      label: 'Followers',
      value: profile.stats?.followers ?? profile.counts?.followers ?? 0,
    },
    {
      label: 'Following',
      value: profile.stats?.following ?? profile.counts?.following ?? 0,
    },
    {
      label: 'Likes',
      value: profile.stats?.likes ?? profile.counts?.likes ?? 0,
    },
  ];

  return (
    <section className='mx-auto max-w-3xl bg-black'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex items-center gap-4'>
          <Image
            src={profile.avatarUrl || DEFAULT_AVATAR}
            alt={profile.name || 'Profile Avatar'}
            width={72}
            height={72}
            className='size-[72px] rounded-full object-cover'
          />

          <div>
            <h1 className='text-lg font-bold text-white'>
              {profile.name || 'My Profile'}
            </h1>
            <p className='text-sm text-zinc-400'>
              @{profile.username || 'username'}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Link
            href='/me/edit'
            className='rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10'
          >
            Edit Profile
          </Link>
          <button
            type='button'
            className='flex size-10 items-center justify-center rounded-full border border-white/10 text-white'
            aria-label='Share profile'
          >
            <Send className='size-4' />
          </button>
        </div>
      </div>

      <p className='mt-4 text-sm leading-6 text-zinc-300'>
        {profile.bio || 'Belum ada bio.'}
      </p>

      <div className='mt-6 grid grid-cols-4'>
        {stats.map((item, index) => (
          <div
            key={item.label}
            className={`text-center ${index < stats.length - 1 ? 'border-r border-white/10' : ''}`}
          >
            <p className='text-lg font-bold text-white'>{item.value}</p>
            <p className='text-xs text-zinc-500'>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
