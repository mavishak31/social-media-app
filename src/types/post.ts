import type { Pagination } from './pagination';
import type { UserSummary } from './user';

// =======================
// Post Entity
// =======================
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
  isSavedByMe?: boolean;
  likedAt?: string;
}

// Create Post
export interface CreatePostPayload {
  image: File;
  caption?: string;
}

export interface PostsResponse {
  items: Post[];
  pagination: Pagination;
}
