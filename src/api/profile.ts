import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { MyProfile, UpdateProfilePayload } from '@/types/profile';
import type { PostsResponse } from '@/types/post';

type RawProfile = MyProfile & {
  user?: Partial<MyProfile>;
  profile?: Partial<MyProfile>;
};

function normalizeProfile(data: RawProfile): MyProfile {
  const source = {
    ...data,
    ...data.user,
    ...data.profile,
  };

  return {
    id: source.id ?? data.id,
    name: source.name ?? '',
    username: source.username ?? '',
    email: source.email ?? '',
    phone: source.phone ?? '',
    bio: source.bio ?? '',
    avatarUrl: source.avatarUrl ?? null,
    stats: source.stats,
    counts: source.counts,
  };
}

export async function getMyProfile() {
  const response = await api.get<ApiResponse<RawProfile>>('/api/me');

  return normalizeProfile(response.data.data);
}

export async function getMyPosts(page = 1, limit = 12) {
  const response = await api.get<ApiResponse<PostsResponse>>('/api/me/posts', {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
}

export async function updateMyProfile(payload: UpdateProfilePayload) {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
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
