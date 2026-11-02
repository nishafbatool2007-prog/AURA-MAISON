import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Heart } from 'lucide-react';
import { CURRENCIES, CurrencyKey } from '../data/jewelryData';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentCurrency: CurrencyKey;
  onSelectCurrency: (curr: CurrencyKey) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIStylist: () => void;
  onOpenConsultation: () => void;
  onOpenRingSizer: () => void;
  onOpenTryOn: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  currentCurrency,
  onSelectCurrency,
  onOpenCart,
  onOpenWishlist,
  onOpenAIStylist,
  activeCategory,
  onSelectCategory
}) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[84%] max-w-3xl pointer-events-auto">
      {/* Translucent Glass Floating Dock - Micro Compact */}
      <div className="relative rounded-full bg-[#0d0b08]/80 backdrop-blur-xl border border-[#d4af37]/30 shadow-lg shadow-black/80 px-3 sm:px-4 py-1 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300 hover:border-[#d4af37]/50 group">
        
        {/* Soft Warm Edge Glow Effect */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#f3e5ab]/10 to-[#aa7c11]/20 blur-sm pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity" />

        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="relative z-10 flex items-center gap-1.5 shrink-0 group/brand"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-[#d4af37]/60 shrink-0 shadow-sm shadow-[#d4af37]/30">
            <img
              src="/src/assets/images/luxury_solitaire_ring_1793544222241.jpg"
              alt="AURA Solitaire Ring"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-headline font-semibold text-xs sm:text-sm tracking-[0.18em] text-[#f7f2e9] group-hover/brand:text-[#d4af37] transition-colors uppercase whitespace-nowrap">
            AURA MAISON
          </span>
        </a>

        {/* Zone 2: Compact Navigation Link */}
        <nav className="relative z-10 hidden sm:flex items-center gap-3 font-garamond text-xs text-[#d1c5b4]">
          <button
            onClick={() => {
              onSelectCategory('all');
              const el = document.getElementById('collection-gallery');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeCategory === 'all' ? 'text-[#d4af37] font-semibold underline underline-offset-2 decoration-[#d4af37]' : ''
            }`}
          >
            Collections
          </button>
        </nav>

        {/* Zone 3: Interactive Actions & Currency Selector */}
        <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* AI Stylist Button */}
          <button
            onClick={onOpenAIStylist}
            className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#1b1510]/90 border border-[#3d3024] text-[#e8c872] hover:border-[#d4af37] hover:bg-[#261e16] transition-all text-[10px] sm:text-[11px] font-headline cursor-pointer shadow-sm"
            title="Maison AI Concierge"
          >
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37] animate-pulse" />
            <span className="hidden sm:inline font-medium tracking-wider">AI Stylist</span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="text-[10px] sm:text-[11px] font-headline font-medium text-[#c2b29b] hover:text-[#f3e5ab] px-1.5 py-0.5 rounded-full bg-[#14100c]/90 border border-[#2e241c] transition-colors cursor-pointer"
            >
              {CURRENCIES[currentCurrency].name}
            </button>

            {currencyDropdownOpen && (
              <div
                className="absolute right-0 mt-1.5 w-24 bg-[#120e0b]/95 border border-[#3a3027] rounded-xl shadow-2xl py-1 z-50 font-headline text-[10px] backdrop-blur-xl"
                onMouseLeave={() => setCurrencyDropdownOpen(false)}
              >
                {(Object.keys(CURRENCIES) as CurrencyKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      onSelectCurrency(key);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2 py-1 hover:bg-[#27201a] transition-colors cursor-pointer ${
                      currentCurrency === key ? 'text-[#d4af37] font-semibold' : 'text-[#c2b29b]'
                    }`}
                  >
                    {CURRENCIES[key].name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="relative p-1 text-[#c2b29b] hover:text-[#f3e5ab] transition-colors cursor-pointer"
            title="Saved Vault"
          >
            <Heart className="w-3.5 h-3.5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#d4af37] text-[#0b0a09] text-[8px] font-headline font-bold rounded-full w-3 h-3 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button - Fully Rounded Micro */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-headline font-semibold text-[10px] sm:text-[11px] tracking-wider uppercase rounded-full hover:brightness-110 transition-all cursor-pointer shadow-sm shadow-[#d4af37]/15"
          >
            <ShoppingBag className="w-3 h-3" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#0b0a09] text-[#f3e5ab] text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded-full ml-0.5">
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
