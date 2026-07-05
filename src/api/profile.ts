import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { MyProfile, UpdateProfilePayload } from '@/types/profile';

export async function getMyProfile() {
  const response = await api.get<ApiResponse<MyProfile>>('/api/me');

  return response.data.data;
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  const formData = new FormData();

  // API profile
  Object.entries(payload).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });

  const response = await api.patch<ApiResponse<MyProfile>>(
    '/api/me',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.data;
}
