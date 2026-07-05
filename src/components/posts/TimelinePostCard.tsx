import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { dayjs } from '@/lib/dayjs';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { Post } from '@/types/post';

export function TimelinePostCard({ post }: { post: Post }) {
  return (
    <article className='border-b border-white/10 pb-8'>
      <Link
        href={`/users/${post.author.username}`}
        className='mb-3 flex items-center gap-3'
      >
        <Image
          src={post.author.avatarUrl || DEFAULT_AVATAR}
          alt={post.author.name}
          width={42}
          height={42}
          className='size-[42px] rounded-full object-cover'
        />

        <div>
          <p className='text-sm font-semibold text-white'>{post.author.name}</p>
          <p className='text-xs text-zinc-500'>{dayjs(post.createdAt).fromNow()}</p>
        </div>
      </Link>

      <Link href={`/posts/${post.id}`}>
        <Image
          src={post.imageUrl}
          alt={post.caption || 'Post image'}
          width={760}
          height={760}
          className='aspect-square w-full rounded-[4px] object-cover'
        />
      </Link>

      <div className='mt-3 flex items-center justify-between text-white'>
        <div className='flex items-center gap-4'>
          <span className='flex items-center gap-1 text-xs text-zinc-300'>
            <Heart className={`size-5 ${post.likedByMe ? 'fill-red-500 text-red-500' : ''}`} />
            {post.likeCount}
          </span>
          <span className='flex items-center gap-1 text-xs text-zinc-300'>
            <MessageCircle className='size-5' />
            {post.commentCount}
          </span>
          <span className='flex items-center gap-1 text-xs text-zinc-300'>
            <Send className='size-5' />
            20
          </span>
        </div>

        <Bookmark className='size-5' />
      </div>

      <div className='mt-3 space-y-1'>
        <Link
          href={`/users/${post.author.username}`}
          className='text-sm font-semibold text-white'
        >
          {post.author.username}
        </Link>
        {post.caption ? (
          <p className='line-clamp-2 text-sm leading-6 text-zinc-300'>
            {post.caption}
          </p>
        ) : null}
        {post.caption && post.caption.length > 120 ? (
          <Link href={`/posts/${post.id}`} className='text-xs text-violet-400'>
            Show More
          </Link>
        ) : null}
      </div>
    </article>
  );
}
