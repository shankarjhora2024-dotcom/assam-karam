import { Trees, Sparkles, BookCheck, Feather } from 'lucide-react';
import { EBookEdition } from '../data/ebookEditions';

interface BookCoverProps {
  edition: EBookEdition;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export function BookCover({ edition, size = 'md' }: BookCoverProps) {
  const isEnglish = edition.id === 'english';

  const containerSizes = {
    xs: 'w-20 h-28',
    sm: 'w-28 h-38 sm:w-32 sm:h-44',
    md: 'w-36 h-50 sm:w-44 sm:h-60',
    lg: 'w-48 h-66 sm:w-56 sm:h-76'
  };

  return (
    <div className={`relative ${containerSizes[size]} select-none shrink-0 group perspective-1000`}>
      {/* 3D Book Shadow */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black/40 rounded-r-xl rounded-l-xs blur-md group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-300"></div>

      {/* Pages edge effect on the right */}
      <div className="absolute top-1 right-[-4px] bottom-1 w-3 bg-[#EDE6D6] rounded-r-sm shadow-inner border-r border-[#C8BCA4] flex flex-col justify-between py-1">
        <div className="h-full w-full bg-[repeating-linear-gradient(to_bottom,#EDE6D6_0px,#EDE6D6_2px,#DDD3BE_2px,#DDD3BE_3px)]"></div>
      </div>

      {/* Main Hardcover Body */}
      <div 
        className={`relative h-full w-full rounded-r-xl rounded-l-xs shadow-xl overflow-hidden border border-white/20 bg-gradient-to-br ${edition.coverTheme.bgGradient} flex flex-col justify-between p-3 sm:p-4 text-white transition-transform duration-300 group-hover:-translate-y-1`}
      >
        {/* Book Spine Highlight Bar on the Left */}
        <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-r from-black/60 via-black/20 to-white/10 border-r border-white/10"></div>

        {/* Glossy Diagonal Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none"></div>

        {/* Top Header & Crest */}
        <div className="pl-3 relative z-10 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase text-[#F4D06F] font-mono">
              OFFICIAL MONOGRAPH
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/15 text-white border border-white/20">
              ₹{edition.priceINR}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[8px] text-[#95D5B2] font-semibold tracking-wider uppercase">
            <Feather className="w-2.5 h-2.5 text-[#F4D06F]" />
            <span>Karam Utsav Archives</span>
          </div>
        </div>

        {/* Center Artwork & Title */}
        <div className="pl-3 my-auto relative z-10 text-center py-2">
          {/* Circular Motif Emblem */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-[#F4D06F]/15 border border-[#F4D06F]/50 flex items-center justify-center mb-2 shadow-inner">
            <Trees className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4D06F]" />
          </div>

          <h4 className="font-display font-bold text-xs sm:text-sm text-white leading-tight tracking-wide drop-shadow-sm px-1">
            {isEnglish ? (
              <>
                The Sacred <br />
                <span className="text-[#F4D06F]">Karam Festival</span>
              </>
            ) : (
              <>
                কৰম পূজা আৰু <br />
                <span className="text-[#F4D06F]">চাহ জনগোষ্ঠীৰ ঐতিহ্য</span>
              </>
            )}
          </h4>

          <div className="w-12 h-[1px] bg-[#F4D06F]/50 mx-auto my-1.5"></div>

          <p className="text-[8px] sm:text-[9px] text-[#D8F3DC] font-light leading-snug line-clamp-2 px-1">
            {edition.coverSubtitle}
          </p>
        </div>

        {/* Bottom Bar: Barcode / Language / Authenticity Seal */}
        <div className="pl-3 relative z-10 pt-1 border-t border-white/15 flex items-center justify-between text-[8px] text-[#B7E4C7]">
          <span className="font-bold tracking-wider text-white">
            {edition.nativeLabel}
          </span>
          <span className="font-mono text-[7px] text-[#F4D06F] opacity-90">
            ISBN 978-KU-2026
          </span>
        </div>
      </div>
    </div>
  );
}
