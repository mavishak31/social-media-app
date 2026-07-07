import { CreatePostForm } from '@/features/posts/CreatePostForm';

export default function CreatePostPage() {
  return (
    <main className='mx-auto max-w-2xl space-y-6 px-4 py-8'>
      <div>
        <h1 className='text-3xl font-bold'>Create Post</h1>
        <p className='text-sm text-zinc-400'>
          Upload 1 gambar dan tulis caption.
        </p>
      </div>

      <CreatePostForm />
    </main>
  );
}
