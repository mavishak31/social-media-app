import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { dayjs } from '@/lib/dayjs';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { Post } from '@/types/post';

export function PostDetail({ post }: { post: Post }) {
  return (
    <article className='overflow-hidden rounded-lg border border-white/10 bg-zinc-950'>
      <Image
        src={post.imageUrl}
        alt={post.caption || 'Post image'}
        width={1200}
        height={900}
        className='max-h-[720px] w-full object-cover'
      />

      <div className='space-y-4 p-5'>
        <Link
          href={`/users/${post.author.username}`}
          className='flex items-center gap-3'
        >
          <Image
            src={post.author.avatarUrl || DEFAULT_AVATAR}
            alt={post.author.name}
            width={44}
            height={44}
            className='size-11 rounded-full object-cover'
          />

          <div>
            <p className='font-semibold text-white'>{post.author.name}</p>
            <p className='text-sm text-zinc-500'>
              @{post.author.username} • {dayjs(post.createdAt).fromNow()}
            </p>
          </div>
        </Link>

        {post.caption ? <p className='text-sm text-zinc-300'>{post.caption}</p> : null}

        <div className='flex items-center gap-4 text-sm text-zinc-400'>
          <span className='flex items-center gap-1'>
            <Heart className='size-4' />
            {post.likeCount} likes
          </span>
          <span className='flex items-center gap-1'>
            <MessageCircle className='size-4' />
            {post.commentCount} comments
          </span>
        </div>
      </div>
    </article>
  );
}
