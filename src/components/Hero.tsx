import { useState, useEffect } from 'react';
import { HERO_IMAGE, FESTIVAL_INFO } from '../data/karamData';
import { Calendar, BookOpen, Volume2, Trees, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

interface HeroProps {
  onOpenBuyEBook?: () => void;
  onOpenSoundboard?: () => void;
}

export function Hero({ onOpenBuyEBook, onOpenSoundboard }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const targetDate = new Date('2026-09-22T18:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickMandarStrike = () => {
    soundEngine.playMandarBass();
    setTimeout(() => soundEngine.playMandarSlap(), 140);
    if (onOpenSoundboard) {
      onOpenSoundboard();
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-14 lg:py-16 bg-gradient-to-b from-[#EDF4ED] via-[#F4F8F4] to-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Focused Narrative on Karam Puja */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C4D25]/10 border border-[#1C4D25]/25 text-[#1C4D25] text-xs font-semibold tracking-wide">
              <Trees className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Sacred Karam Puja • Tea Garden Tribes • karamutsav.org</span>
            </div>

            {/* Clean Main Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#14361B] tracking-tight leading-[1.15]">
                Celebrating the Sacred <br />
                <span className="text-[#2D6A4F]">Karam Puja</span>.
              </h1>
              <p className="text-base sm:text-lg text-[#2E4F34] max-w-2xl font-normal leading-relaxed pt-1">
                Karam Puja is the beloved ancestral festival of nature, harvest, and brotherhood celebrated with devotion across the tea gardens and villages of Assam, Dooars, and Chotanagpur. On Bhadrapada Ekadashi, communities plant sacred Karam branches at the village Akhra, offer sprouted golden Jawa seeds, and dance together in unity.
              </p>
            </div>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-[#1B4324]">
              <span className="px-3 py-1.5 rounded-lg bg-[#E1EDE1] border border-[#C5DEC5] flex items-center gap-1.5">
                🌿 Sacred Karam Tree (Haldina cordifolia)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#E1EDE1] border border-[#C5DEC5]">
                🌾 9-Grain Jawa Offering
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#E1EDE1] border border-[#C5DEC5]">
                🥁 Madal &amp; Jhumair Dance
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {onOpenBuyEBook && (
                <button
                  type="button"
                  onClick={onOpenBuyEBook}
                  id="hero-buy-ebook-btn"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1C4D25] hover:bg-[#14361B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#95D5B2]" />
                  <span>Buy E-Book (English ₹70 • Assamese ₹50)</span>
                </button>
              )}

              <a
                href="#gallery"
                id="hero-view-gallery-btn"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EDF4ED] text-[#14361B] font-semibold text-sm border border-[#C5DEC5] shadow-xs transition-all"
              >
                <span>View Photos</span>
              </a>

              <button
                type="button"
                onClick={handleQuickMandarStrike}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#EDF4ED] hover:bg-[#D8F3DC] text-[#1C4D25] font-semibold text-sm border border-[#C5DEC5] transition-all cursor-pointer"
                title="Tap to hear Madal drum sound"
              >
                <Volume2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Hear Madal Beat</span>
              </button>
            </div>

            {/* Festival Countdown */}
            <div id="festival-countdown-card" className="mt-4 pt-4 border-t border-[#D5E5D5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#EDF4ED] p-4 rounded-2xl border border-[#C5DEC5]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C4D25] uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Next Karam Celebration Date</span>
                  </div>
                  <div className="text-base font-bold text-[#14361B] mt-0.5">
                    {FESTIVAL_INFO.upcomingCelebration}
                  </div>
                  <div className="text-xs text-[#4D7C55]">
                    {FESTIVAL_INFO.tithi}
                  </div>
                </div>

                {/* Countdown Digit Blocks */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#C5DEC5] shadow-xs">
                    <span className="block text-lg sm:text-xl font-bold text-[#1C4D25] font-display">{timeLeft.days}</span>
                    <span className="text-[10px] text-[#4D7C55] font-semibold uppercase">Days</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#C5DEC5] shadow-xs">
                    <span className="block text-lg sm:text-xl font-bold text-[#1C4D25] font-display">{timeLeft.hours}</span>
                    <span className="text-[10px] text-[#4D7C55] font-semibold uppercase">Hours</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#C5DEC5] shadow-xs">
                    <span className="block text-lg sm:text-xl font-bold text-[#1C4D25] font-display">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-[#4D7C55] font-semibold uppercase">Mins</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#C5DEC5] shadow-xs">
                    <span className="block text-lg sm:text-xl font-bold text-[#1C4D25] font-display">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-[#4D7C55] font-semibold uppercase">Secs</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border-4 border-[#FFFFFF] shadow-xl bg-[#0E2A14]">
                <img
                  src={HERO_IMAGE}
                  alt="Karam Puja celebration in tea garden with dancers at the Akhra"
                  className="w-full h-80 sm:h-96 lg:h-[440px] object-cover hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Clean Photo Caption */}
                <div className="p-4 bg-[#0E2A14] text-[#E8F5E9] border-t border-[#1C4D25]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#95D5B2]">Sacred Karam Akhra Dance</span>
                    <span className="text-[#B7E4C7]">Tea Garden Heritage</span>
                  </div>
                  <p className="text-xs text-[#D8F3DC] mt-1">
                    Dancers join arm-in-arm in concentric circles around the sacred Karam branch to the heartbeat of the Madal drum.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
