import { FESTIVAL_EVENTS, FESTIVAL_INFO } from '../data/karamData';
import { Calendar, MapPin, Clock, Info, ShieldAlert, Sparkles } from 'lucide-react';

export function ScheduleSection() {
  const etiquetteRules = [
    'Leave footwear outside the consecrated circular boundary of the Akhra.',
    'Do not break twigs or step on the sacred Karam branches in the center.',
    'Everyone is welcome to link hands in the dance circle; move in harmony with the counter-clockwise rhythm.',
    'Photography must be respectful; avoid glaring flashlights directly into the eyes of drummers and dancers during rituals.'
  ];

  return (
    <section id="schedule" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Celebration Calendar & Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            Akhra Gatherings & Schedule
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            Karam Utsav is observed across hundreds of village Akhras, urban community centers, and diaspora assemblies worldwide. Find central celebrations and dates.
          </p>
        </div>

        {/* Central Upcoming Box */}
        <div className="mt-12 bg-gradient-to-br from-[#FAF4EB] to-[#F2E8DC] p-6 sm:p-8 rounded-3xl border border-[#DFCEBA] shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D8C6B2]">
            <div>
              <span className="text-xs font-bold text-[#8C271E] uppercase tracking-widest">
                Official Festival Tithi (2026)
              </span>
              <h3 className="text-2xl font-display font-bold text-[#241B15] mt-1">
                {FESTIVAL_INFO.upcomingCelebration}
              </h3>
              <p className="text-xs sm:text-sm text-[#705E51]">
                {FESTIVAL_INFO.tithi}
              </p>
            </div>
            <div className="bg-[#8C271E] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide self-start sm:self-center shadow-sm">
              All-Night Akhra Celebration
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-[#524236]">
            <div>
              <span className="font-bold block text-[#241B15]">Jawa Sowing Window</span>
              <span className="text-[#786455]">7–9 Days Prior (September 13–15)</span>
            </div>
            <div>
              <span className="font-bold block text-[#241B15]">Main Akhra Gathering</span>
              <span className="text-[#786455]">Sunset, September 22, 2026</span>
            </div>
            <div>
              <span className="font-bold block text-[#241B15]">River Immersion (Bhasan)</span>
              <span className="text-[#786455]">Dawn, September 23, 2026</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {FESTIVAL_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-[#FFFDFB] p-6 rounded-2xl border border-[#E6DDD0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-[#F2E8DC] text-[#8C271E] px-2.5 py-1 rounded-md font-bold">
                    {event.type}
                  </span>
                  <span className="text-[#786455] font-semibold">{event.region}</span>
                </div>
                
                <h4 className="text-xl font-display font-bold text-[#241B15]">
                  {event.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#665548] leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EFE5D8] space-y-2 text-xs text-[#524135]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8C271E] shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8C271E] shrink-0" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Akhra Etiquette Guidelines */}
        <div className="mt-12 bg-[#FFFDFB] p-6 sm:p-8 rounded-2xl border border-[#E6DDD0] max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C271E] uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#B45309]" />
            <span>Akhra Maryada (Sacred Visitor Etiquette)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#544336]">
            {etiquetteRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-[#FAF7F2] p-3 rounded-xl border border-[#EDE2D3]">
                <span className="w-5 h-5 rounded-full bg-[#8C271E]/10 text-[#8C271E] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
