import { useState } from 'react';
import { JAWA_GRAINS } from '../data/karamData';
import { JawaGrain } from '../types';
import { Wheat, Sparkles, Sprout, Info } from 'lucide-react';

export function JawaGrainsSection() {
  const [selectedGrain, setSelectedGrain] = useState<JawaGrain>(JAWA_GRAINS[0]);

  return (
    <section id="jawa-grains" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CA8A04]/15 text-[#854D0E] text-xs font-bold uppercase tracking-wider">
            <Wheat className="w-3.5 h-3.5" />
            <span>Nao Anaaj (Nine Sacred Grains)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            The Living Bio-Indicators of Jawa
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            Nine distinct grain varieties are carefully mixed and sown in the river sand. Each represents an essential dimension of nutrition, soil replenishment, and biodiversity.
          </p>
        </div>

        {/* Interactive Grid of 9 Grains */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {JAWA_GRAINS.map((grain) => {
            const isSelected = grain.id === selectedGrain.id;
            return (
              <button
                key={grain.id}
                onClick={() => setSelectedGrain(grain)}
                className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#FFFDFB] border-[#8C271E] shadow-md ring-2 ring-[#8C271E]/20 scale-105'
                    : 'bg-[#F5EDE1]/60 border-[#DECFBD] hover:bg-[#FFFDFB] hover:border-[#B45309]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: grain.colorTag }}
                >
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#2C241E]">
                    {grain.name}
                  </div>
                  <div className="text-[11px] text-[#7A6455] font-cultural">
                    {grain.hindiName.split(' ')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Spotlight of the selected grain */}
        <div className="mt-8 bg-[#FFFDFB] rounded-3xl p-6 sm:p-8 border border-[#E6DDD0] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: selectedGrain.colorTag }}
              >
                {selectedGrain.name}
              </span>
              <span className="text-xs text-[#705E51] font-mono italic">
                {selectedGrain.botanicalName}
              </span>
              <span className="text-xs font-cultural text-[#8C271E] font-medium ml-auto">
                {selectedGrain.hindiName}
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-[#241B15]">
              {selectedGrain.symbolicValue}
            </h3>

            <p className="text-sm sm:text-base text-[#59473A] leading-relaxed">
              {selectedGrain.significance}
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#FAF4EB] p-5 rounded-2xl border border-[#E3D6C5] flex flex-col justify-center space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8C271E]">
              <Info className="w-3.5 h-3.5" />
              <span>Indigenous Agricultural Wisdom</span>
            </div>
            <p className="text-xs text-[#635144] leading-relaxed">
              If the <strong>{selectedGrain.name}</strong> shoots sprout thick, golden, and tall within 7 days, tribal elders forecast an abundant harvest for this variety in the winter season.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
