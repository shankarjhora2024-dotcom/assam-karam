import { useState } from 'react';
import { FOLK_SONGS } from '../data/karamData';
import { Music, Sparkles, Feather, Mic2, HeartHandshake } from 'lucide-react';

export function SongsAndTraditions() {
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const activeSong = FOLK_SONGS[selectedSongIndex];

  const attireItems = [
    {
      title: 'Panchi-Parhan',
      tag: 'Sacred Handloom Saree',
      desc: 'Pure handwoven unbleached cotton draped in traditional style, marked by a deep crimson/madder red border symbolizing life force and fertility.'
    },
    {
      title: 'Tarpat & Hasli Ornaments',
      tag: 'Bell-Metal & Silver Jewelry',
      desc: 'Heirloom neck torque (Hasli), ear discs (Tarpat), and heavy ankle kadas passed down across matrilineal generations.'
    },
    {
      title: 'Wild Floral Hair Adornments',
      tag: 'Karam & Sal Blossoms',
      desc: 'Women weave fresh golden marigolds, palash flowers, and tender sal leaves into their coiled buns before entering the Akhra.'
    },
    {
      title: 'Paghdi & Peacock Feathers',
      tag: 'Youth & Drummers Attire',
      desc: 'Men and drummers tie clean white or yellow turbans adorned with a single peacock feather or auspicious Jawa shoot behind the ear.'
    }
  ];

  return (
    <section id="songs" className="py-16 sm:py-24 bg-[#F5EDE1]/60 border-t border-[#E8DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C271E]/10 text-[#8C271E] text-xs font-bold uppercase tracking-wider">
            <Mic2 className="w-3.5 h-3.5" />
            <span>Oral Poetry & Cultural Attire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#241B15] tracking-tight">
            Folk Verses & Akhra Traditions
          </h2>
          <p className="text-base sm:text-lg text-[#665548] leading-relaxed">
            The soul of Karam lives in oral songs passed down without written manuscripts for hundreds of generations. Explore sacred verses, lyrics, and traditional dress.
          </p>
        </div>

        {/* Songs Selector & Lyrics Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Song Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7A6455] mb-2">
              Select Traditional Song
            </div>
            {FOLK_SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => setSelectedSongIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  idx === selectedSongIndex
                    ? 'bg-[#FFFDFB] border-[#8C271E] shadow-md ring-2 ring-[#8C271E]/20'
                    : 'bg-[#EDE2D3]/60 border-[#DECFBD] hover:bg-[#FFFDFB]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#8C271E]">{song.genre}</span>
                  <span className="text-[#877262]">{song.dialect}</span>
                </div>
                <div className="text-sm font-bold text-[#2C241E]">
                  {song.title}
                </div>
                <div className="text-xs text-[#6E5A4D] line-clamp-1 mt-1">
                  {song.context}
                </div>
              </button>
            ))}
          </div>

          {/* Active Song Lyrics & Translation View */}
          <div className="lg:col-span-8 bg-[#FFFDFB] p-6 sm:p-8 rounded-3xl border border-[#E6DDD0] shadow-sm space-y-6">
            
            <div className="border-b border-[#EFE5D8] pb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-[#8C271E] uppercase tracking-wider">
                  {activeSong.genre} • {activeSong.dialect}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#241B15] mt-0.5">
                  {activeSong.title}
                </h3>
              </div>
              <div className="text-xs text-[#877262] bg-[#FAF4EB] px-3 py-1.5 rounded-lg border border-[#E3D6C5]">
                {activeSong.context}
              </div>
            </div>

            {/* Verses */}
            <div className="space-y-6">
              {activeSong.verses.map((verse, vIdx) => (
                <div key={vIdx} className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC9] space-y-3">
                  
                  {/* Original Regional Script */}
                  <div>
                    <span className="text-[10px] font-bold text-[#B45309] uppercase tracking-widest block mb-1">
                      Original Folk Verse (Devanagari)
                    </span>
                    <p className="font-cultural text-lg sm:text-xl text-[#8C271E] font-medium leading-relaxed whitespace-pre-line">
                      {verse.original}
                    </p>
                  </div>

                  {/* Transliteration */}
                  <div className="pt-2 border-t border-[#EFE5D8]">
                    <span className="text-[10px] font-bold text-[#705E51] uppercase tracking-widest block mb-0.5">
                      Phonetic Transliteration
                    </span>
                    <p className="text-xs sm:text-sm font-mono text-[#524135] whitespace-pre-line">
                      {verse.transliteration}
                    </p>
                  </div>

                  {/* English Translation */}
                  <div className="pt-2 border-t border-[#EFE5D8]">
                    <span className="text-[10px] font-bold text-[#705E51] uppercase tracking-widest block mb-0.5">
                      English Poetic Translation
                    </span>
                    <p className="text-xs sm:text-sm text-[#3E3026] italic leading-relaxed">
                      "{verse.meaning}"
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Traditional Attire & Adornments Grid */}
        <div className="mt-16 pt-12 border-t border-[#E8DEC9]">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h3 className="text-2xl font-display font-bold text-[#241B15]">
              Attire & Cultural Adornments of the Akhra
            </h3>
            <p className="text-sm text-[#665548]">
              Woven from unbleached cotton, adorned with wild flowers and ancestral ornaments, the festival attire reflects humility and intimacy with the forest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {attireItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDFB] p-6 rounded-2xl border border-[#E6DDD0] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#8C271E] uppercase tracking-wider">
                    {item.tag}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#2C241E]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#665548] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
