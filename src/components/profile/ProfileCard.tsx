import Image from 'next/image';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { MyProfile } from '@/types/profile';

const stats = ['posts', 'followers', 'following', 'likes', 'saved'] as const;

export function ProfileCard({ profile }: { profile: MyProfile }) {
  return (
    <section className='rounded-lg border border-white/10 bg-zinc-950 p-5'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <Image
          src={profile.avatarUrl || DEFAULT_AVATAR}
          alt={profile.name}
          width={72}
          height={72}
          className='size-[72px] rounded-full object-cover'
        />

        <div>
          <h1 className='text-2xl font-bold text-white'>{profile.name}</h1>
          <p className='text-sm text-zinc-400'>@{profile.username}</p>
          <p className='mt-2 text-sm text-zinc-300'>
            {profile.bio || 'Belum ada bio.'}
          </p>
        </div>
      </div>

      <div className='mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5'>
        {stats.map((key) => (
          <div key={key} className='rounded-md bg-white/5 p-3 text-center'>
            <p className='text-lg font-bold text-white'>
              {profile.stats?.[key] ?? 0}
            </p>
            <p className='text-xs capitalize text-zinc-500'>{key}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
