import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag, ArrowRight, Check, Gift } from 'lucide-react';
import { JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface CartEntry {
  item: JewelryItem;
  quantity: number;
}

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartEntries: CartEntry[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  currentCurrency: CurrencyKey;
  onClearCart: () => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  cartEntries,
  onUpdateQuantity,
  onRemoveItem,
  currentCurrency,
  onClearCart,
}) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [giftWrap, setGiftWrap] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotalUSD = cartEntries.reduce((sum, entry) => sum + entry.item.priceUSD * entry.quantity, 0);
  const freeDeliveryThresholdUSD = 10000;
  const deliveryProgress = Math.min(100, Math.round((subtotalUSD / freeDeliveryThresholdUSD) * 100));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `M-AURA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setOrderComplete(true);
  };

  const handleDone = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckout(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#14100d] border-l border-[#3a3027] h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-[#2a221b] flex items-center justify-between bg-[#0f0d0b]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-headline font-semibold text-lg text-[#f7f2e9]">
              Atelier Bag ({cartEntries.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#998873] hover:text-[#f3e5ab] hover:bg-[#251f18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4 font-garamond">
            <div className="w-16 h-16 rounded-full bg-[#1b2b1b] border border-emerald-500 text-emerald-400 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-headline font-bold text-2xl text-[#f7f2e9]">
              Acquisition Confirmed
            </h4>
            <p className="text-[#c2b29c] text-sm">
              Receipt Reference: <span className="text-[#f3e5ab] font-mono font-bold">{orderNumber}</span>
            </p>
            <p className="text-xs text-[#a08f79] leading-relaxed">
              Your pieces are being prepared in our climate-controlled vault for insured armored dispatch to {address || 'your designated address'}.
            </p>
            <button
              onClick={handleDone}
              className="px-6 py-2.5 bg-[#d4af37] text-[#0b0a09] font-headline font-semibold text-xs uppercase rounded cursor-pointer hover:bg-[#f3e5ab]"
            >
              Continue Exploring
            </button>
          </div>
        ) : isCheckout ? (
          /* Checkout Form */
          <form onSubmit={handleCheckoutSubmit} className="p-6 flex-1 overflow-y-auto space-y-5 font-garamond text-sm">
            <div className="space-y-1 border-b border-[#2a221b] pb-3">
              <h4 className="font-headline font-semibold text-base text-[#f7f2e9]">
                Armored Delivery Checkout
              </h4>
              <p className="text-xs text-[#998873]">
                Full Order Total: <span className="text-[#f3e5ab] font-bold font-headline">{formatPrice(subtotalUSD, currentCurrency)}</span>
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37] mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div>
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37] mb-1">
                  Armored Shipping Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full street address & suite..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div>
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37] mb-1">
                  Direct Contact Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#c2b29c]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="accent-[#d4af37]"
                  />
                  <span>Include Complimentary Mahogany Presentation Gift Box</span>
                </label>
              </div>

              {giftWrap && (
                <div>
                  <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37] mb-1">
                    Calligraphy Card Note
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a message to be hand-written on silk cardstock..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded italic text-xs text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setIsCheckout(false)}
                className="py-3 px-4 bg-[#18130f] text-[#a08f79] font-headline text-xs uppercase rounded hover:bg-[#251f18]"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-headline font-semibold text-xs tracking-wider uppercase rounded hover:brightness-110 shadow-lg shadow-[#d4af37]/20"
              >
                Authorize Insured Order
              </button>
            </div>
          </form>
        ) : (
          /* Cart List */
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Free Delivery Tracker Bar */}
            <div className="p-3 bg-[#0f0d0b] border border-[#2a221b] rounded-xl space-y-1.5 font-garamond text-xs">
              <div className="flex justify-between text-[#c2b29c]">
                <span className="flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-[#d4af37]" /> Insured Courier Threshold:
                </span>
                <span className="text-[#f3e5ab] font-bold">
                  {deliveryProgress}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#1f1913] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-500"
                  style={{ width: `${deliveryProgress}%` }}
                />
              </div>
            </div>

            {cartEntries.length === 0 ? (
              <div className="py-20 text-center space-y-3 font-garamond text-[#80705d]">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#3a2d22]" />
                <p className="text-base text-[#b2a188]">Your Atelier Bag is currently empty.</p>
                <p className="text-xs">Explore our collection galleries or craft a bespoke masterpiece.</p>
              </div>
            ) : (
              cartEntries.map((entry) => (
                <div
                  key={entry.item.id}
                  className="p-3.5 bg-[#100d0a] border border-[#282019] rounded-xl flex items-center gap-3 font-garamond"
                >
                  <img
                    src={entry.item.image}
                    alt={entry.item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 border border-[#2a2119]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h5 className="font-headline font-medium text-xs text-[#f7f2e9] truncate">
                      {entry.item.name}
                    </h5>
                    <p className="text-[11px] text-[#a08f79]">
                      {entry.item.metal}
                    </p>
                    <span className="font-headline font-bold text-xs text-[#f3e5ab]">
                      {formatPrice(entry.item.priceUSD, currentCurrency)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1 bg-[#18130f] border border-[#2a2119] rounded px-1">
                      <button
                        onClick={() => onUpdateQuantity(entry.item.id, entry.quantity - 1)}
                        className="p-1 text-[#998873] hover:text-[#f3e5ab] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 font-headline text-xs font-bold text-[#f7f2e9]">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(entry.item.id, entry.quantity + 1)}
                        className="p-1 text-[#998873] hover:text-[#f3e5ab] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(entry.item.id)}
                      className="text-[#80705d] hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer Subtotal Bar */}
        {!orderComplete && !isCheckout && cartEntries.length > 0 && (
          <div className="p-5 border-t border-[#2a221b] bg-[#0d0a08] space-y-4">
            <div className="flex justify-between font-garamond text-base">
              <span className="text-[#b2a188]">Subtotal Value:</span>
              <span className="font-headline font-bold text-xl text-[#f3e5ab]">
                {formatPrice(subtotalUSD, currentCurrency)}
              </span>
            </div>

            <button
              onClick={() => setIsCheckout(true)}
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-headline font-semibold text-xs tracking-wider uppercase rounded hover:brightness-110 cursor-pointer shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-garamond text-[#80705d]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Armored Transport & GIA Documentation Included</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
