'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@/api/profile';
import { EditProfileForm } from '@/components/profile/EditProfileForm';

export default function EditProfilePage() {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: getMyProfile,
  });

  return (
    <main className='mx-auto max-w-5xl px-4 py-10'>
      {query.isLoading ? <p>Loading profile...</p> : null}
      {query.isError ? <p className='text-red-400'>Gagal memuat profile.</p> : null}
      {query.data ? <EditProfileForm profile={query.data} /> : null}
    </main>
  );
}
