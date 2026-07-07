import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';

export async function savePost(postId: number) {
  const response = await api.post<ApiResponse<null>>(`/api/posts/${postId}/save`);

  return response.data;
}

export async function unsavePost(postId: number) {
  const response = await api.delete<ApiResponse<null>>(
    `/api/posts/${postId}/save`
  );

  return response.data;
}

export async function getMySavedPosts(page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ posts: Post[]; pagination: Pagination }>
  >('/api/me/saved', {
    params: { page, limit },
  });

  return response.data.data;
}
