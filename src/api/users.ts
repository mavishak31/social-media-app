import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';
import type { PublicUserProfile, UserSummary } from '@/types/user';

export async function searchUsers(params: {
  q: string;
  page?: number;
  limit?: number;
}) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >('/api/users/search', { params });

  return response.data.data;
}

export async function getPublicProfile(username: string) {
  const response = await api.get<ApiResponse<PublicUserProfile>>(
    `/api/users/${username}`
  );

  return response.data.data;
}

export async function getUserPosts(username: string, page = 1, limit = 12) {
  const response = await api.get<
    ApiResponse<{ posts: Post[]; pagination: Pagination }>
  >(`/api/users/${username}/posts`, {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getUserLikedPosts(username: string, page = 1, limit = 12) {
  const response = await api.get<
    ApiResponse<{ posts: Post[]; pagination: Pagination }>
  >(`/api/users/${username}/likes`, {
    params: { page, limit },
  });

  return response.data.data;
}
