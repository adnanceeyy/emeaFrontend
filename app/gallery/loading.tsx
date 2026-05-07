export default function GalleryLoading() {
  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 space-y-4">
          <div className="h-12 w-48 bg-gray-100 animate-shimmer"></div>
          <div className="h-6 w-96 bg-gray-100 animate-shimmer"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-50 border border-white relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
