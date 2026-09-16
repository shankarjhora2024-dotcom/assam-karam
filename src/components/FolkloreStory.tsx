import { useState } from 'react';
import { LEGEND_CHAPTERS } from '../data/karamData';
import { BookOpen, Sparkles, ChevronRight, Bookmark, Award } from 'lucide-react';

export function FolkloreStory() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const chapter = LEGEND_CHAPTERS[activeChapterIndex];

  return (
    <section id="legend" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Karam Katha (Ancient Oral Epic)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            The Legend of Karma & Dharma
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            Recited by the village priest during the first watch of the festive night, this eternal story contrasts honest physical toil against superficial vanity.
          </p>
        </div>

        {/* Chapter Navigator Pill Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {LEGEND_CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#8C271E] text-white border-[#8C271E] shadow-md shadow-[#8C271E]/20 scale-102'
                    : 'bg-[#FFFDFB] text-[#5A493D] border-[#DECFBE] hover:bg-[#F2E8DC]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-[#FDE047]' : 'text-[#8C271E]'}`} />
                <span>Chapter {ch.order}: {ch.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Reading Board */}
        <div className="mt-8 bg-[#FFFDFB] rounded-3xl p-6 sm:p-12 border border-[#E6DDD0] shadow-sm max-w-4xl mx-auto space-y-8">
          
          {/* Chapter Header */}
          <div className="border-b border-[#EFE5D8] pb-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#B45309] font-bold uppercase tracking-widest">
              <span>Chapter {chapter.order} of {LEGEND_CHAPTERS.length}</span>
              <span>{chapter.subtitle}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#241B15]">
              {chapter.title}
            </h3>
            <p className="text-sm sm:text-base text-[#7A6455] italic font-medium pt-1">
              "{chapter.summary}"
            </p>
          </div>

          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-[#3D2E24] text-base sm:text-lg leading-relaxed font-serif">
            {chapter.storyText.map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Moral Takeaway Callout */}
          <div className="bg-[#FAF4EB] p-5 sm:p-6 rounded-2xl border border-[#E0D2BF] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8C271E] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Award className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C271E]">
                Timeless Cultural Wisdom
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#2C241E]">
                {chapter.moralLesson}
              </p>
            </div>
          </div>

          {/* Navigation footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EFE5D8]">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => setActiveChapterIndex((p) => Math.max(0, p - 1))}
              className="text-xs font-bold text-[#6D5A4D] hover:text-[#8C271E] disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Previous Chapter
            </button>
            <span className="text-xs text-[#9E8B7C]">
              {activeChapterIndex + 1} / {LEGEND_CHAPTERS.length}
            </span>
            <button
              disabled={activeChapterIndex === LEGEND_CHAPTERS.length - 1}
              onClick={() => setActiveChapterIndex((p) => Math.min(LEGEND_CHAPTERS.length - 1, p + 1))}
              className="text-xs font-bold text-[#6D5A4D] hover:text-[#8C271E] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
