import Link from 'next/link';
import { PostDetailView } from '@/features/posts/PostDetailView';

export default function PostDetailPage() {
  return (
    <main className='min-h-screen bg-black px-4 py-8 text-white'>
      <div className='mx-auto max-w-3xl space-y-6'>
        <Link href='/timeline' className='text-sm text-violet-400 hover:text-violet-300'>
          Back to timeline
        </Link>

        <PostDetailView />
      </div>
    </main>
  );
}
