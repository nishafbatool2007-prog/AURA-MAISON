import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { JEWELRY_CATALOG, JewelryItem, CurrencyKey, formatPrice } from '../data/jewelryData';

interface AIStylistDrawerProps {
  currentCurrency: CurrencyKey;
  onClose: () => void;
  onQuickView: (item: JewelryItem) => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  recommendedItem?: JewelryItem;
}

export const AIStylistDrawer: React.FC<AIStylistDrawerProps> = ({
  currentCurrency,
  onClose,
  onQuickView,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Bonjour! I am your Maison AI Fine Jewelry Concierge. Tell me about your upcoming occasion, outfit color, or personal taste, and I shall curate the perfect 18K gold and gemstone pairings for you.'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const QUICK_PROMPTS = [
    'Black Tie Gala with a Velvet Dress',
    '10th Wedding Anniversary Gold Gift',
    'Minimalist Everyday 18K Gold Stacking',
    'Bridal Solitaire for Warm Skin Tones'
  ];

  const handleSend = async (userText: string) => {
    if (!userText.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInputQuery('');
    setLoading(true);

    try {
      // Attempt Gemini API call via client secret or runtime env
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are the chief jewelry stylist for Maison Aura, a ultra-high-end luxury fine jewelry atelier specializing in 18K solid gold, GIA diamonds, emeralds, and pearls.
User request: "${userText}"
Provide an exquisite, warm, sophisticated 2-sentence recommendation highlighting how warm lighting and gold textures complement their look. Mention one of our collections: Crown Cushion Solitaire Ring, Soleil Radiant Sunburst Pendant, Imperiale Emerald Drops, or Sovereign South Sea Pearl Strand.`
        });

        const replyText = response.text || 'An exquisite choice. Warm 18K solid gold with radiant diamond facets captures atmospheric soft lighting with incomparable allure.';
        
        // Match a product
        const matchedItem = JEWELRY_CATALOG.find((item) =>
          userText.toLowerCase().includes('emerald')
            ? item.category === 'emeralds'
            : userText.toLowerCase().includes('pearl')
            ? item.category === 'pearls'
            : userText.toLowerCase().includes('gold')
            ? item.category === 'gold'
            : item.category === 'diamonds'
        ) || JEWELRY_CATALOG[0];

        setMessages([...newMessages, { sender: 'ai', text: replyText, recommendedItem: matchedItem }]);
      } else {
        // High quality fallback stylist engine
        setTimeout(() => {
          let reply = 'For a truly unforgettable appearance, nothing catches candlelight like 18K warm yellow gold paired with brilliant cushion-cut diamonds.';
          let matchedItem = JEWELRY_CATALOG[0];

          if (userText.toLowerCase().includes('gala') || userText.toLowerCase().includes('velvet')) {
            reply = 'For a high-society Gala, our Imperiale Colombian Emerald Drops set on 18K gold offer a regal, mesmerizing contrast against deep velvet.';
            matchedItem = JEWELRY_CATALOG.find(i => i.id === 'emerald-royal-drop') || JEWELRY_CATALOG[3];
          } else if (userText.toLowerCase().includes('anniversary') || userText.toLowerCase().includes('gift')) {
            reply = 'For a landmark 10th Anniversary, the Soleil Radiant Sunburst Pendant in solid 18K fluted gold embodies eternal radiance and romance.';
            matchedItem = JEWELRY_CATALOG.find(i => i.id === 'sunburst-pendant-gold') || JEWELRY_CATALOG[2];
          } else if (userText.toLowerCase().includes('minimalist') || userText.toLowerCase().includes('everyday')) {
            reply = 'For everyday understated luxury, the L’Aura Brilliant Solitaire Band offers clean 18K gold lines with flawless diamond reflection.';
            matchedItem = JEWELRY_CATALOG.find(i => i.id === 'solitaire-classic-gold') || JEWELRY_CATALOG[1];
          }

          setMessages([...newMessages, { sender: 'ai', text: reply, recommendedItem: matchedItem }]);
          setLoading(false);
        }, 800);
      }
    } catch (err) {
      console.warn('Gemini API fallback engaged:', err);
      setMessages([...newMessages, {
        sender: 'ai',
        text: 'An exceptional choice. 18K warm yellow gold and Cushion-cut diamonds create a radiant halo that shines gracefully in any light.',
        recommendedItem: JEWELRY_CATALOG[0]
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0a09]/80 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md bg-[#14100d] border-l border-[#3a3027] h-full flex flex-col shadow-2xl">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#2a221b] flex items-center justify-between bg-[#0f0d0b]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-[#2a2119] text-[#d4af37]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="font-headline font-semibold text-base text-[#f7f2e9]">
                Maison AI Concierge
              </h3>
              <p className="font-garamond italic text-xs text-[#a08f79]">
                Personalized High Jewelry Stylist
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

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-garamond text-sm text-[#e0d6c8]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#2a2119] border border-[#3d3125] flex items-center justify-center shrink-0 text-[#d4af37]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div className="space-y-3 max-w-[80%]">
                <div
                  className={`p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#d4af37] text-[#0b0a09] font-headline font-medium text-xs rounded-tr-none'
                      : 'bg-[#1b1612] border border-[#2e251e] text-[#f7f2e9] leading-relaxed rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Recommended Jewelry Card */}
                {m.recommendedItem && (
                  <div
                    onClick={() => {
                      onQuickView(m.recommendedItem!);
                      onClose();
                    }}
                    className="p-3 bg-[#0d0a08] border border-[#382c21] hover:border-[#d4af37] rounded-xl flex items-center gap-3 cursor-pointer group transition-colors"
                  >
                    <img
                      src={m.recommendedItem.image}
                      alt={m.recommendedItem.name}
                      className="w-14 h-14 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block font-headline text-xs font-semibold text-[#f7f2e9] truncate group-hover:text-[#d4af37]">
                        {m.recommendedItem.name}
                      </span>
                      <span className="font-headline font-bold text-xs text-[#f3e5ab]">
                        {formatPrice(m.recommendedItem.priceUSD, currentCurrency)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#1e1914] border border-[#3a3027] flex items-center justify-center shrink-0 text-[#f3e5ab]">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 font-garamond italic text-xs text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Curating recommendations from Place Vendôme archives...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2 border-t border-[#2a221b] bg-[#0f0d0b]">
          <span className="block font-garamond italic text-[11px] text-[#998873] mb-1.5">
            Suggested Consultations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-[#18130f] hover:bg-[#282018] border border-[#2e241c] hover:border-[#d4af37] rounded text-[11px] font-garamond text-[#c2b29c] transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#2a221b] bg-[#0d0a08] flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputQuery)}
            placeholder="Ask about skin tones, outfits, gold specs..."
            className="flex-1 py-2.5 px-4 bg-[#18130f] border border-[#2e241c] rounded-full font-garamond text-sm text-[#f3e5ab] focus:border-[#d4af37] outline-none"
          />
          <button
            onClick={() => handleSend(inputQuery)}
            className="p-2.5 bg-[#d4af37] text-[#0b0a09] rounded-full hover:bg-[#f3e5ab] transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
