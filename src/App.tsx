import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GalleryShowcase } from './components/GalleryShowcase';
import { BespokeStudio } from './components/BespokeStudio';
import { DiamondGuide } from './components/DiamondGuide';
import { ProductQuickView } from './components/ProductQuickView';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AIStylistDrawer } from './components/AIStylistDrawer';
import { PrivateConsultationModal } from './components/PrivateConsultationModal';
import { RingSizerModal } from './components/RingSizerModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

import { JEWELRY_CATALOG, JewelryItem, CurrencyKey } from './data/jewelryData';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyKey>('USD');
  
  // Cart state
  const [cartEntries, setCartEntries] = useState<{ item: JewelryItem; quantity: number }[]>([
    { item: JEWELRY_CATALOG[0], quantity: 1 }
  ]);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['solitaire-halo-ring', 'emerald-royal-drop']);

  // Modals & Drawers
  const [quickViewItem, setQuickViewItem] = useState<JewelryItem | null>(null);
  const [tryOnItem, setTryOnItem] = useState<JewelryItem | null>(null);
  const [isTryOnOpen, setIsTryOnOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [isRingSizerOpen, setIsRingSizerOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (item: JewelryItem) => {
    setCartEntries((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) => e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartEntries((prev) => prev.map((e) => e.item.id === id ? { ...e, quantity: qty } : e));
  };

  const handleRemoveCartItem = (id: string) => {
    setCartEntries((prev) => prev.filter((e) => e.item.id !== id));
  };

  const handleClearCart = () => {
    setCartEntries([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (item: JewelryItem) => {
    setWishlistIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  const wishlistItems = JEWELRY_CATALOG.filter((item) => wishlistIds.includes(item.id));

  // Virtual try-on trigger
  const handleOpenTryOn = (item?: JewelryItem) => {
    if (item) {
      setTryOnItem(item);
    } else {
      setTryOnItem(JEWELRY_CATALOG[0]);
    }
    setIsTryOnOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0a09] text-[#e8e2d8] flex flex-col font-serif selection:bg-[#d4af37]/30 selection:text-[#fff8e7]">
      
      {/* Full-Screen Luxury Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Top Bar Header */}
      <Header
        cartCount={cartEntries.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlistIds.length}
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenRingSizer={() => setIsRingSizerOpen(true)}
        onOpenTryOn={() => handleOpenTryOn()}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Banner */}
        <Hero
          currentCurrency={currentCurrency}
          onExploreCollection={() => {
            const el = document.getElementById('collection-gallery');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenBespokeStudio={() => {
            const el = document.getElementById('bespoke-studio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTryOn={() => handleOpenTryOn()}
        />

        {/* Collection Gallery Showcase with smooth transitions */}
        <GalleryShowcase
          currentCurrency={currentCurrency}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={setQuickViewItem}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenTryOnWithItem={(item) => handleOpenTryOn(item)}
        />

        {/* Bespoke Interactive Jewelry Creator */}
        <BespokeStudio
          currentCurrency={currentCurrency}
          onAddCustomToCart={handleAddToCart}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Educational Diamond & Gemstone Masterclass */}
        <DiamondGuide />

      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      {/* Quick View Modal */}
      {quickViewItem && (
        <ProductQuickView
          item={quickViewItem}
          currentCurrency={currentCurrency}
          onClose={() => setQuickViewItem(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(quickViewItem.id)}
          onOpenTryOnWithItem={(item) => handleOpenTryOn(item)}
        />
      )}

      {/* Virtual AR Mirror Try-On Modal */}
      {isTryOnOpen && (
        <VirtualTryOnModal
          item={tryOnItem}
          currentCurrency={currentCurrency}
          onClose={() => setIsTryOnOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Ring Size Calibrator Modal */}
      {isRingSizerOpen && (
        <RingSizerModal onClose={() => setIsRingSizerOpen(false)} />
      )}

      {/* Private Consultation Booking Modal */}
      {isConsultationOpen && (
        <PrivateConsultationModal onClose={() => setIsConsultationOpen(false)} />
      )}

      {/* Shopping Bag Drawer */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartEntries={cartEntries}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        currentCurrency={currentCurrency}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        currentCurrency={currentCurrency}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewItem}
        onRemoveWishlist={handleToggleWishlist}
      />

      {/* Gemini AI Stylist Drawer */}
      {isAIStylistOpen && (
        <AIStylistDrawer
          currentCurrency={currentCurrency}
          onClose={() => setIsAIStylistOpen(false)}
          onQuickView={setQuickViewItem}
        />
      )}

    </div>
  );
}
