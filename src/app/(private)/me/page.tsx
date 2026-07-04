'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/api/profile';
import { EditProfileForm } from '@/components/profile/EditProfileForm';
import { ProfileCard } from '@/components/profile/ProfileCard';

export default function MePage() {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMyProfile,
  });

  return (
    <main className='mx-auto max-w-3xl px-4 py-8'>
      {query.isLoading ? <p>Loading profile...</p> : null}

      {query.isError ? (
        <p className='text-red-400'>Gagal memuat profile.</p>
      ) : null}

      {query.data ? (
        <>
          <ProfileCard profile={query.data} />
          <EditProfileForm profile={query.data} />
        </>
      ) : null}
    </main>
  );
}
