import type { User } from '@/types/user';

export interface Example {
  id: string;
  type: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
  created_at: string;
  thumbnail: string;
  tags?: string[];
}

export interface ExampleAuthor {
  id: User['id'];
  nickname: User['nickname'];
  avatar_url: User['avatar_url'];
}

export interface ExampleDetails extends Example {
  author: ExampleAuthor;
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export type UserRelation = {
  user_id: string;
};

export interface RawExample extends Example {
  users: ExampleAuthor;
  comments: { count: number }[];
  likes: { count: number }[];
  user_like: UserRelation[];
  user_bookmark: UserRelation[];
}
