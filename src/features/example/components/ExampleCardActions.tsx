import type { MouseEventHandler } from 'react';
import { Bookmark, Heart, MessageCircle } from 'lucide-react';

interface ExampleCardActionsProps {
  handleLike: MouseEventHandler<HTMLButtonElement>;
  handleBookmark: MouseEventHandler<HTMLButtonElement>;
  handleComment: MouseEventHandler<HTMLButtonElement>;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}
const ExampleCardActions = ({
  handleLike,
  handleBookmark,
  handleComment,
  likeCount,
  isLiked,
  isBookmarked,
}: ExampleCardActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={handleLike}
        className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-red-500"
      >
        <Heart
          size={16}
          className={isLiked ? 'fill-red-500 text-red-500' : ''}
        />
        <span className="text-sm">{likeCount}</span>
      </button>
      <button
        type="button"
        onClick={handleComment}
        className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-blue-500"
      >
        <MessageCircle size={16} />
        <span className="text-sm">24</span>
      </button>
      <button
        type="button"
        onClick={handleBookmark}
        className="flex items-center gap-1 p-1 text-gray-400 transition-colors hover:text-yellow-500"
      >
        <Bookmark
          size={16}
          className={isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}
        />
      </button>
    </div>
  );
};

export default ExampleCardActions;
