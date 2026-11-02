import React, { useState } from 'react';
import { Sparkles, Heart, Eye, ShoppingBag, Filter, RefreshCw, Check } from 'lucide-react';
import { JEWELRY_CATALOG, JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface GalleryShowcaseProps {
  currentCurrency: CurrencyKey;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onQuickView: (item: JewelryItem) => void;
  onAddToCart: (item: JewelryItem) => void;
  onToggleWishlist: (item: JewelryItem) => void;
  wishlistIds: string[];
  onOpenTryOnWithItem: (item: JewelryItem) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Atelier Masterpieces' },
  { id: 'diamonds', label: 'High Diamonds' },
  { id: 'gold', label: 'Aura Gold' },
  { id: 'emeralds', label: 'Royal Emeralds' },
  { id: 'pearls', label: 'Heritage Pearls' },
  { id: 'bridal', label: 'Bridal & Solitaires' },
  { id: 'mens', label: 'Men\'s Atelier' },
];

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({
  currentCurrency,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenTryOnWithItem,
}) => {
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  // Smooth tab change handler with transition feedback
  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onSelectCategory(catId);
      setIsTransitioning(false);
    }, 250);
  };

  // Filter products
  const filteredProducts = JEWELRY_CATALOG.filter((item) => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const metalMatch = selectedMetal === 'all' || item.metal === selectedMetal;
    const priceMatch = item.priceUSD <= maxPrice;
    return categoryMatch && metalMatch && priceMatch;
  });

  const handleQuickAdd = (item: JewelryItem) => {
    onAddToCart(item);
    setAddedAnimationId(item.id);
    setTimeout(() => setAddedAnimationId(null), 1500);
  };

  return (
    <section id="collection-gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0a09] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline font-semibold text-3xl sm:text-5xl text-[#f7f2e9] tracking-tight">
            Curated Fine Jewelry
          </h2>
        </div>

        {/* Category Tabs & Interactive Filters */}
        <div className="space-y-6">
          
          {/* Main Category Bar (Segmented Button Group) */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-headline font-medium tracking-wider uppercase transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-bold shadow-lg shadow-[#d4af37]/20 scale-105'
                      : 'bg-[#16120e] text-[#b2a188] hover:text-[#f3e5ab] border border-[#2e251e] hover:border-[#4a3b2f]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Sub-Filters (Metal & Price) */}
          <div className="p-4 rounded-full bg-[#14100d] border border-[#2c241c] flex flex-wrap items-center justify-between gap-4 text-xs font-garamond text-[#bfae95]">
            
            {/* Metal Selector */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-headline uppercase tracking-wider text-[#d4af37]">
                <Filter className="w-3.5 h-3.5" /> Metal Spec:
              </span>

              {['all', '18K Yellow Gold', '18K Rose Gold', 'Platinum'].map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    selectedMetal === metal
                      ? 'bg-[#2a2219] text-[#f3e5ab] border border-[#d4af37]'
                      : 'text-[#8c7a65] hover:text-[#d1c5b4]'
                  }`}
                >
                  {metal === 'all' ? 'All Precious Metals' : metal}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-3">
              <span className="font-headline uppercase tracking-wider text-[#d4af37]">
                Max Price: {formatPrice(maxPrice, currentCurrency)}
              </span>
              <input
                type="range"
                min="4000"
                max="25000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-[#d4af37] cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Gallery Grid with Smooth Transition effect */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ${
            isTransitioning ? 'opacity-20 scale-98 blur-sm' : 'opacity-100 scale-100 blur-0'
          }`}
        >
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-[#120f0c] rounded-2xl border border-[#241d17]">
              <p className="font-garamond text-xl text-[#b2a188]">
                No jewelry pieces match the selected filter criteria.
              </p>
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setSelectedMetal('all');
                  setMaxPrice(25000);
                }}
                className="mt-4 px-4 py-2 bg-[#1f1913] border border-[#3d3125] text-[#d4af37] font-headline text-xs uppercase tracking-wider rounded hover:bg-[#2a2219] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((item) => {
              const isWishlisted = wishlistIds.includes(item.id);
              const isAdded = addedAnimationId === item.id;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl bg-[#14100d] border border-[#2a231c] hover:border-[#d4af37]/60 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col justify-between"
                >
                  {/* Image Container with Warm Glow Scrim */}
                  <div className="relative aspect-[4/3] bg-[#090807] overflow-hidden cursor-pointer" onClick={() => onQuickView(item)}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Warm Lighting Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14100d] via-transparent to-transparent opacity-80" />

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(item);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-[#d4af37] text-[#0b0a09]'
                          : 'bg-[#0b0a09]/60 text-[#c2b29b] hover:text-[#f3e5ab] border border-[#2c241c]'
                      }`}
                      title={isWishlisted ? 'Remove from Vault' : 'Save to Vault'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Overlay Bar */}
                    <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(item);
                        }}
                        className="flex-1 py-2 bg-[#0b0a09]/90 border border-[#d4af37] text-[#f3e5ab] font-headline text-[11px] uppercase tracking-wider rounded-full hover:bg-[#d4af37] hover:text-[#0b0a09] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Quick Inspect
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenTryOnWithItem(item);
                        }}
                        className="p-2 bg-[#0b0a09]/90 border border-[#2c241c] hover:border-[#d4af37] text-[#e8c872] rounded-full transition-colors"
                        title="Try On Virtually"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                  {/* Card Info Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1.5">
                      {/* Category & Metal in Cormorant Garamond */}
                      <div className="flex items-center justify-between font-garamond text-xs text-[#998873] uppercase tracking-wider">
                        <span>{item.collection}</span>
                        <span>{item.metal}</span>
                      </div>

                      {/* Product Name in Montserrat */}
                      <h3
                        onClick={() => onQuickView(item)}
                        className="font-headline font-semibold text-base text-[#f7f2e9] group-hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h3>

                      {/* Specs in Cormorant Garamond */}
                      <p className="font-garamond text-sm text-[#b2a188] line-clamp-2 italic font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Price & Add to Bag CTA */}
                    <div className="pt-3 border-t border-[#221c17] flex items-center justify-between">
                      <div>
                        <span className="block font-headline font-semibold text-lg text-[#f3e5ab]">
                          {formatPrice(item.priceUSD, currentCurrency)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(item)}
                        className={`px-3.5 py-2 rounded-full font-headline text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#1e1813] hover:bg-[#d4af37] text-[#e8c872] hover:text-[#0b0a09] border border-[#382d23] hover:border-[#d4af37]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Acquire
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};
