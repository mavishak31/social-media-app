import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { Pagination } from '@/types/pagination';
import type { Post } from '@/types/post';

export async function getFeed(page = 1, limit = 10) {
  const response = await api.get<
    ApiResponse<{ items: Post[]; pagination: Pagination }>
  >('/api/feed', {
    params: { page, limit },
  });

  return response.data.data;
}
