'use client';

import { AuthGuard } from '@/components/guards/AuthGuard';
import { PrivateNavbar } from '@/components/layout/PrivateNavbar';
import { FloatingBottomNav } from '@/components/layout/FloatingBottomNav';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className='min-h-screen bg-black text-white'>
        <PrivateNavbar />
        {children}
        <FloatingBottomNav />
      </div>
    </AuthGuard>
  );
}
