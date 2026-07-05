'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QueryProvider } from './QueryProvider';
import { ReduxProvider } from './ReduxProvider';
import { hydrateSession } from '@/store/auth-slice';
import type { AppDispatch } from '@/store';

function SessionHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  // Ambil token supaya tetap login
  useEffect(() => {
    const token = localStorage.getItem('sociality_token');
    const savedUser = localStorage.getItem('sociality_user');
    const user = savedUser ? JSON.parse(savedUser) : null;

    dispatch(hydrateSession({ token, user }));
  }, [dispatch]);

  return children;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <SessionHydrator>{children}</SessionHydrator>
      </QueryProvider>
    </ReduxProvider>
  );
}
