import React, { useState } from 'react';
import { X, Sparkles, Heart, ShieldCheck, ShoppingBag, RotateCw, Check, Eye } from 'lucide-react';
import { JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface ProductQuickViewProps {
  item: JewelryItem | null;
  currentCurrency: CurrencyKey;
  onClose: () => void;
  onAddToCart: (item: JewelryItem) => void;
  onToggleWishlist: (item: JewelryItem) => void;
  isWishlisted: boolean;
  onOpenTryOnWithItem: (item: JewelryItem) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  item,
  currentCurrency,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenTryOnWithItem,
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [selectedMetal, setSelectedMetal] = useState<string>(item?.metal || '18K Yellow Gold');
  const [packaging, setPackaging] = useState<'mahogany' | 'velvet'>('mahogany');
  const [engraving, setEngraving] = useState<string>('');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      setRotationAngle((prev) => (prev + e.movementX * 1.5) % 360);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...item,
      metal: selectedMetal as any,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#14100d] border border-[#3a3027] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#1c1712] border border-[#332920] text-[#a3937d] hover:text-[#f3e5ab] hover:border-[#d4af37] transition-all z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 360-degree Interactive Drag Rotator */}
          <div className="lg:col-span-6 space-y-3">
            <div
              onMouseMove={handleDrag}
              className="relative aspect-square bg-[#080706] rounded-2xl border border-[#2a221b] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
            >
              {/* Image transform simulating 360 spin & reflection */}
              <div
                className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: `rotateY(${rotationAngle}deg) rotateX(${rotationAngle * 0.1}deg)`
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Warm Soft Glow Ambient Mask */}
              <div className="absolute inset-0 bg-radial from-[#d4af37]/20 via-transparent to-transparent pointer-events-none" />

              {/* Drag Hint */}
              <div className="absolute bottom-3 bg-[#0b0a09]/80 backdrop-blur-md px-3 py-1 rounded-full font-garamond text-xs text-[#d4af37] flex items-center gap-1.5 border border-[#3a2d22]">
                <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
                <span>Drag horizontally to rotate 360° light angles</span>
              </div>
            </div>

            {/* Rotation Slider */}
            <div className="flex items-center gap-3 font-garamond text-xs text-[#998873]">
              <span>0°</span>
              <input
                type="range"
                min="0"
                max="360"
                value={(rotationAngle % 360 + 360) % 360}
                onChange={(e) => setRotationAngle(Number(e.target.value))}
                className="flex-1 accent-[#d4af37] cursor-pointer"
              />
              <span>360°</span>
            </div>
          </div>

          {/* Right Column: Specifications & Acquisition */}
          <div className="lg:col-span-6 space-y-5 font-garamond text-sm text-[#c2b29c]">
            
            <div className="space-y-1">
              <span className="font-garamond italic text-xs text-[#d4af37] uppercase tracking-widest">
                {item.collection} · GIA Verified
              </span>
              <h2 className="font-headline font-semibold text-2xl text-[#f7f2e9]">
                {item.name}
              </h2>
              <span className="block font-headline font-bold text-2xl text-[#f3e5ab]">
                {formatPrice(item.priceUSD, currentCurrency)}
              </span>
            </div>

            <p className="text-[#c2b29c] leading-relaxed font-light">
              {item.description}
            </p>

            {/* Metal Switcher */}
            <div className="space-y-1.5">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Precious Metal Selection
              </label>
              <div className="grid grid-cols-3 gap-2 font-headline text-xs">
                {['18K Yellow Gold', '18K Rose Gold', 'Platinum'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMetal(m)}
                    className={`py-2 px-2 rounded border text-center transition-all cursor-pointer ${
                      selectedMetal === m
                        ? 'bg-[#2a2119] text-[#f3e5ab] border-[#d4af37] font-bold'
                        : 'bg-[#18130f] text-[#8c7a65] border-[#2e241c] hover:border-[#423427]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Engraving */}
            <div className="space-y-1">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Custom Hand Engraving (Optional)
              </label>
              <input
                type="text"
                maxLength={20}
                placeholder="e.g. Always 2026"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond italic text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
              />
            </div>

            {/* Specifications Specs Grid */}
            <div className="p-3.5 bg-[#0b0a09] border border-[#282019] rounded-xl grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#80705d]">Material Spec:</span>
                <span className="block text-[#f7f2e9] font-medium">{selectedMetal}</span>
              </div>
              <div>
                <span className="text-[#80705d]">Weight & Carat:</span>
                <span className="block text-[#f7f2e9] font-medium">{item.carat ? `${item.carat}ct` : `${item.weightGrams}g`}</span>
              </div>
              <div>
                <span className="text-[#80705d]">Clarity Grade:</span>
                <span className="block text-[#f7f2e9] font-medium">{item.clarity || 'FL Flawless'}</span>
              </div>
              <div>
                <span className="text-[#80705d]">Dispatch Status:</span>
                <span className="block text-[#d4af37] font-medium">In Atelier Vault</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-5 rounded-full font-headline font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] hover:brightness-110 shadow-lg shadow-[#d4af37]/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Atelier Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Acquire This Piece
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(item)}
                className={`p-3.5 rounded-full border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#d4af37] text-[#0b0a09] border-[#d4af37]'
                    : 'bg-[#18130f] text-[#c2b29b] border-[#382d23] hover:text-[#f3e5ab]'
                }`}
                title="Toggle Vault Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => {
                  onOpenTryOnWithItem(item);
                  onClose();
                }}
                className="p-3.5 bg-[#18130f] hover:bg-[#251f18] text-[#e8c872] border border-[#382d23] rounded-full transition-colors"
                title="Virtual AR Try On"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
