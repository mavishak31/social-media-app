import type { UserSummary } from './user';

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  author: UserSummary;
}
