import { Trees, Heart, Sprout, ShieldCheck, Leaf, Coffee } from 'lucide-react';
import { FESTIVAL_INFO } from '../data/karamData';

export function AboutSection() {
  const pillars = [
    {
      icon: Trees,
      title: 'Prakriti Vandana (Nature Worship)',
      desc: 'Indigenous tea garden tribes bow directly to living trees, soil, mountain streams, and hill slopes. The sacred Karam tree is worshipped as Karam Raja, protector of fertility and green life.'
    },
    {
      icon: Coffee,
      title: 'Tea Tribe Ancestral Resilience',
      desc: 'Carried by Oraon, Munda, Santhal, Kharia, Kurmi, and Gond ancestors to the tea valleys of Assam and Dooars, Karam Puja remains the greatest symbol of community unity and labor pride.'
    },
    {
      icon: Sprout,
      title: 'Jawa: Bio-Indicator of Soil Health',
      desc: 'Nine days before Karam night, maiden girls nurture nine sacred grains in river silt baskets. The vigor of these golden shoots gauges soil fertility and blesses the upcoming harvest.'
    },
    {
      icon: ShieldCheck,
      title: 'Equality & Solidarity in the Akhra',
      desc: 'The tea garden Akhra is a space of pure unity. Hand-in-hand in concentric circles, workers, elders, and youth step together to the Madal drum with no social division.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#F4F8F4] border-t border-[#D5E5D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C4D25]/10 text-[#1C4D25] border border-[#1C4D25]/20 text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>The Sacred Philosophy & Roots</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#14361B] tracking-tight">
            Why Tea Tribes Bow to Karam Raja
          </h2>
          <p className="text-base sm:text-lg text-[#2E4F34] leading-relaxed">
            From the Chotanagpur forests to the tea bushes of Assam and Dooars, Karam Puja expresses an unbroken bond of human labor, sisterly love, and ecological reverence.
          </p>
        </div>

        {/* 4 Pillars Grid in Tea Garden Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#D5E5D5] shadow-xs hover:shadow-md hover:border-[#1C4D25] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EDF4ED] text-[#1C4D25] border border-[#D5E5D5] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#2D6A4F]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#14361B]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2E4F34] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botanical Identity & Ancestral Tea Garden Proverb */}
        <div className="mt-12 bg-gradient-to-br from-[#14361B] to-[#0A200E] text-[#E8F5E9] rounded-3xl p-8 sm:p-10 shadow-xl border border-[#204E2B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#95D5B2] tracking-widest uppercase">
              <Trees className="w-4 h-4 text-[#52B788]" />
              <span>Botanical & Ecological Profile of the Sacred Karam Tree</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Haldina cordifolia & Nauclea parvifolia
            </h3>
            <p className="text-xs sm:text-sm text-[#D8F3DC] leading-relaxed">
              Known locally as the <strong>Karam</strong> tree, this magnificent deciduous tree is deeply cherished across tea plantations and sacred groves. Revered for its wide shade, therapeutic bark, and deep soil-binding roots that protect mountain tea slopes from erosion during severe monsoon storms.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-[#E8F5E9]">
              <span className="bg-[#1C4D25] px-3 py-1.5 rounded-lg border border-[#2D6A4F]">🌿 Family: Rubiaceae</span>
              <span className="bg-[#1C4D25] px-3 py-1.5 rounded-lg border border-[#2D6A4F]">💧 Tea slope soil stabilizer</span>
              <span className="bg-[#1C4D25] px-3 py-1.5 rounded-lg border border-[#2D6A4F]">🛡️ Sacred grove deity</span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0E2A14] p-6 rounded-2xl border border-[#204E2B] text-center space-y-3">
            <span className="text-3xl text-[#52B788]">❝</span>
            <p className="font-cultural text-lg text-[#95D5B2] leading-snug">
              जखन गाछ-पात बाँची, तखन मानुष बाँची। <br />
              करम राजा के जोहार, धरती माई के परनाम।
            </p>
            <div className="text-xs text-[#B7E4C7] pt-1 italic">
              "When trees and foliage thrive, humankind endures. Johar to Karam Raja and salutations to Mother Earth."
            </div>
            <div className="text-[11px] font-bold text-[#52B788] tracking-wider uppercase pt-2 border-t border-[#1C4D25]">
              Tea Tribe Ancestral Oral Proverb
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
