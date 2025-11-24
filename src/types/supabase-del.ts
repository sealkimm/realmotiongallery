export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          nickname: string | null;
          avatar_url: string | null;
          created_at: string;
        };
      };
      examples: {
        Row: {
          id: number;
          title: string;
          type: string;
          thumbnail_url: string | null;
          created_at: string;
        };
      };
      likes: {
        Row: {
          id: number;
          user_id: string;
          example_id: number;
        };
      };
      bookmarks: {
        Row: {
          id: number;
          user_id: string;
          example_id: number;
        };
      };
    };
  };
};
