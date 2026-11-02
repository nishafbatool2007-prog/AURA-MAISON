import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Check, ArrowRight, MapPin, Mail } from 'lucide-react';
import { BOUTIQUES } from '../data/jewelryData';

interface FooterProps {
  onOpenConsultation: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="heritage-craft" className="bg-[#080706] text-[#c2b29c] border-t border-[#241d17] pt-16 pb-12 font-garamond">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top VIP Invitation Row */}
        <div className="p-8 rounded-2xl bg-[#120f0c] border border-[#2e241c] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] uppercase tracking-widest font-headline">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Atelier Circle</span>
            </div>
            <h3 className="font-headline font-semibold text-2xl text-[#f7f2e9]">
              Receive Private Invitations & Rare Gemstone Previews
            </h3>
            <p className="text-sm text-[#a08f79] font-light">
              Join our private directory to receive high jewelry salon invitations, custom commission priority, and annual heritage publications.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-3 bg-[#1e291e] border border-emerald-500/50 rounded text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are registered in the Maison Aura Private Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#80705d] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full py-2.5 pl-9 pr-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#d4af37] text-[#0b0a09] font-headline font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#f3e5ab] transition-colors cursor-pointer shrink-0"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-sm">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <span className="font-headline font-semibold text-2xl tracking-[0.25em] text-[#f7f2e9] uppercase">
                AURA MAISON
              </span>
              <span className="block font-garamond italic text-xs tracking-[0.3em] text-[#9e8b70] uppercase">
                High Jewelry Atelier · Paris
              </span>
            </a>

            <p className="text-xs text-[#998873] leading-relaxed max-w-sm">
              Dedicated to crafting non-reproducible high jewelry in 18K solid gold, unheated Colombian emeralds, and rare GIA-graded diamonds. Every creation is forged with soft warm lighting considerations in Place Vendôme.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
              <span>GIA & Kimberley Process Verified Sourcing</span>
            </div>
          </div>

          {/* Col 2: High Collections */}
          <div className="space-y-3">
            <h4 className="font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              High Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#a08f79]">
              <li>
                <button onClick={() => onSelectCategory('diamonds')} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  High Diamonds
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('gold')} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Aura Solid Gold
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('emeralds')} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Royal Colombian Emeralds
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('pearls')} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Heritage South Sea Pearls
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bridal')} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Bridal & Engagement
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Bespoke */}
          <div className="space-y-3">
            <h4 className="font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Atelier Services
            </h4>
            <ul className="space-y-2 text-xs text-[#a08f79]">
              <li>
                <a href="#bespoke-studio" className="hover:text-[#f3e5ab] transition-colors">
                  Bespoke Customizer
                </a>
              </li>
              <li>
                <button onClick={onOpenConsultation} className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Book Private Salon Visit
                </button>
              </li>
              <li>
                <a href="#diamond-guide" className="hover:text-[#f3e5ab] transition-colors">
                  GIA 4Cs Masterclass
                </a>
              </li>
              <li>
                <span className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Lifetime Restoration & Polish
                </span>
              </li>
              <li>
                <span className="hover:text-[#f3e5ab] transition-colors cursor-pointer">
                  Armored Worldwide Transport
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Global Salons */}
          <div className="space-y-3">
            <h4 className="font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
              Global Salons
            </h4>
            <ul className="space-y-2 text-xs text-[#a08f79]">
              {BOUTIQUES.map((b) => (
                <li key={b.city} className="flex items-center gap-1.5">
                  <span>{b.flag}</span>
                  <span className="text-[#c2b29c] font-medium">{b.city}:</span>
                  <span className="truncate">{b.name.split('—')[1] || b.name}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1e1813] flex flex-col sm:flex-row items-center justify-between text-xs text-[#80705d] gap-4">
          <p>© {new Date().getFullYear()} AURA MAISON HIGH JEWELRY ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Heritage</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">GIA Certificate Verification</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
