import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { dayjs } from '@/lib/dayjs';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { Post } from '@/types/post';

export function PostCard({ post }: { post: Post }) {
  return (
    <article className='overflow-hidden rounded-lg border border-white/10 bg-zinc-950'>
      <Link href={`/posts/${post.id}`}>
        <Image
          src={post.imageUrl}
          alt={post.caption || 'Post image'}
          width={900}
          height={900}
          className='aspect-square w-full object-cover'
        />
      </Link>

      <div className='space-y-3 p-4'>
        <Link
          href={`/users/${post.author.username}`}
          className='flex items-center gap-3'
        >
          <Image
            src={post.author.avatarUrl || DEFAULT_AVATAR}
            alt={post.author.name}
            width={36}
            height={36}
            className='size-9 rounded-full object-cover'
          />

          <div className='min-w-0'>
            <p className='truncate text-sm font-semibold text-white'>
              {post.author.name}
            </p>
            <p className='truncate text-xs text-zinc-500'>
              @{post.author.username} • {dayjs(post.createdAt).fromNow()}
            </p>
          </div>
        </Link>

        {post.caption ? (
          <p className='line-clamp-3 text-sm text-zinc-300'>{post.caption}</p>
        ) : null}

        <div className='flex items-center gap-4 text-sm text-zinc-400'>
          <span className='flex items-center gap-1'>
            <Heart className='size-4' />
            {post.likeCount}
          </span>
          <span className='flex items-center gap-1'>
            <MessageCircle className='size-4' />
            {post.commentCount}
          </span>
        </div>
      </div>
    </article>
  );
}
