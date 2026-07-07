import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';
import type { UserSummary } from '@/types/user';

export async function likePost(postId: number) {
  const response = await api.post<ApiResponse<null>>(`/api/posts/${postId}/like`);

  return response.data;
}

export async function unlikePost(postId: number) {
  const response = await api.delete<ApiResponse<null>>(
    `/api/posts/${postId}/like`
  );

  return response.data;
}

export async function getPostLikes(postId: number, page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >(`/api/posts/${postId}/likes`, {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getMyLikedPosts(page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ posts: Post[]; pagination: Pagination }>
  >('/api/me/likes', {
    params: { page, limit },
  });

  return response.data.data;
}
