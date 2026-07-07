import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from '@/providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sociality',
  description: 'Social Media App',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body className='min-h-full bg-black text-white'>
        <Providers>{children}</Providers>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
