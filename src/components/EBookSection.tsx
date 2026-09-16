import { useState } from 'react';
import { EBOOK_CHAPTERS, TEA_GARDEN_EBOOK_INFO, EBookChapter } from '../data/ebookData';
import {
  BookOpen,
  Download,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Trees,
  Sparkles,
  Share2,
  Bookmark,
  Coffee
} from 'lucide-react';

export function EBookSection() {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const activeChapter: EBookChapter = EBOOK_CHAPTERS[activeChapterIndex];

  const handleDownloadEbook = () => {
    let fullText = `${TEA_GARDEN_EBOOK_INFO.title}\n`;
    fullText += `${TEA_GARDEN_EBOOK_INFO.subtitle}\n`;
    fullText += `Edition: ${TEA_GARDEN_EBOOK_INFO.edition}\n`;
    fullText += `Publisher: karamutsav.org\n`;
    fullText += `====================================================\n\n`;
    fullText += `INTRODUCTION:\n${TEA_GARDEN_EBOOK_INFO.introduction}\n\n`;
    fullText += `====================================================\n\n`;

    EBOOK_CHAPTERS.forEach((ch) => {
      fullText += `CHAPTER ${ch.number}: ${ch.title.toUpperCase()}\n`;
      fullText += `Context: ${ch.teaTribeContext}\n`;
      fullText += `Summary: ${ch.summary}\n\n`;
      ch.content.forEach((para) => {
        fullText += `${para}\n\n`;
      });
      fullText += `KEY CULTURAL TAKEAWAYS:\n`;
      ch.culturalKeynotes.forEach((point) => {
        fullText += ` • ${point}\n`;
      });
      fullText += `\n----------------------------------------------------\n\n`;
    });

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = TEA_GARDEN_EBOOK_INFO.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <section id="ebook" className="py-16 sm:py-24 bg-[#F4F8F4] border-t border-[#D5E5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Tea Tribe Theme */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C4D25]/10 text-[#1C4D25] border border-[#1C4D25]/20 text-xs font-bold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Tea Garden Heritage E-Book</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#14361B] tracking-tight">
            Karam Puja & The Tea Tribe Heritage
          </h2>
          <p className="text-base sm:text-lg text-[#2E4F34] leading-relaxed">
            An interactive digital publication celebrating the sacred rites, Jhumair dances, and ecological folklore of the tea garden communities of Assam, Dooars, and Chotanagpur.
          </p>
        </div>

        {/* EBook Reader Interface */}
        <div className="bg-[#FFFFFF] rounded-3xl border border-[#D5E5D5] shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Sidebar: Table of Contents */}
          <div className="lg:col-span-4 bg-[#EDF4ED] p-6 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#D5E5D5] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5E5D5]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#1C4D25]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1C4D25]">
                    Table of Contents
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#3D6843] bg-[#E1EDE1] px-2.5 py-0.5 rounded-full">
                  5 Chapters
                </span>
              </div>

              <div className="space-y-2">
                {EBOOK_CHAPTERS.map((chapter, idx) => {
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-[#1C4D25] text-white shadow-sm font-semibold'
                          : 'bg-white/80 text-[#14361B] hover:bg-white border border-[#D5E5D5]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                        isActive ? 'bg-[#52B788] text-[#0A2F1D]' : 'bg-[#E1EDE1] text-[#1C4D25]'
                      }`}>
                        {chapter.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-semibold truncate leading-snug">
                          {chapter.title}
                        </div>
                        <div className={`text-[11px] mt-0.5 truncate ${isActive ? 'text-[#D8F3DC]' : 'text-[#4D7C55]'}`}>
                          {chapter.teaTribeContext}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-[#52B788]' : 'text-[#85A88B]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Download Card inside reader */}
            <div className="bg-[#1C4D25] text-white p-5 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95D5B2]">
                <Bookmark className="w-3.5 h-3.5 text-[#52B788]" />
                <span>Offline Reading</span>
              </div>
              <p className="text-xs text-[#D8F3DC] leading-relaxed">
                Download the complete text edition to read offline or share with tea tribe educational study circles.
              </p>
              <button
                onClick={handleDownloadEbook}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#52B788] hover:bg-[#40916C] text-[#082819] font-bold text-xs shadow cursor-pointer transition-all hover:scale-[1.02]"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#082819]" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#082819]" />
                    <span>Download Complete E-Book (.txt)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Main Content: Chapter View */}
          <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-white">
            
            <div className="space-y-6">
              {/* Chapter Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E8F0E8]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] bg-[#E8F5E9] px-3 py-1 rounded-full">
                  Chapter {activeChapter.number} of {EBOOK_CHAPTERS.length}
                </span>
                <span className="text-xs font-medium text-[#4D7C55] flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>{activeChapter.teaTribeContext}</span>
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#14361B]">
                  {activeChapter.title}
                </h3>
                <p className="text-sm font-medium text-[#2D6A4F] italic mt-2 leading-relaxed bg-[#F4F8F4] p-3 rounded-xl border border-[#D5E5D5]">
                  "{activeChapter.summary}"
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#2E4F34] leading-relaxed">
                {activeChapter.content.map((para, pIdx) => (
                  <p key={pIdx} className="indent-4 sm:indent-6">
                    {para}
                  </p>
                ))}
              </div>

              {/* Key cultural takeaways */}
              <div className="bg-[#EDF4ED] rounded-2xl p-5 border border-[#D5E5D5] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1C4D25] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>Cultural Keynotes from Tea Gardens</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#204726] pt-1">
                  {activeChapter.culturalKeynotes.map((kn, knIdx) => (
                    <li key={knIdx} className="flex items-start gap-2">
                      <span className="text-[#2D6A4F] font-bold">•</span>
                      <span>{kn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pt-6 border-t border-[#E8F0E8] flex items-center justify-between gap-4">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex((prev) => Math.max(0, prev - 1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                  activeChapterIndex === 0
                    ? 'opacity-40 cursor-not-allowed text-gray-400 border-gray-200'
                    : 'bg-[#F4F8F4] text-[#14361B] border-[#D5E5D5] hover:bg-[#E1EDE1]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <div className="text-xs font-semibold text-[#3D6843]">
                {activeChapterIndex + 1} / {EBOOK_CHAPTERS.length}
              </div>

              <button
                disabled={activeChapterIndex === EBOOK_CHAPTERS.length - 1}
                onClick={() => setActiveChapterIndex((prev) => Math.min(EBOOK_CHAPTERS.length - 1, prev + 1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                  activeChapterIndex === EBOOK_CHAPTERS.length - 1
                    ? 'opacity-40 cursor-not-allowed text-gray-400 border-gray-200'
                    : 'bg-[#1C4D25] text-white border-[#1C4D25] hover:bg-[#14361B]'
                }`}
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
