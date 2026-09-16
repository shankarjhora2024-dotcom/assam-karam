import { useState } from 'react';
import { SACRED_RITUALS, JAWA_IMAGE } from '../data/karamData';
import { Sparkles, Clock, CheckCircle2, ChevronRight, Layers, Sprout } from 'lucide-react';

export function RitualsSection() {
  const [selectedRitualIndex, setSelectedRitualIndex] = useState(0);
  const activeRitual = SACRED_RITUALS[selectedRitualIndex];

  return (
    <section id="rituals" className="py-16 sm:py-24 bg-[#F5EDE1]/60 border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Sacred Observances</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            The 7 Stages of Karam Utsav
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            From the quiet germination of riverbank seeds to the dawn immersion of sacred branches, every ritual embodies deep ecological reverence and familial affection.
          </p>
        </div>

        {/* Stepper navigation bar */}
        <div className="mt-10 overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex items-center gap-2 min-w-max mx-auto justify-center px-2">
            {SACRED_RITUALS.map((ritual, idx) => {
              const isActive = idx === selectedRitualIndex;
              return (
                <button
                  key={ritual.id}
                  onClick={() => setSelectedRitualIndex(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#8C271E] text-white border-[#8C271E] shadow-md shadow-[#8C271E]/20 scale-102'
                      : 'bg-[#FFFDFB] text-[#5A493D] border-[#DECFBE] hover:bg-[#F2E8DC]'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isActive ? 'bg-white text-[#8C271E]' : 'bg-[#EADDCF] text-[#5A493D]'
                  }`}>
                    {ritual.number}
                  </span>
                  <span>{ritual.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Ritual Detailed Showcase */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Detail card */}
          <div className="lg:col-span-7 bg-[#FFFDFB] p-6 sm:p-10 rounded-3xl border border-[#E6DDD0] shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Timing badge & Local name */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE5D8] pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C271E] bg-[#8C271E]/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeRitual.phase} • {activeRitual.dayTiming}</span>
                </div>
                <div className="font-cultural text-lg text-[#8C271E] font-medium">
                  {activeRitual.localName}
                </div>
              </div>

              {/* Title & Short Summary */}
              <div>
                <span className="text-xs font-bold text-[#B45309] tracking-widest uppercase">
                  Stage 0{activeRitual.number} of 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#241B15] mt-1">
                  {activeRitual.title}
                </h3>
                <p className="text-sm sm:text-base text-[#705E51] font-medium mt-2 leading-relaxed italic">
                  "{activeRitual.shortSummary}"
                </p>
              </div>

              {/* Full Cultural Description */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3B32]">
                  Ceremonial Flow & Traditions
                </h4>
                <p className="text-sm sm:text-base text-[#4A3B32] leading-relaxed">
                  {activeRitual.description}
                </p>
              </div>

              {/* Cultural Significance Box */}
              <div className="bg-[#FAF4EB] p-4 rounded-xl border border-[#E8DEC9]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C271E] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Spiritual & Ecological Significance</span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C493D] leading-relaxed">
                  {activeRitual.culturalSignificance}
                </p>
              </div>

            </div>

            {/* Sacred Items List */}
            <div className="pt-4 border-t border-[#EFE5D8]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#735F50] mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Sacred Ceremonial Offerings & Implements</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeRitual.symbolicItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F2E8DC] text-[#4A3B32] text-xs font-medium border border-[#DECFBD]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#8C271E]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Step navigation arrows */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EFE5D8]">
              <button
                disabled={selectedRitualIndex === 0}
                onClick={() => setSelectedRitualIndex((prev) => Math.max(0, prev - 1))}
                className="text-xs font-bold text-[#705E51] hover:text-[#8C271E] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ← Previous Stage
              </button>
              <span className="text-xs text-[#9E8B7C]">
                {selectedRitualIndex + 1} of {SACRED_RITUALS.length}
              </span>
              <button
                disabled={selectedRitualIndex === SACRED_RITUALS.length - 1}
                onClick={() => setSelectedRitualIndex((prev) => Math.min(SACRED_RITUALS.length - 1, prev + 1))}
                className="text-xs font-bold text-[#705E51] hover:text-[#8C271E] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual spotlight on Jawa basket & sacred rites */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="bg-[#241B15] text-[#FAF7F2] p-6 rounded-3xl border border-[#48392D] shadow-xl overflow-hidden relative">
              <div className="overflow-hidden rounded-2xl border-2 border-[#5E4839] mb-4">
                <img
                  src={JAWA_IMAGE}
                  alt="Traditional Jawa basket with golden seedlings and marigold flowers"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#FBBF24]">
                  <span className="font-semibold uppercase tracking-wider">The Sacred Jawa Basket</span>
                  <span>Bamboo & River Sand</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  The Miracle of Germinated Grains
                </h4>
                <p className="text-xs sm:text-sm text-[#D4C3B5] leading-relaxed">
                  Carefully woven from fresh forest bamboo and filled with virgin river sand, the Jawa basket is kept in a dark room and sung to each night. The pale yellow shoots symbolize newborn vitality, fertility of the womb, and green abundance.
                </p>
              </div>
            </div>

            {/* Quick Ritual Overview List */}
            <div className="bg-[#FFFDFB] p-5 rounded-2xl border border-[#E6DDD0] shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C271E] mb-3">
                Complete Timeline Summary
              </div>
              <ul className="space-y-2.5 text-xs text-[#524135]">
                {SACRED_RITUALS.map((r, i) => (
                  <li
                    key={r.id}
                    onClick={() => setSelectedRitualIndex(i)}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      i === selectedRitualIndex ? 'bg-[#F2E8DC] font-bold text-[#8C271E]' : 'hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#8C271E]/15 text-[#8C271E] flex items-center justify-center text-[10px]">
                        {r.number}
                      </span>
                      <span>{r.title}</span>
                    </span>
                    <span className="text-[11px] text-[#8A7667]">{r.phase}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
