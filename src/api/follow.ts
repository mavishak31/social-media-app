import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { UserSummary } from '@/types/user';

export async function followUser(username: string) {
  const response = await api.post<ApiResponse<null>>(`/api/follow/${username}`);

  return response.data;
}

export async function unfollowUser(username: string) {
  const response = await api.delete<ApiResponse<null>>(
    `/api/follow/${username}`
  );

  return response.data;
}

export async function getUserFollowers(username: string, page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >(`/api/users/${username}/followers`, {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getUserFollowing(username: string, page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >(`/api/users/${username}/following`, {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getMyFollowers(page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >('/api/me/followers', {
    params: { page, limit },
  });

  return response.data.data;
}

export async function getMyFollowing(page = 1, limit = 20) {
  const response = await api.get<
    ApiResponse<{ users: UserSummary[]; pagination: Pagination }>
  >('/api/me/following', {
    params: { page, limit },
  });

  return response.data.data;
}
