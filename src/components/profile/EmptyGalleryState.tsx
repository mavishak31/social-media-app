import Link from 'next/link';

export function EmptyGalleryState() {
  return (
    <div className='flex min-h-[320px] flex-col items-center justify-center text-center'>
      <h3 className='text-sm font-bold text-white'>Your story starts here</h3>
      <p className='mt-2 max-w-sm text-xs leading-5 text-zinc-500'>
        Share your first post and let the world see your moments, passions, and
        memories. Make this space truly yours.
      </p>
      <Link
        href='/posts/create'
        className='mt-5 rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500'
      >
        Upload My First Post
      </Link>
    </div>
  );
}
