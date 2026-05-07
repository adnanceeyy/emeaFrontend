'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  _id: string;
  mediaUrl: string;
  type?: 'image' | 'video';
  caption?: string;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-2">
        {items.map((item, index) => {
          const displayUrl = item.mediaUrl.replace(
            'http://localhost:5000', 
            (process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')
          );
          
          return (
            <div 
              key={item._id} 
              onClick={() => openLightbox(index)}
              className="group relative aspect-square bg-gray-100 overflow-hidden border border-white cursor-pointer"
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video 
                    src={displayUrl} 
                    className="w-full h-full object-cover"
                    muted
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => {
                      const v = e.target as HTMLVideoElement;
                      v.pause();
                      v.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <img 
                  src={displayUrl} 
                  alt={item.caption || 'Gallery Image'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              )}
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white" size={24} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-black/40 p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                <p className="text-white text-[8px] font-bold uppercase tracking-widest text-center">{item.caption || 'Expand'}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-6 right-6 z-[110]">
            <button onClick={closeLightbox} className="p-4 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            {/* Nav Buttons */}
            <button 
              onClick={prevImage}
              className="absolute left-0 z-[110] p-4 md:p-6 bg-white/10 hover:bg-white text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] group">
              {items[selectedIndex].type === 'video' ? (
                <video 
                  src={items[selectedIndex].mediaUrl.replace(
                    'http://localhost:5000', 
                    (process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')
                  )} 
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img 
                  src={items[selectedIndex].mediaUrl.replace(
                    'http://localhost:5000', 
                    (process.env.NEXT_PUBLIC_API_URL || '').replace('/api', '')
                  )} 
                  alt="Selected"
                  className="w-full h-full object-contain"
                />
              )}
              <div className="absolute -bottom-16 left-0 right-0 text-center space-y-2">
                <p className="text-xs font-black text-[#55CF9A] uppercase tracking-[0.3em]">
                  {selectedIndex + 1} / {items.length}
                </p>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter">
                  {items[selectedIndex].caption || 'School Activity'}
                </h2>
              </div>
            </div>

            <button 
              onClick={nextImage}
              className="absolute right-0 z-[110] p-4 md:p-6 bg-white/10 hover:bg-white text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
