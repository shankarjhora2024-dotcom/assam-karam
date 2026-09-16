import { useState } from 'react';
import { GALLERY_ITEMS } from '../data/karamData';
import { GalleryItem } from '../types';
import { ImageIcon, X, MapPin, ZoomIn, Coffee } from 'lucide-react';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Akhra Dance', 'Rituals', 'Instruments', 'Attire & Jewelry'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FFFFFF] border-t border-[#D5E5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Tea Garden Palette */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C4D25]/10 text-[#1C4D25] border border-[#1C4D25]/20 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Visual Archives & Memories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#14361B] tracking-tight">
            Moments from the Sacred Akhra
          </h2>
          <p className="text-base sm:text-lg text-[#2E4F34] leading-relaxed">
            Witness the living colors of Karam Puja: tea garden women in white-and-red sarees, earthen Madal drums, sacred Jawa baskets, and midnight dance vigils.
          </p>
        </div>

        {/* Filter Tabs in Tea Garden Green Styling */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#1C4D25] text-white border-[#1C4D25] shadow-sm'
                  : 'bg-[#F4F8F4] text-[#14361B] border-[#D5E5D5] hover:bg-[#E1EDE1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative bg-[#F4F8F4] rounded-2xl overflow-hidden border border-[#D5E5D5] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col hover:border-[#1C4D25]"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#0A200E]">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-[#1C4D25] flex items-center justify-center shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#0A200E]/80 backdrop-blur-xs text-[#E8F5E9] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-[#14361B] group-hover:text-[#1C4D25] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#2E4F34] line-clamp-2 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#D5E5D5] flex items-center gap-1.5 text-[11px] text-[#2D6A4F] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Lightbox */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-[#FFFFFF] rounded-3xl overflow-hidden max-w-3xl w-full border border-[#D5E5D5] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-black overflow-hidden">
              <img
                src={activeModalItem.imageSrc}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="bg-[#E8F5E9] text-[#1C4D25] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {activeModalItem.category}
                </span>
                <span className="flex items-center gap-1 text-[#2E4F34] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#1C4D25]" />
                  <span>{activeModalItem.location}</span>
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-[#14361B]">
                {activeModalItem.title}
              </h3>

              <p className="text-sm text-[#2E4F34] leading-relaxed">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
