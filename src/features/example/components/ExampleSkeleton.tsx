interface ExampleSkeletonProps {
  count: number;
}

const ExampleSkeleton = ({ count }: ExampleSkeletonProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`loading-${index}`}
          className="rounded-xl bg-gray-900 p-[2px]"
        >
          <div className="overflow-hidden rounded-xl bg-gray-900">
            <div className="h-40 w-full animate-pulse bg-muted"></div>
            <div className="p-6">
              <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted" />
              <div className="mt-4 flex items-center gap-3 border-t border-gray-800 pt-4">
                <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExampleSkeleton;
