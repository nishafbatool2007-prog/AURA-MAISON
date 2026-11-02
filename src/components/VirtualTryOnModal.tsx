import React, { useState, useRef } from 'react';
import { X, Camera, Sparkles, ZoomIn, ZoomOut, Move, RotateCw, ShoppingBag, Check } from 'lucide-react';
import { JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface VirtualTryOnModalProps {
  item: JewelryItem | null;
  currentCurrency: CurrencyKey;
  onClose: () => void;
  onAddToCart: (item: JewelryItem) => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  item,
  currentCurrency,
  onClose,
  onAddToCart,
}) => {
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [posX, setPosX] = useState<number>(50); // percentage
  const [posY, setPosY] = useState<number>(50); // percentage
  const [scale, setScale] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [warmGlow, setWarmGlow] = useState<number>(80);
  const [added, setAdded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      setUseCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error, defaulting to portrait model preview:', err);
      setUseCamera(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setUseCamera(false);
    }
  };

  const activeJewelry = item || {
    id: 'hero-ring',
    name: 'The Crown Cushion Solitaire Ring',
    priceUSD: 14800,
    image: '/src/assets/images/hero_jewelry_banner_1793345614955.jpg',
    metal: '18K Yellow Gold',
    category: 'diamonds'
  } as JewelryItem;

  const handleBagAdd = () => {
    onAddToCart(activeJewelry);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#14100d] border border-[#3a3027] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#2a221b] flex items-center justify-between bg-[#0f0d0b]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-headline font-semibold text-lg text-[#f7f2e9]">
              Virtual Jewelry Mirror
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#998873] hover:text-[#f3e5ab] hover:bg-[#251f18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-y-auto">
          
          {/* Virtual Canvas Viewport */}
          <div className="lg:col-span-7 relative bg-[#090807] rounded-2xl border border-[#2a231c] overflow-hidden aspect-[4/3] flex items-center justify-center">
            
            {/* Live WebCam video if enabled */}
            {useCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : imageSrc ? (
              <img src={imageSrc} alt="User portrait" className="w-full h-full object-cover" />
            ) : (
              /* Fallback elegant portrait canvas backdrop */
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1511] to-[#0d0a08] p-6 text-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#d4af37]/40 flex items-center justify-center mb-3 text-[#d4af37]">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="font-garamond text-base text-[#c2b29c] max-w-xs">
                  Enable your camera or upload a photo to preview how the piece complements your neckline, hand, or ears.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-[#d4af37] text-[#0b0a09] font-headline font-semibold text-xs uppercase rounded cursor-pointer hover:bg-[#f3e5ab]"
                  >
                    Enable WebCam
                  </button>
                  <label className="px-4 py-2 bg-[#1f1913] border border-[#382d23] text-[#f3e5ab] font-headline font-medium text-xs uppercase rounded cursor-pointer hover:bg-[#2c231a]">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            )}

            {/* Overlay Jewelry Piece Layer */}
            <div
              className="absolute pointer-events-none transition-transform duration-75"
              style={{
                top: `${posY}%`,
                left: `${posX}%`,
                transform: `translate(-50%, -50%) scale(${scale / 100}) rotate(${rotation}deg)`,
                filter: `drop-shadow(0 0 ${warmGlow / 3}px rgba(212, 175, 55, ${warmGlow / 100}))`
              }}
            >
              <img
                src={activeJewelry.image}
                alt={activeJewelry.name}
                className="w-40 h-40 object-contain rounded-full mix-blend-screen"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Warm Sparkle Light Frame */}
            <div className="absolute inset-0 border-2 border-[#d4af37]/30 rounded-2xl pointer-events-none" />

          </div>

          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-5 font-garamond text-sm text-[#c2b29c]">
            
            <div>
              <span className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Active Piece
              </span>
              <h4 className="font-headline text-lg font-semibold text-[#f7f2e9]">
                {activeJewelry.name}
              </h4>
              <span className="font-headline font-bold text-base text-[#f3e5ab]">
                {formatPrice(activeJewelry.priceUSD, currentCurrency)}
              </span>
            </div>

            {/* Position Adjustment Sliders */}
            <div className="space-y-3 p-4 bg-[#0f0d0b] border border-[#2a221b] rounded-xl">
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><Move className="w-3 h-3 text-[#d4af37]" /> Position Horizontal</span>
                  <span>{posX}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={posX}
                  onChange={(e) => setPosX(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><Move className="w-3 h-3 text-[#d4af37]" /> Position Vertical</span>
                  <span>{posY}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={posY}
                  onChange={(e) => setPosY(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3 text-[#d4af37]" /> Scale Size</span>
                  <span>{scale}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><RotateCw className="w-3 h-3 text-[#d4af37]" /> Rotation</span>
                  <span>{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#d4af37]" /> Warm Light Intensity</span>
                  <span>{warmGlow}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={warmGlow}
                  onChange={(e) => setWarmGlow(Number(e.target.value))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleBagAdd}
                className={`flex-1 py-3 px-4 rounded font-headline font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] hover:brightness-110'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Acquire This Piece
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
