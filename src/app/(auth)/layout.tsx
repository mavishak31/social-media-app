import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_24%_86%,#6d28d9_0%,transparent_34%),radial-gradient(circle_at_85%_82%,#9333ea_0%,transparent_34%),#000] px-4 py-8'>
      <section className='w-full max-w-[420px] rounded-lg border border-white/10 bg-black/55 px-5 py-7 shadow-2xl backdrop-blur md:px-7'>
        <div className='mb-6 flex items-center justify-center gap-2'>
          <Image
            src='/images/logo.png'
            alt='Sociality logo'
            width={28}
            height={28}
            className='size-7'
            priority
          />
          <span className='text-lg font-semibold text-white'>Sociality</span>
        </div>

        {children}
      </section>
    </main>
  );
}
