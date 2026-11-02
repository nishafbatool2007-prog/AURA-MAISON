import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Award, Eye, Info } from 'lucide-react';

export const DiamondGuide: React.FC = () => {
  const [caratVal, setCaratVal] = useState<number>(2.0);
  const [clarityIndex, setClarityIndex] = useState<number>(0); // 0: FL, 1: VVS1, 2: VS1, 3: SI1
  const [colorIndex, setColorIndex] = useState<number>(0); // 0: D (Colorless), 1: F, 2: H, 3: J

  const clarities = [
    { grade: 'FL / IF', label: 'Flawless / Internally Flawless', desc: 'No inclusions visible under 10x magnification. Unmatched optical purity.' },
    { grade: 'VVS1', label: 'Very Very Slightly Included', desc: 'Inclusions extremely difficult to see under 10x magnification. Exceptional rarity.' },
    { grade: 'VS1', label: 'Very Slightly Included', desc: 'Minor inclusions visible only under 10x magnification. Outstanding value.' },
    { grade: 'SI1', label: 'Slightly Included', desc: 'Inclusions noticeable under 10x magnification. Eye-clean to natural view.' },
  ];

  const colors = [
    { grade: 'Grade D - F', label: 'Colorless', desc: 'The rarest diamond grades with zero hue absorption. Maximum light refraction.' },
    { grade: 'Grade G - H', label: 'Near Colorless', desc: 'Appears completely colorless when set in 18K Yellow or White Gold.' },
    { grade: 'Grade I - J', label: 'Slight Warm Tone', desc: 'Subtle warm champagne tone that pairs harmoniously with solid 18K yellow gold.' },
  ];

  return (
    <section id="diamond-guide" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0a09] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#f7f2e9] tracking-tight">
            The 4Cs Diamond Guide
          </h2>
        </div>

        {/* 4Cs Interactive Sandbox Container */}
        <div className="max-w-4xl mx-auto bg-[#14100d] border border-[#2a231c] rounded-2xl p-6 sm:p-8 space-y-8">
          
          {/* 1. Carat Weight */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-headline text-sm">
              <span className="text-[#d4af37] uppercase tracking-wider font-semibold">1. Carat Weight</span>
              <span className="text-[#f3e5ab] font-bold text-lg">{caratVal} ct</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.25"
              value={caratVal}
              onChange={(e) => setCaratVal(parseFloat(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          {/* 2. Clarity Grade */}
          <div className="space-y-3">
            <span className="block font-headline text-sm text-[#d4af37] uppercase tracking-wider font-semibold">
              2. Clarity Grade
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {clarities.map((c, idx) => (
                <button
                  key={c.grade}
                  onClick={() => setClarityIndex(idx)}
                  className={`py-2 px-3 rounded-full font-headline text-xs text-center transition-all cursor-pointer ${
                    clarityIndex === idx
                      ? 'bg-[#d4af37] text-[#0b0a09] font-bold shadow-md'
                      : 'bg-[#1a1410] text-[#a08f79] border border-[#2e241c] hover:border-[#423427]'
                  }`}
                >
                  {c.grade}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Color Grade */}
          <div className="space-y-3">
            <span className="block font-headline text-sm text-[#d4af37] uppercase tracking-wider font-semibold">
              3. Color Grade
            </span>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((col, idx) => (
                <button
                  key={col.grade}
                  onClick={() => setColorIndex(idx)}
                  className={`py-2 px-3 rounded-full font-headline text-xs text-center transition-all cursor-pointer ${
                    colorIndex === idx
                      ? 'bg-[#d4af37] text-[#0b0a09] font-bold shadow-md'
                      : 'bg-[#1a1410] text-[#a08f79] border border-[#2e241c] hover:border-[#423427]'
                  }`}
                >
                  {col.grade}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
