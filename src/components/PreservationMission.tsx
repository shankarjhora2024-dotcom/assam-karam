import { PRESERVATION_PROJECT } from '../data/karamData';
import { Trees, Mic, Users, HeartHandshake, ArrowUpRight } from 'lucide-react';

interface MissionProps {
  onOpenInvolved: () => void;
}

export function PreservationMission({ onOpenInvolved }: MissionProps) {
  const icons = [Trees, Mic, Users];

  return (
    <section id="mission" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-xs font-bold uppercase tracking-wider">
            <Trees className="w-3.5 h-3.5" />
            <span>karamutsav.org Heritage Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            Preserving Sacred Groves & Oral Traditions
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            As urbanization rapidly expands, the Karam Utsav Cultural Project works on the ground to preserve the living ecology and ancestral folklore of Chotanagpur.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PRESERVATION_PROJECT.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDFB] p-6 rounded-2xl border border-[#E6DDD0] text-center shadow-xs hover:shadow-sm transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#8C271E]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#665548] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESERVATION_PROJECT.pillars.map((pillar, idx) => {
            const Icon = icons[idx] || Trees;
            return (
              <div
                key={idx}
                className="bg-[#FFFDFB] p-6 sm:p-8 rounded-3xl border border-[#E6DDD0] shadow-sm flex flex-col justify-between space-y-4 hover:border-[#8C271E] transition-colors"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F2E8DC] text-[#8C271E] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#241B15]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#665548] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout action */}
        <div className="mt-12 bg-gradient-to-r from-[#8C271E] to-[#A83226] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-display font-bold">
              Join the Sacred Karam Tree Plantation Drive
            </h3>
            <p className="text-sm text-[#FEE2E2] max-w-xl">
              Pledge to plant and protect a Karam sapling in your village, educational institution, or sacred grove. Help restore ecological canopy cover.
            </p>
          </div>
          <button
            onClick={onOpenInvolved}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#FDE047] hover:bg-[#FACC15] text-[#241B15] font-bold text-sm shadow cursor-pointer transition-all hover:scale-105"
          >
            Pledge a Karam Sapling
          </button>
        </div>

      </div>
    </section>
  );
}
