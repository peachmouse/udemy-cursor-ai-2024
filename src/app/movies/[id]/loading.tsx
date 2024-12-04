export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="h-[50vh] w-full bg-gray-800 animate-pulse" />
      <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
            <div className="h-8 bg-gray-800 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-800 rounded w-full animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
