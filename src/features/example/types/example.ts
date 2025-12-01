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
  isLiked?: boolean;
  isBookmarked?: boolean;
}
