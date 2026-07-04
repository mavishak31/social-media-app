export interface ProfileStats {
  posts?: number;
  followers?: number;
  following?: number;
  likes?: number;
  saved?: number;
}

export interface MyProfile {
  id: number;
  name: string;
  username: string;
  email?: string;
  phone?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  stats?: ProfileStats;
}

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
}
