export interface UserSummary {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isFollowedByMe?: boolean;
}

export interface PublicUserProfile extends UserSummary {
  bio?: string | null;
  email?: string;
  phone?: string | null;
  counts?: {
    post?: number;
    followers?: number;
    following?: number;
    likes?: number;
  };
  isFollowing?: boolean;
  isMe?: boolean;
}
