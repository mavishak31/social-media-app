import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { MyProfile, UpdateProfilePayload } from '@/types/profile';

export async function getMyProfile() {
  const response = await api.get<ApiResponse<MyProfile>>('/api/me');

  return response.data.data;
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  const response = await api.patch<ApiResponse<MyProfile>>('/api/me', payload);

  return response.data.data;
}
