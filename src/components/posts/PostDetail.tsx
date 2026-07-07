'use client';

import { MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LikeButton } from '@/components/likes/LikeButton';
import { LikesModal } from '@/components/likes/LikesModal';
import { SaveButton } from '@/components/saves/SaveButton';
import { dayjs } from '@/lib/dayjs';
import { DEFAULT_AVATAR } from '@/lib/images';
import type { Post } from '@/types/post';

export function PostDetail({ post }: { post: Post }) {
  const [likesOpen, setLikesOpen] = useState(false);

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

        <div className='flex items-center justify-between text-sm text-zinc-400'>
          <div className='flex items-center gap-4'>
            <LikeButton
              postId={post.id}
              initialLiked={post.likedByMe}
              initialCount={post.likeCount}
              onOpenLikes={() => setLikesOpen(true)}
            />
            <span className='flex items-center gap-1'>
              <MessageCircle className='size-5' />
              {post.commentCount}
            </span>
            <span className='flex items-center gap-1'>
              <Send className='size-5' />
              20
            </span>
          </div>

          <SaveButton
            postId={post.id}
            initialSaved={post.savedByMe || post.isSavedByMe}
          />
        </div>
      </div>

      <LikesModal postId={post.id} open={likesOpen} onOpenChange={setLikesOpen} />
    </article>
  );
}
