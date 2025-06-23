export const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col h-full bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="w-full bg-gray-300 dark:bg-gray-600 aspect-[2/3]"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="flex items-center justify-between mt-auto text-sm">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};