const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="w-16 h-16 border-4 border-t-yellow-500 border-b-yellow-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-300 text-sm text-center">
        Loading movies...
      </p>
    </div>
  );
};

export default Loader;
