import React, { useState, useEffect } from 'react';
import { Sparkles, Gem, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // duration in ms, default ~2200ms
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 2200,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const statusMessages = [
    "Inspecting GIA D-Flawless Cut Diamonds...",
    "Calibrating 18K Solid Gold Facets...",
    "Unlocking Place Vendôme Private Vault..."
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress > 33 && currentProgress <= 66) {
        setStatusIndex(1);
      } else if (currentProgress > 66) {
        setStatusIndex(2);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500); // 500ms fade transition
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0a09] text-[#e8e2d8] transition-opacity duration-500 pointer-events-auto selection:bg-[#d4af37]/30 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Soft Ambient Gold Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-[#d4af37]/10 blur-[140px] pointer-events-none animate-warm-glow" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#f3e5ab]/10 blur-[100px] pointer-events-none" />

      {/* Main Luxury Emblem & Animated Ring Spinner */}
      <div className="relative flex flex-col items-center max-w-md w-full px-6 z-10 text-center">
        
        {/* Animated Double Gold Halo Spinner Frame */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Outer Rotating Gold Dashed Halo */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#d4af37]/40 animate-spin" style={{ animationDuration: '12s' }} />
          
          {/* Middle Counter-Rotating Glowing Ring */}
          <div className="absolute inset-2 rounded-full border-2 border-t-[#f3e5ab] border-r-[#d4af37] border-b-transparent border-l-[#aa7c11] animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />

          {/* Inner Pulsing Diamond Emblem */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#1c1712] to-[#0d0b09] border border-[#d4af37]/60 flex items-center justify-center shadow-lg shadow-[#d4af37]/20 group">
            <Gem className="w-7 h-7 text-[#f3e5ab] animate-pulse" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#d4af37] animate-bounce" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2 mb-8">
          <h1 className="font-headline font-bold text-2xl sm:text-3xl gold-text-gradient tracking-[0.25em] uppercase">
            AURA MAISON
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-garamond uppercase tracking-[0.2em] text-[#bfae95]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Place Vendôme · High Fine Jewelry</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="h-6 mb-4 flex items-center justify-center">
          <p className="font-garamond text-sm text-[#d4af37] italic animate-pulse tracking-wide">
            {statusMessages[statusIndex]}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#18130f] rounded-full h-1.5 p-0.5 border border-[#3a3027] overflow-hidden relative mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#8a6a18] via-[#d4af37] to-[#f3e5ab] rounded-full transition-all duration-75 ease-out shadow-sm shadow-[#d4af37]/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter & Quick Details */}
        <div className="w-full flex items-center justify-between text-[11px] font-garamond text-[#a08f79] tracking-widest uppercase">
          <span>18K Solid Gold</span>
          <span className="font-headline font-bold text-[#f3e5ab] text-xs">{progress}%</span>
          <span>GIA Certified</span>
        </div>

      </div>

      {/* Subtle Bottom Copyright Signature */}
      <div className="absolute bottom-6 font-garamond text-xs text-[#6e6150] tracking-widest uppercase">
        © AURA MAISON · Haute Joaillerie Paris
      </div>
    </div>
  );
};

export default LoadingScreen;
