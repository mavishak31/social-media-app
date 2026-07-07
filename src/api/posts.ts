import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { CreatePostPayload, Post } from '@/types/post';

export async function getExplorePosts(page = 1, limit = 12) {
  const response = await api.get<
    ApiResponse<{ posts: Post[]; pagination: Pagination }>
  >('/api/posts', {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getPostDetail(id: number) {
  const response = await api.get<ApiResponse<Post>>(`/api/posts/${id}`);

  return response.data.data;
}

export async function createPost(payload: CreatePostPayload) {
  const formData = new FormData();

  formData.append('image', payload.image);

  if (payload.caption) {
    formData.append('caption', payload.caption);
  }

  const response = await api.post<ApiResponse<Post>>('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
}

export async function deletePost(id: number) {
  const response = await api.delete<ApiResponse<null>>(`/api/posts/${id}`);

  return response.data;
}
