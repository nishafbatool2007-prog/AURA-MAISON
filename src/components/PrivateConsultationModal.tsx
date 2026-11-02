import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Check, Wine, ShieldCheck } from 'lucide-react';
import { BOUTIQUES, BoutiqueLocation } from '../data/jewelryData';

interface PrivateConsultationModalProps {
  onClose: () => void;
}

export const PrivateConsultationModal: React.FC<PrivateConsultationModalProps> = ({ onClose }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Paris');
  const [date, setDate] = useState<string>('2026-11-15');
  const [timeSlot, setTimeSlot] = useState<string>('14:00 PM');
  const [champagnePreference, setChampagnePreference] = useState<string>('Dom Pérignon Vintage 2015');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  const activeBoutique = BOUTIQUES.find((b) => b.city === selectedCity) || BOUTIQUES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#14100d] border border-[#3a3027] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a221b] pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-headline font-semibold text-xl text-[#f7f2e9]">
                Private Atelier Appointment
              </h3>
              <p className="font-garamond italic text-xs text-[#a08f79]">
                Exclusive viewing in private salon with champagne service
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#998873] hover:text-[#f3e5ab] hover:bg-[#251f18] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {booked ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1e291e] border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-headline font-bold text-2xl text-[#f7f2e9]">
              Consultation Reserved
            </h4>
            <p className="font-garamond text-base text-[#c2b29c] max-w-md mx-auto">
              Thank you, {fullName || 'Valued Guest'}. A private director from {activeBoutique.name} will contact you shortly to confirm your champagne service and security credentials.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#d4af37] text-[#0b0a09] font-headline font-semibold text-xs uppercase rounded cursor-pointer hover:bg-[#f3e5ab]"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 font-garamond">
            
            {/* City Selector */}
            <div className="space-y-2">
              <label className="block font-headline text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                1. Select Global Boutique
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {BOUTIQUES.map((b) => (
                  <button
                    type="button"
                    key={b.city}
                    onClick={() => setSelectedCity(b.city)}
                    className={`py-2 px-2 text-center rounded font-headline text-xs tracking-wider uppercase transition-all cursor-pointer ${
                      selectedCity === b.city
                        ? 'bg-[#d4af37] text-[#0b0a09] font-bold shadow-md'
                        : 'bg-[#18130f] text-[#8c7a65] border border-[#2a2119] hover:border-[#403225]'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{b.flag}</span>
                    {b.city}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Boutique Info Card */}
            <div className="p-4 bg-[#0b0a09] border border-[#2a221b] rounded-xl text-xs space-y-1 text-[#b09e86]">
              <div className="flex items-center gap-1.5 text-[#f3e5ab] font-headline font-semibold text-sm">
                <MapPin className="w-4 h-4 text-[#d4af37]" /> {activeBoutique.name}
              </div>
              <p>{activeBoutique.address}</p>
              <div className="flex items-center gap-3 pt-1 text-[#d4af37]">
                <span><Clock className="w-3 h-3 inline mr-1" /> {activeBoutique.hours}</span>
                <span>Tel: {activeBoutique.phone}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37]">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37]">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                >
                  <option value="11:00 AM">11:00 AM (Morning Solarium)</option>
                  <option value="14:00 PM">14:00 PM (Afternoon Tea View)</option>
                  <option value="17:00 PM">17:00 PM (Candlelight Sunset)</option>
                  <option value="19:00 PM">19:00 PM (Private Evening)</option>
                </select>
              </div>
            </div>

            {/* Hospitality Preference */}
            <div className="space-y-1">
              <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5" /> Complimentary Salon Refreshment
              </label>
              <select
                value={champagnePreference}
                onChange={(e) => setChampagnePreference(e.target.value)}
                className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
              >
                <option value="Dom Pérignon Vintage 2015">Dom Pérignon Vintage Champagne 2015</option>
                <option value="Krug Grande Cuvée">Krug Grande Cuvée Brut</option>
                <option value="Sparkling Mineral Water & Artisan Macarons">Artisan Sparkling Water & Ladurée Macarons</option>
              </select>
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37]">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Victoria Spencer"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-headline text-xs uppercase tracking-wider text-[#d4af37]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="victoria@spencer.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-[#18130f] border border-[#2e241c] rounded font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] text-[#0b0a09] font-headline font-semibold text-xs tracking-wider uppercase rounded hover:brightness-110 cursor-pointer shadow-lg shadow-[#d4af37]/20"
            >
              Confirm Private Salon Reservation
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
