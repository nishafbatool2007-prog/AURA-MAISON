import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: JewelryItem[];
  currentCurrency: CurrencyKey;
  onAddToCart: (item: JewelryItem) => void;
  onQuickView: (item: JewelryItem) => void;
  onRemoveWishlist: (item: JewelryItem) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  currentCurrency,
  onAddToCart,
  onQuickView,
  onRemoveWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#14100d] border-l border-[#3a3027] h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2a221b] flex items-center justify-between bg-[#0f0d0b]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#d4af37] fill-current" />
            <h3 className="font-headline font-semibold text-lg text-[#f7f2e9]">
              Saved Vault ({wishlistItems.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#998873] hover:text-[#f3e5ab] hover:bg-[#251f18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="py-20 text-center space-y-3 font-garamond text-[#80705d]">
              <Heart className="w-12 h-12 mx-auto text-[#3a2d22]" />
              <p className="text-base text-[#b2a188]">Your Private Vault wishlist is empty.</p>
              <p className="text-xs">Click the heart icon on any jewelry piece to save it for later.</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#100d0a] border border-[#282019] rounded-xl flex items-center gap-3 font-garamond"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#2a2119] cursor-pointer"
                  onClick={() => {
                    onQuickView(item);
                    onClose();
                  }}
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h5
                    onClick={() => {
                      onQuickView(item);
                      onClose();
                    }}
                    className="font-headline font-medium text-xs text-[#f7f2e9] hover:text-[#d4af37] cursor-pointer truncate"
                  >
                    {item.name}
                  </h5>
                  <p className="text-[11px] text-[#a08f79]">
                    {item.metal}
                  </p>
                  <span className="font-headline font-bold text-xs text-[#f3e5ab]">
                    {formatPrice(item.priceUSD, currentCurrency)}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(item);
                    }}
                    className="p-2 bg-[#1f1913] hover:bg-[#d4af37] text-[#e8c872] hover:text-[#0b0a09] border border-[#382d23] hover:border-[#d4af37] rounded transition-colors cursor-pointer"
                    title="Move to Atelier Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(item)}
                    className="p-2 text-[#80705d] hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
