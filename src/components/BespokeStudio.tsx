import React, { useState, useMemo } from 'react';
import { Sparkles, ShieldCheck, Check, ShoppingBag, Calendar } from 'lucide-react';
import { CurrencyKey, formatPrice } from '../data/jewelryData';

interface BespokeStudioProps {
  currentCurrency: CurrencyKey;
  onAddCustomToCart: (customItem: any) => void;
  onOpenConsultation: () => void;
}

export const BespokeStudio: React.FC<BespokeStudioProps> = ({
  currentCurrency,
  onAddCustomToCart,
  onOpenConsultation,
}) => {
  const [pieceType, setPieceType] = useState<'ring' | 'necklace' | 'earrings' | 'bracelet'>('ring');
  const [metal, setMetal] = useState<'yellow_gold' | 'rose_gold' | 'white_gold' | 'platinum'>('yellow_gold');
  const [gemstone, setGemstone] = useState<'diamond' | 'emerald' | 'sapphire' | 'ruby' | 'pearl'>('diamond');
  const [cutShape, setCutShape] = useState<'cushion' | 'round' | 'emerald' | 'oval' | 'pear'>('cushion');
  const [carat, setCarat] = useState<number>(2.0);
  const [bandStyle, setBandStyle] = useState<'solitaire' | 'halo' | 'pave' | 'vintage'>('pave');
  const [engravingText, setEngravingText] = useState<string>('Forever Aura');
  const [added, setAdded] = useState(false);

  // Dynamic price calculation engine
  const calculatedPriceUSD = useMemo(() => {
    let basePrice = 2500; // Base gold crafting fee
    if (pieceType === 'necklace') basePrice = 3200;
    if (pieceType === 'earrings') basePrice = 4100;
    if (pieceType === 'bracelet') basePrice = 4800;

    // Metal adjustment
    if (metal === 'platinum') basePrice += 1200;
    if (metal === 'rose_gold') basePrice += 300;

    // Gemstone multiplier per carat
    let stonePerCarat = 3800; // Diamond
    if (gemstone === 'emerald') stonePerCarat = 4500;
    if (gemstone === 'sapphire') stonePerCarat = 2800;
    if (gemstone === 'ruby') stonePerCarat = 3600;
    if (gemstone === 'pearl') stonePerCarat = 1800;

    // Style addition
    let styleFee = 0;
    if (bandStyle === 'halo') styleFee = 1400;
    if (bandStyle === 'pave') styleFee = 1800;
    if (bandStyle === 'vintage') styleFee = 2200;

    const total = basePrice + (carat * stonePerCarat) + styleFee;
    return Math.round(total);
  }, [pieceType, metal, gemstone, carat, bandStyle]);

  const metalNames = {
    yellow_gold: '18K Yellow Gold',
    rose_gold: '18K Rose Gold',
    white_gold: '18K White Gold',
    platinum: 'Solid Platinum 950'
  };

  const gemstoneNames = {
    diamond: 'Ethical Cushion Diamond (VVS1)',
    emerald: 'Royal Colombian Emerald',
    sapphire: 'Ceylon Blue Sapphire',
    ruby: 'Burmese Ruby',
    pearl: 'Golden South Sea Pearl'
  };

  // Preview color styling
  const metalColors = {
    yellow_gold: 'from-[#d4af37] via-[#f3e5ab] to-[#aa7c11]',
    rose_gold: 'from-[#e8a598] via-[#fbd1c9] to-[#c4796a]',
    white_gold: 'from-[#d1d5db] via-[#f3f4f6] to-[#9ca3af]',
    platinum: 'from-[#e5e7eb] via-[#ffffff] to-[#9ca3af]'
  };

  const stoneGlows = {
    diamond: 'bg-white/80 shadow-[0_0_35px_rgba(255,255,255,0.8)]',
    emerald: 'bg-emerald-500/90 shadow-[0_0_35px_rgba(16,185,129,0.8)]',
    sapphire: 'bg-blue-600/90 shadow-[0_0_35px_rgba(37,99,235,0.8)]',
    ruby: 'bg-rose-600/90 shadow-[0_0_35px_rgba(225,29,72,0.8)]',
    pearl: 'bg-amber-200/90 shadow-[0_0_35px_rgba(251,191,36,0.8)]'
  };

  const handleAddCustomToBag = () => {
    const customItem = {
      id: `bespoke-${Date.now()}`,
      name: `Bespoke ${metalNames[metal]} ${pieceType.toUpperCase()}`,
      category: 'gold' as const,
      collection: 'Bespoke Atelier Custom',
      priceUSD: calculatedPriceUSD,
      rating: 5.0,
      reviewsCount: 1,
      image: '/src/assets/images/hero_jewelry_banner_1793345614955.jpg',
      secondaryImages: [],
      description: `Bespoke ${carat}ct ${gemstoneNames[gemstone]} set in ${metalNames[metal]} with ${bandStyle} setting. Custom Engraving: "${engravingText}".`,
      metal: (metal === 'yellow_gold' ? '18K Yellow Gold' : metal === 'rose_gold' ? '18K Rose Gold' : metal === 'white_gold' ? '18K White Gold' : 'Platinum') as any,
      gemstone: gemstoneNames[gemstone],
      carat,
      clarity: 'VVS1',
      colorGrade: 'D/E Flawless',
      weightGrams: 8.5,
      inStock: true
    };

    onAddCustomToCart(customItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="bespoke-studio" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0d0b] relative border-y border-[#28211a]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#f7f2e9] tracking-tight">
            Craft Your Bespoke Masterpiece
          </h2>
        </div>

        {/* Interactive Customizer Panel */}
        <div className="max-w-4xl mx-auto bg-[#14100d] border border-[#2a231c] rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Live Price Bar */}
          <div className="p-4 bg-[#0b0a09] border border-[#282019] rounded-xl flex items-center justify-between font-garamond">
            <div>
              <span className="block font-headline font-semibold text-sm text-[#f7f2e9] uppercase tracking-wider">
                {carat} Carat {cutShape.toUpperCase()} {gemstone.toUpperCase()}
              </span>
            </div>

            <div className="text-right">
              <span className="block font-headline font-bold text-xl text-[#f3e5ab]">
                {formatPrice(calculatedPriceUSD, currentCurrency)}
              </span>
            </div>
          </div>

          {/* Step 1: Piece Type */}
            <div className="space-y-2">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                1. Select Jewelry Form
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'ring', label: 'Ring' },
                  { id: 'necklace', label: 'Pendant' },
                  { id: 'earrings', label: 'Earrings' },
                  { id: 'bracelet', label: 'Bangle' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPieceType(type.id as any)}
                    className={`py-2.5 px-3 rounded font-headline text-xs font-medium transition-all cursor-pointer ${
                      pieceType === type.id
                        ? 'bg-[#d4af37] text-[#0b0a09] font-bold shadow-md'
                        : 'bg-[#18130f] text-[#a89882] border border-[#2e241c] hover:border-[#4a3b2e]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Solid Precious Metal */}
            <div className="space-y-2">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                2. Solid Precious Metal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'yellow_gold', label: '18K Yellow Gold' },
                  { id: 'rose_gold', label: '18K Rose Gold' },
                  { id: 'white_gold', label: '18K White Gold' },
                  { id: 'platinum', label: 'Platinum 950' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMetal(m.id as any)}
                    className={`py-2 px-3 rounded font-garamond text-sm text-left transition-all cursor-pointer ${
                      metal === m.id
                        ? 'bg-[#292017] text-[#f3e5ab] border border-[#d4af37]'
                        : 'bg-[#18130f] text-[#8c7a65] border border-[#2a2119] hover:border-[#403225]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Main Gemstone */}
            <div className="space-y-2">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                3. Center Gemstone Selection
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { id: 'diamond', label: 'Diamond' },
                  { id: 'emerald', label: 'Emerald' },
                  { id: 'sapphire', label: 'Sapphire' },
                  { id: 'ruby', label: 'Ruby' },
                  { id: 'pearl', label: 'Pearl' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGemstone(g.id as any)}
                    className={`py-2 px-2 text-center rounded font-garamond text-xs capitalize transition-all cursor-pointer ${
                      gemstone === g.id
                        ? 'bg-[#292017] text-[#f3e5ab] border border-[#d4af37] font-semibold'
                        : 'bg-[#18130f] text-[#8c7a65] border border-[#2a2119] hover:border-[#403225]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Carat Weight & Cut */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between font-headline text-xs text-[#d4af37]">
                  <span className="uppercase">4. Carat Weight</span>
                  <span>{carat} Carats</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.25"
                  value={carat}
                  onChange={(e) => setCarat(parseFloat(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  Cut Shape
                </label>
                <select
                  value={cutShape}
                  onChange={(e) => setCutShape(e.target.value as any)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                >
                  <option value="cushion">Cushion Cut</option>
                  <option value="round">Round Brilliant</option>
                  <option value="emerald">Emerald Cut</option>
                  <option value="oval">Oval Cut</option>
                  <option value="pear">Pear Drop</option>
                </select>
              </div>
            </div>

            {/* Step 5: Custom Engraving */}
            <div className="space-y-2">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                5. Personalized Atelier Engraving (Complimentary)
              </label>
              <input
                type="text"
                maxLength={25}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="Enter initials, anniversary date, or secret text..."
                className="w-full py-2.5 px-4 bg-[#18130f] border border-[#2e241c] rounded font-garamond italic text-base text-[#f3e5ab] focus:border-[#d4af37] outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleAddCustomToBag}
                className={`flex-1 py-3.5 px-6 rounded-full font-headline font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] hover:brightness-110 shadow-lg shadow-[#d4af37]/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added Bespoke Order
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Acquire Custom Creation
                  </>
                )}
              </button>

              <button
                onClick={onOpenConsultation}
                className="py-3.5 px-5 bg-[#18130f] hover:bg-[#251d16] text-[#e8c872] border border-[#3a2d22] font-headline text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                Book Master Goldsmith Session
              </button>
            </div>

        </div>

      </div>
    </section>
  );
};
