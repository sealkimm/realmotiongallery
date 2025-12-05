import type { User } from '@/types/user';

export interface Comment {
  id: string;
  content: string;
  example_id: string;
  user_id: string;
  parent_id?: string;
  created_at: string;
  replies?: CommentWithUser[];
}

export interface CommentWithUser extends Comment {
  author: User;
}
