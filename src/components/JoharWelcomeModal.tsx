import { X } from 'lucide-react';
import jhumurGirlsImage from '../assets/images/jhumur_girls_johar_1789671654763.jpg';

interface JoharWelcomeModalProps {
  isOpenExternal: boolean;
  onCloseExternal: () => void;
}

export function JoharWelcomeModal({
  isOpenExternal,
  onCloseExternal,
}: JoharWelcomeModalProps) {
  if (!isOpenExternal) return null;

  return (
    <div
      id="johar-welcome-overlay"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onCloseExternal}
    >
      <div
        id="johar-welcome-card"
        className="relative w-full max-w-md sm:max-w-lg bg-[#0C1E10] text-[#E8F5E9] rounded-2xl sm:rounded-3xl border border-[#2D6A4F] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onCloseExternal}
          id="johar-modal-close-btn"
          className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs border border-white/25 shadow-md active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Traditional Jhumur Cultural Dress Image */}
        <div className="relative w-full h-56 sm:h-72 shrink-0 overflow-hidden bg-[#14361B]">
          <img
            src={jhumurGirlsImage}
            alt="Johar জোহাৰ"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1E10] via-transparent to-black/20" />
        </div>

        {/* Only Johar Word in English & Assamese */}
        <div className="p-4 sm:p-6 text-center space-y-3">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#D8F3DC] via-[#E3A857] to-[#95D5B2] drop-shadow-sm">
            Johar &bull; জোহাৰ
          </h2>

          <button
            type="button"
            id="johar-modal-action-btn"
            onClick={onCloseExternal}
            className="w-full py-2.5 sm:py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#1C4D25] hover:from-[#40916C] hover:to-[#2D6A4F] text-[#E8F5E9] font-bold text-base sm:text-lg shadow-lg border border-[#52B788]/40 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Johar &bull; জোহাৰ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

