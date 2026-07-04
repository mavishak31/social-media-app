import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api';
import type { AuthData, LoginPayload, RegisterPayload } from '@/types/auth';

export async function login(payload: LoginPayload) {
  const response = await api.post<ApiResponse<AuthData>>(
    '/api/auth/login',
    payload
  );

  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await api.post<ApiResponse<AuthData>>(
    '/api/auth/register',
    payload
  );

  return response.data;
}
