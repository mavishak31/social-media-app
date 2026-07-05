import type { UserSummary } from './user';

export interface Post {
  id: number;
  imageUrl: string;
  caption: string | null;
  createdAt: string;
  author: UserSummary;
  likeCount: number;
  commentCount: number;
  likedByMe?: boolean;
  savedByMe?: boolean;
}

export interface CreatePostPayload {
  image: File;
  caption?: string;
}
