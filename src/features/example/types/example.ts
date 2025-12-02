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
  like_count: number;
}

export interface ExampleWithInteractions extends Example {
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface ExampleUser {
  nickname: User['nickname'];
  avatar_url: User['avatar_url'];
}

export interface ExampleLike {
  user_id: string;
}

export interface ExampleBookmark {
  user_id: string;
}

export interface ExampleWithRelations extends Example {
  users: ExampleUser;
  likes: ExampleLike[];
  bookmarks: ExampleBookmark[];
}

export interface ExampleFull
  extends ExampleWithRelations, ExampleWithInteractions {}
