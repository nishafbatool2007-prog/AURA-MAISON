import React, { useState } from 'react';
import { Sparkles, ArrowRight, Sun, Flame, Eye } from 'lucide-react';
import { CurrencyKey, formatPrice } from '../data/jewelryData';

interface HeroProps {
  currentCurrency: CurrencyKey;
  onExploreCollection: () => void;
  onOpenBespokeStudio: () => void;
  onOpenTryOn: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentCurrency,
  onExploreCollection,
  onOpenBespokeStudio,
  onOpenTryOn,
}) => {
  const [lightingMode, setLightingMode] = useState<'candlelight' | 'golden' | 'spotlight'>('golden');

  // Ambient lighting overlays based on selection
  const lightingGlows = {
    candlelight: 'from-[#3a200d]/60 via-[#1f1207]/80 to-[#0b0a09]',
    golden: 'from-[#614b1c]/40 via-[#261d0b]/80 to-[#0b0a09]',
    spotlight: 'from-[#423b2c]/40 via-[#1a1712]/80 to-[#0b0a09]'
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#241d17]">
      {/* Background Soft Warm Glow Orbs */}
      <div className={`absolute inset-0 bg-gradient-to-b ${lightingGlows[lightingMode]} transition-all duration-1000 z-0`} />
      
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/15 blur-[120px] pointer-events-none animate-warm-glow" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-[#f3e5ab]/10 blur-[150px] pointer-events-none animate-warm-glow" style={{ animationDelay: '3s' }} />

      {/* Main Content: Centered Hero Section */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center space-y-6">
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16120e] border border-[#d4af37]/30 text-xs font-garamond uppercase tracking-widest text-[#d4af37] font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>High Fine Jewelry Atelier · Place Vendôme</span>
          </div>
          
          <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl gold-text-gradient tracking-tight leading-tight">
            Crafted in Solid Gold
          </h1>
        </div>

        <p className="font-garamond text-base sm:text-lg text-[#bfae95] leading-relaxed max-w-2xl">
          Every creation is hand-engraved by master artisans in Place Vendôme using 18K solid gold and GIA-certified flawless diamonds.
        </p>

        {/* Action CTAs - Fully Rounded Compact Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
          <button
            onClick={onExploreCollection}
            className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-headline font-semibold text-xs tracking-wider uppercase rounded-full hover:brightness-110 transition-all cursor-pointer shadow-md shadow-[#d4af37]/20 flex items-center gap-2 group"
          >
            <span>Explore Private Vault</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenBespokeStudio}
            className="px-5 py-2.5 bg-[#16120e] hover:bg-[#221c17] text-[#f7f2e9] border border-[#3a3027] hover:border-[#d4af37] font-headline font-medium text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer"
          >
            Craft Custom Piece
          </button>

          <button
            onClick={onOpenTryOn}
            className="px-5 py-2.5 bg-[#201812] hover:bg-[#2e2319] text-[#f3e5ab] border border-[#d4af37]/40 font-headline font-medium text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>AR Virtual Try-On</span>
          </button>
        </div>

        {/* Atmospheric Light Simulator */}
        <div className="p-4 rounded-2xl bg-[#14100d]/90 border border-[#2c241c] w-full max-w-md space-y-2.5 backdrop-blur-sm mt-2">
          <div className="flex items-center justify-between text-xs font-garamond text-[#bfae95]">
            <span className="uppercase tracking-widest text-[11px]">Atmospheric Light Simulator</span>
            <span className="capitalize text-[#d4af37] font-semibold text-xs">{lightingMode} Lighting</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setLightingMode('candlelight')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-headline transition-all cursor-pointer ${
                lightingMode === 'candlelight'
                  ? 'bg-[#2a1d13] text-[#f3e5ab] border border-[#d4af37]'
                  : 'bg-[#1a1511] text-[#9e8d78] border border-transparent hover:border-[#3d3226]'
              }`}
            >
              <Flame className="w-3 h-3 text-[#e58a36]" />
              Warm
            </button>

            <button
              onClick={() => setLightingMode('golden')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-headline transition-all cursor-pointer ${
                lightingMode === 'golden'
                  ? 'bg-[#2c2313] text-[#f3e5ab] border border-[#d4af37]'
                  : 'bg-[#1a1511] text-[#9e8d78] border border-transparent hover:border-[#3d3226]'
              }`}
            >
              <Sun className="w-3 h-3 text-[#d4af37]" />
              Golden
            </button>

            <button
              onClick={() => setLightingMode('spotlight')}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-headline transition-all cursor-pointer ${
                lightingMode === 'spotlight'
                  ? 'bg-[#24211b] text-[#f3e5ab] border border-[#d4af37]'
                  : 'bg-[#1a1511] text-[#9e8d78] border border-transparent hover:border-[#3d3226]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#e5c158]" />
              Bright
            </button>
          </div>
        </div>

        {/* Editorial Social Proof Bar */}
        <div className="pt-5 border-t border-[#241d17] w-full grid grid-cols-3 gap-4 font-garamond text-xs text-[#a3937c] max-w-2xl">
          <div>
            <span className="block font-headline text-sm text-[#f3e5ab] font-bold">18K Solid</span>
            <span>Ethical Certified Gold</span>
          </div>
          <div>
            <span className="block font-headline text-sm text-[#f3e5ab] font-bold">GIA & IGL</span>
            <span>Verified Diamonds</span>
          </div>
          <div>
            <span className="block font-headline text-sm text-[#f3e5ab] font-bold">Lifetime</span>
            <span>Master Warranty</span>
          </div>
        </div>

      </div>
    </section>
  );
};
