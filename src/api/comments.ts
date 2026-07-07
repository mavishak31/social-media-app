import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Comment } from '@/types/comment';
import type { Pagination } from '@/types/pagination';

export async function getPostComments(postId: number, page = 1, limit = 10) {
  const response = await api.get<
    ApiResponse<{ comments: Comment[]; pagination: Pagination }>
  >(`/api/posts/${postId}/comments`, {
    params: { page, limit },
  });

  return response.data.data;
}

export async function addComment(postId: number, text: string) {
  const response = await api.post<ApiResponse<Comment>>(
    `/api/posts/${postId}/comments`,
    { text }
  );

  return response.data.data;
}

export async function deleteComment(commentId: number) {
  const response = await api.delete<ApiResponse<null>>(
    `/api/comments/${commentId}`
  );

  return response.data;
}
