import { useState, useEffect } from 'react';
import { X, Trees, Heart, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

interface JoharWelcomeModalProps {
  onExploreEBook?: () => void;
}

export const JOHAR_SEEN_KEY = 'karam_utsav_johar_shown';

export function JoharWelcomeModal({ onExploreEBook }: JoharWelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if shown in current session
    const hasSeen = sessionStorage.getItem(JOHAR_SEEN_KEY);
    if (!hasSeen) {
      // Short delay for smooth natural entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(JOHAR_SEEN_KEY, 'true');
    setIsOpen(false);
  };

  const handleSoundAndEnter = () => {
    try {
      soundEngine.playMandarBass();
      setTimeout(() => soundEngine.playMandarSlap(), 120);
    } catch {
      // Audio fallback
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="johar-welcome-overlay"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div
        id="johar-welcome-card"
        className="bg-[#FFFFFF] rounded-3xl overflow-hidden max-w-md w-full border border-[#C5DEC5] shadow-2xl relative text-[#14361B] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-[#0E2A14] via-[#1C4D25] to-[#0E2A14] p-6 text-center text-white relative border-b border-[#2D6A4F]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Johar greeting"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#2D6A4F] to-[#14361B] border-2 border-[#95D5B2]/40 flex items-center justify-center shadow-lg mb-3">
            <Trees className="w-8 h-8 text-[#95D5B2]" />
          </div>

          <span className="inline-block px-3 py-0.5 rounded-full bg-[#52B788]/20 text-[#D8F3DC] border border-[#52B788]/30 text-[11px] font-bold tracking-widest uppercase mb-1">
            প্ৰকৃতি বন্দনা • Nature Worship
          </span>

          <h2 className="text-3xl sm:text-4xl font-cultural font-bold text-[#F4D06F] tracking-wide">
            जोहार! • Johar!
          </h2>
          <p className="text-xs text-[#D8F3DC] font-medium mt-1">
            Welcome to Karam Utsav Heritage Portal
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm sm:text-base font-semibold text-[#14361B] leading-snug">
              &ldquo;May the sacred Karam King bless your home with good harvest, health, brotherhood, and joy.&rdquo;
            </p>
            <p className="text-xs text-[#2E4F34] leading-relaxed">
              We welcome you to celebrate the sacred traditions, Jhumair melodies, and living culture of the Tea Garden Tribes of Assam, Dooars, Terai, and Chotanagpur.
            </p>
          </div>

          {/* Quick Features Highlights */}
          <div className="bg-[#F4F8F4] p-3 rounded-2xl border border-[#D5E5D5] flex items-center justify-around text-[11px] text-[#1C4D25] font-semibold">
            <span>🌿 Sacred Karam Puja</span>
            <span>•</span>
            <span>🥁 Madal Rhythms</span>
            <span>•</span>
            <span>📖 Bilingual E-Book</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              id="johar-enter-website-btn"
              onClick={handleSoundAndEnter}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Enter Website • প্ৰৱেশ কৰক</span>
              <ArrowRight className="w-4 h-4 text-[#95D5B2]" />
            </button>

            <button
              onClick={handleClose}
              className="w-full text-xs font-semibold text-[#4D7C55] hover:text-[#1C4D25] py-1 cursor-pointer transition-colors"
            >
              Continue to Home Page
            </button>
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="bg-[#EDF4ED] py-2 px-4 text-center text-[11px] text-[#4D7C55] border-t border-[#D5E5D5]">
          karamutsav.org • Dedicated to Tea Tribe Ancestors &amp; Folklore
        </div>
      </div>
    </div>
  );
}
