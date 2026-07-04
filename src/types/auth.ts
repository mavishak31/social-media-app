export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface AuthData {
  token: string;
  user?: AuthUser;
}
