import { X, Sparkles, Heart } from 'lucide-react';
import jhumurGirlsImage from '../assets/images/jhumur_girls_johar_1789671654763.jpg';

interface JoharModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoharModal({ isOpen, onClose }: JoharModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="johar-modal-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="johar-modal-card"
        className="relative w-full max-w-xl bg-[#0C1E10] text-[#E8F5E9] rounded-3xl border border-[#2D6A4F]/60 shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          id="johar-modal-close-btn"
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs border border-white/20"
          aria-label="Close Johar Greeting"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cultural Image of 10 Girls in Jhumur Dress */}
        <div className="relative w-full aspect-16/9 overflow-hidden bg-[#14361B]">
          <img
            src={jhumurGirlsImage}
            alt="10 young tea garden tribal girls in traditional Jhumur dance dress wishing Johar at Karam Puja Akhra"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E10] via-transparent to-black/30" />

          {/* Floating Traditional Badge */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C4D25]/90 border border-[#52B788]/60 text-[#D8F3DC] text-[11px] font-bold backdrop-blur-sm shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E3A857]" />
              Sacred Karam Akhra Salutation
            </span>
            <span className="text-[11px] text-white/80 font-medium bg-black/50 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              ঝুমুৰ নৃত্য সাজপাৰ
            </span>
          </div>
        </div>

        {/* Modal Body: One Word "Johar" in English & Assamese */}
        <div className="p-5 sm:p-7 text-center space-y-4">
          {/* The One Word Greeting: Johar (English) & জোহাৰ (Assamese) */}
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-widest text-[#74C69D] font-bold">
              Sacred Indigenous Salutation • পবিত্ৰ অভিবাদন
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#D8F3DC] via-[#E3A857] to-[#95D5B2] drop-shadow-sm">
              Johar &bull; জোহাৰ
            </h2>
            <div className="text-lg font-serif italic text-[#C7E9C0]">
              &ldquo;জোহার!&rdquo; (Johar!)
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#B7E4C7] leading-relaxed max-w-lg mx-auto">
            Welcome to the official digital heritage portal of <strong>Karam Utsav</strong>.
            May the blessings of <em>Karam Raja</em> and Mother Nature bring peace, bumper harvest, and prosperity to all our tea garden brothers and sisters.
          </p>

          <div className="py-2 px-4 rounded-2xl bg-[#14361B]/80 border border-[#2D6A4F] text-xs text-[#D8F3DC] flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-[#E3A857] shrink-0" />
            <span>
              Respectful greetings from the 10 young Jhumur dancers in traditional red-bordered sarees.
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="button"
              id="johar-modal-enter-btn"
              onClick={onClose}
              className="w-full sm:w-auto min-w-[200px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#1C4D25] hover:from-[#40916C] hover:to-[#2D6A4F] text-[#E8F5E9] font-bold text-sm shadow-lg shadow-black/40 border border-[#52B788]/40 transition-all cursor-pointer inline-flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Johar! Enter Portal</span>
              <span className="text-[#A7E8BD]">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
