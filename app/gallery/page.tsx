import GalleryGrid from '@/components/GalleryGrid';

async function getGallery() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 space-y-6">
          <div className="inline-block px-3 py-1 bg-[#55CF9A]/10 border border-[#55CF9A]/20">
            <span className="text-[10px] font-black text-[#55CF9A] uppercase tracking-[0.4em]">Visual Archive</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Gallery.
          </h1>
          <p className="text-lg text-gray-400 font-bold max-w-2xl">
            A minimalist showcase of our specialized environment and school life.
          </p>
        </div>

        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-gray-50">
            <p className="text-gray-300 font-black tracking-[0.5em] uppercase text-xs">No records available</p>
          </div>
        )}
      </div>
    </div>
  );
}
