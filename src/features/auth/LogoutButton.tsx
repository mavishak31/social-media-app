'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { clearSession } from '@/store/auth-slice';
import type { AppDispatch } from '@/store';

export function LogoutButton() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  function handleLogout() {
    localStorage.removeItem('sociality_token');
    localStorage.removeItem('sociality_user');
    dispatch(clearSession());
    router.replace('/login');
  }

  return (
    <Button
      type='button'
      onClick={handleLogout}
      className='h-9 rounded-full bg-white/10 px-4 text-white hover:bg-white/20'
    >
      <LogOut className='mr-2 size-4' />
      Logout
    </Button>
  );
}
