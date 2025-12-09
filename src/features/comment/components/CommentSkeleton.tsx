interface CommentSkeletonProps {
  count: number;
}

const CommentSkeleton = ({ count }: CommentSkeletonProps) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={`loading-${index}`} className="flex items-start gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-muted"></div>
          <div className="flex-1 pb-3 pt-1">
            <div className="animate-plus mb-4 h-4 w-20 rounded bg-muted"></div>
            <div className="mb-4">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-4">
              <div className="h-3 w-12 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;
