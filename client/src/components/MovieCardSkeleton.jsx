const MovieCardSkeleton = () => {
  return (
    <div className="flex-shrink-0 w-40 md:w-52 lg:w-52 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <div className="w-full aspect-[2/3] animate-pulse bg-zinc-200 dark:bg-zinc-700" />

      <div className="p-3 flex flex-col gap-2">
        <div className="animate-pulse h-3 rounded bg-zinc-200 dark:bg-zinc-700 w-[90%]" />
        <div className="animate-pulse h-3 rounded bg-zinc-200 dark:bg-zinc-700 w-[65%]" />

        <div className="flex gap-2 mt-1">
          <div className="animate-pulse h-2.5 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="animate-pulse h-2.5 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;