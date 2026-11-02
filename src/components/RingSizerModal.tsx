import React, { useState } from 'react';
import { X, Ruler, ShieldCheck, Check } from 'lucide-react';

interface RingSizerModalProps {
  onClose: () => void;
}

export const RingSizerModal: React.FC<RingSizerModalProps> = ({ onClose }) => {
  const [diameterMm, setDiameterMm] = useState<number>(16.5); // US Size 6 approx

  // Convert diameter to sizes
  const getRingSizes = (mm: number) => {
    let us = 6;
    if (mm < 14.5) us = 3.5;
    else if (mm < 15.0) us = 4;
    else if (mm < 15.5) us = 4.5;
    else if (mm < 16.0) us = 5;
    else if (mm < 16.5) us = 5.5;
    else if (mm < 17.0) us = 6;
    else if (mm < 17.5) us = 6.5;
    else if (mm < 18.0) us = 7;
    else if (mm < 18.5) us = 7.5;
    else if (mm < 19.0) us = 8;
    else if (mm < 19.5) us = 8.5;
    else if (mm < 20.0) us = 9;
    else us = 10;

    const eu = Math.round(mm * 3.14159);
    return { us, eu, circumference: (mm * Math.PI).toFixed(1) };
  };

  const currentSizes = getRingSizes(diameterMm);

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#14100d] border border-[#3a3027] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a221b] pb-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-headline font-semibold text-xl text-[#f7f2e9]">
              Ring Size Calibrator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#998873] hover:text-[#f3e5ab] hover:bg-[#251f18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="font-garamond text-base text-[#c2b29c]">
          Place a comfortable ring you already own directly over the golden circle on your screen. Adjust the slider until the inner edge of your ring aligns with the outer edge of the golden line.
        </p>

        {/* On-Screen Calibrated Circle Renderer */}
        <div className="py-8 bg-[#0b0a09] border border-[#2a221b] rounded-2xl flex flex-col items-center justify-center space-y-4">
          
          <div
            className="rounded-full border-4 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-200"
            style={{
              width: `${diameterMm * 8}px`,
              height: `${diameterMm * 8}px`
            }}
          >
            <span className="font-headline font-semibold text-xs text-[#f3e5ab]">
              {diameterMm.toFixed(1)} mm
            </span>
          </div>

          <p className="font-garamond italic text-xs text-[#998873]">
            Inner Circle Diameter
          </p>

        </div>

        {/* Slider Controls */}
        <div className="space-y-2">
          <div className="flex justify-between font-headline text-xs text-[#d4af37]">
            <span className="uppercase">Adjust Inner Diameter</span>
            <span>{diameterMm.toFixed(1)} mm</span>
          </div>
          <input
            type="range"
            min="14.0"
            max="21.0"
            step="0.1"
            value={diameterMm}
            onChange={(e) => setDiameterMm(parseFloat(e.target.value))}
            className="w-full accent-[#d4af37] cursor-pointer"
          />
        </div>

        {/* Size Outputs */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#0f0d0b] border border-[#2a221b] rounded-xl text-center font-garamond">
          <div>
            <span className="block font-headline font-bold text-lg text-[#f3e5ab]">
              US {currentSizes.us}
            </span>
            <span className="text-xs text-[#80705d]">United States</span>
          </div>

          <div>
            <span className="block font-headline font-bold text-lg text-[#f3e5ab]">
              EU {currentSizes.eu}
            </span>
            <span className="text-xs text-[#80705d]">Europe</span>
          </div>

          <div>
            <span className="block font-headline font-bold text-lg text-[#f3e5ab]">
              {currentSizes.circumference} mm
            </span>
            <span className="text-xs text-[#80705d]">Circumference</span>
          </div>
        </div>

        {/* Confirm Note */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 font-garamond text-xs text-[#d4af37]">
            <ShieldCheck className="w-4 h-4" />
            <span>Complimentary re-sizing included with all Maison Aura orders</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#d4af37] text-[#0b0a09] font-headline font-semibold text-xs uppercase rounded hover:bg-[#f3e5ab] transition-colors cursor-pointer"
          >
            Save Size
          </button>
        </div>

      </div>
    </div>
  );
};
