import { useState, useEffect, useRef } from 'react';
import { MANDAR_IMAGE, AUDIO_PATTERNS } from '../data/karamData';
import { soundEngine } from '../utils/audioSynthesizer';
import { Play, Square, Music, Volume2, Sparkles, Radio, Coffee } from 'lucide-react';

export function SoundboardSection() {
  const [activePatternIndex, setActivePatternIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lastTriggeredPad, setLastTriggeredPad] = useState<string | null>(null);

  const pattern = AUDIO_PATTERNS[activePatternIndex];
  const timerRef = useRef<number | null>(null);

  // Drum strike handler
  const triggerPad = (type: 'bass' | 'slap' | 'nagara' | 'ghungroo', name: string) => {
    setLastTriggeredPad(name);
    setTimeout(() => setLastTriggeredPad(null), 180);

    if (type === 'bass') soundEngine.playMandarBass();
    if (type === 'slap') soundEngine.playMandarSlap();
    if (type === 'nagara') soundEngine.playNagara();
    if (type === 'ghungroo') soundEngine.playGhungroo();
  };

  // Sequencer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentStep(0);
      return;
    }

    const stepDurationMs = (60 / pattern.tempo / 2) * 1000;

    let stepIdx = 0;
    timerRef.current = window.setInterval(() => {
      const step = pattern.steps[stepIdx % pattern.steps.length];
      setCurrentStep(stepIdx % pattern.steps.length);

      if (step.mandarBass) soundEngine.playMandarBass();
      if (step.mandarSlap) soundEngine.playMandarSlap();
      if (step.nagara) soundEngine.playNagara();
      if (step.ghungroo) soundEngine.playGhungroo();

      stepIdx++;
    }, stepDurationMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activePatternIndex]);

  return (
    <section id="soundboard" className="py-16 sm:py-24 bg-[#0E2A14] text-[#E8F5E9] border-t border-[#1C4D25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C4D25] text-[#95D5B2] text-xs font-bold uppercase tracking-wider border border-[#2D6A4F]">
            <Radio className="w-3.5 h-3.5 text-[#52B788]" />
            <span>Tea Garden Akhra Dhwani (Interactive Madal)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            The Heartbeat of the Madal Drum
          </h2>
          <p className="text-base sm:text-lg text-[#B7E4C7] leading-relaxed">
            Experience the acoustic pulse that keeps tea garden dancers in linked synchronization all through the autumn night. Tap individual drums or trigger authentic Jhumair loops!
          </p>
        </div>

        {/* Interactive Studio Console */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Drum Pad triggers & Sequencer controls */}
          <div className="lg:col-span-7 bg-[#14361B] p-6 sm:p-8 rounded-3xl border border-[#204E2B] shadow-2xl flex flex-col justify-between space-y-8">
            
            {/* Rhythm Loop Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-[#95D5B2] flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-[#52B788]" />
                  <span>Select Akhra Jhumair Loop</span>
                </span>
                <span className="text-xs font-mono text-[#74C69D] bg-[#0E2A14] px-2.5 py-1 rounded-md border border-[#204E2B]">
                  {pattern.tempo} BPM • {pattern.name.split(' ')[0]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {AUDIO_PATTERNS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePatternIndex(idx);
                      if (isPlaying) {
                        setIsPlaying(false);
                        setTimeout(() => setIsPlaying(true), 50);
                      }
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border cursor-pointer ${
                      idx === activePatternIndex
                        ? 'bg-[#2D6A4F] text-white border-[#52B788] shadow-md'
                        : 'bg-[#0E2A14] text-[#D8F3DC] border-[#204E2B] hover:bg-[#1C4D25]'
                    }`}
                  >
                    <div className="font-bold">{p.name.split(' (')[0]}</div>
                    <div className="text-[10px] text-[#95D5B2] opacity-90 mt-0.5">{p.tempo} BPM</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Sequencer Visualization */}
            <div className="bg-[#0E2A14] p-5 rounded-2xl border border-[#204E2B] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#95D5B2]">8-Step Tala Grid</span>
                <span className="text-[#74C69D] font-mono text-[11px]">
                  {isPlaying ? `Step ${currentStep + 1} / 8` : 'Sequencer Idle'}
                </span>
              </div>

              <div className="grid grid-cols-8 gap-2">
                {pattern.steps.map((step, idx) => {
                  const isCurrent = isPlaying && currentStep === idx;
                  const hasNote = step.mandarBass || step.mandarSlap || step.nagara || step.ghungroo;
                  return (
                    <div
                      key={idx}
                      className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#52B788] text-[#0A200E] font-bold scale-105 shadow-md'
                          : hasNote
                          ? 'bg-[#1C4D25] text-[#D8F3DC] border border-[#2D6A4F]'
                          : 'bg-[#14361B] text-[#4D7C55]'
                      }`}
                    >
                      <span className="text-[10px] font-mono">{idx + 1}</span>
                      {hasNote && (
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isCurrent ? 'bg-[#0A200E]' : 'bg-[#95D5B2]'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drum Trigger Pads */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#95D5B2]">
                Interactive Instrument Pads (Tap or Click)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => triggerPad('bass', 'Mandar Ghum (Bass)')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    lastTriggeredPad === 'Mandar Ghum (Bass)'
                      ? 'bg-[#52B788] text-[#0A200E] border-[#52B788] scale-95 shadow-inner'
                      : 'bg-[#0E2A14] text-white border-[#204E2B] hover:bg-[#1C4D25]'
                  }`}
                >
                  <span className="text-sm font-bold">Mandar Bass</span>
                  <span className="text-[10px] text-[#95D5B2] mt-0.5">Deep Dhun</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerPad('slap', 'Mandar Ta (Slap)')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    lastTriggeredPad === 'Mandar Ta (Slap)'
                      ? 'bg-[#52B788] text-[#0A200E] border-[#52B788] scale-95 shadow-inner'
                      : 'bg-[#0E2A14] text-white border-[#204E2B] hover:bg-[#1C4D25]'
                  }`}
                >
                  <span className="text-sm font-bold">Mandar Slap</span>
                  <span className="text-[10px] text-[#95D5B2] mt-0.5">Sharp Rim</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerPad('nagara', 'Nagara Roar')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    lastTriggeredPad === 'Nagara Roar'
                      ? 'bg-[#52B788] text-[#0A200E] border-[#52B788] scale-95 shadow-inner'
                      : 'bg-[#0E2A14] text-white border-[#204E2B] hover:bg-[#1C4D25]'
                  }`}
                >
                  <span className="text-sm font-bold">Nagara</span>
                  <span className="text-[10px] text-[#95D5B2] mt-0.5">Open Kettle</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerPad('ghungroo', 'Ghungroo')}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    lastTriggeredPad === 'Ghungroo'
                      ? 'bg-[#52B788] text-[#0A200E] border-[#52B788] scale-95 shadow-inner'
                      : 'bg-[#0E2A14] text-white border-[#204E2B] hover:bg-[#1C4D25]'
                  }`}
                >
                  <span className="text-sm font-bold">Ghungroo</span>
                  <span className="text-[10px] text-[#95D5B2] mt-0.5">Brass Bells</span>
                </button>
              </div>
            </div>

            {/* Play/Stop Master Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg ${
                  isPlaying
                    ? 'bg-[#B02A37] hover:bg-[#8F1D28] text-white'
                    : 'bg-[#2D6A4F] hover:bg-[#1C4D25] text-white hover:scale-[1.01]'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square className="w-5 h-5 fill-current" />
                    <span>Stop Akhra Rhythm Loop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current text-[#95D5B2]" />
                    <span>Start Continuous Akhra Jhumair Loop ({pattern.tempo} BPM)</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Instrument Showcase & Organology */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#14361B] rounded-3xl overflow-hidden border border-[#204E2B] shadow-xl">
              <div className="aspect-16/10 bg-[#0A200E] relative overflow-hidden">
                <img
                  src={MANDAR_IMAGE}
                  alt="Traditional Madal drummer performing at tea estate"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14361B] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D6A4F] text-[#E8F5E9] px-2.5 py-1 rounded-md">
                    Indigenous Organology
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1 text-white">
                    Mandar / Tumdak / Madal
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3 text-xs text-[#D8F3DC] leading-relaxed">
                <p>
                  Handcrafted from clay shaped on the potter's wheel and fired to hardness. The dual drumheads are lashed tightly with buffalo leather thongs. A round paste applied to the center produces an unmatched reverberating bass that resonates through tea hills.
                </p>
                <div className="pt-2 border-t border-[#204E2B] flex items-center justify-between text-[#95D5B2] font-semibold text-[11px]">
                  <span>Terracotta & Animal Hide</span>
                  <span>Sadri / Santali / Kurmali Heritage</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0E2A14] p-5 rounded-2xl border border-[#204E2B] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1C4D25] text-[#95D5B2] flex items-center justify-center shrink-0">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#E8F5E9]">Pure Web Audio Synthesis</div>
                <div className="text-[#B7E4C7] mt-0.5">
                  100% zero-latency in-browser audio engine modeled after physical acoustic membranes.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
