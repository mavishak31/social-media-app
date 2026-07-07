'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/api/profile';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { MyProfileTabs } from '@/features/profile/MyProfileTabs';

export default function MePage() {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMyProfile,
  });

  return (
    <main className='mx-auto max-w-5xl px-4 py-10'>
      {query.isLoading ? <p>Loading profile...</p> : null}

      {query.isError ? <p className='text-red-400'>Gagal memuat profile.</p> : null}

      {query.data ? (
        <>
          <ProfileCard profile={query.data} />
          <MyProfileTabs username={query.data.username} />
        </>
      ) : null}
    </main>
  );
}
