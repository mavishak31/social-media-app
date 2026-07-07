'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function PasswordInput(props: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`${props.className ?? ''} pr-10`}
      />

      {/* Tombol show password */}
      <button
        type='button'
        onClick={() => setShowPassword((value) => !value)}
        className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white'
        aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
      >
        {showPassword ? (
          <EyeOff className='size-4' />
        ) : (
          <Eye className='size-4' />
        )}
      </button>
    </div>
  );
}
