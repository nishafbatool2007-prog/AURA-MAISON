export interface JewelryItem {
  id: string;
  name: string;
  category: 'gold' | 'diamonds' | 'emeralds' | 'pearls' | 'bridal' | 'mens';
  collection: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImages: string[];
  description: string;
  metal: '18K Yellow Gold' | '18K Rose Gold' | '18K White Gold' | 'Platinum';
  gemstone?: string;
  carat?: number;
  clarity?: string;
  colorGrade?: string;
  weightGrams: number;
  inStock: boolean;
  isBestseller?: boolean;
  isNewRelease?: boolean;
  isFeatured?: boolean;
}

export const JEWELRY_CATALOG: JewelryItem[] = [
  {
    id: 'solitaire-halo-ring',
    name: 'The Crown Cushion Solitaire Ring',
    category: 'diamonds',
    collection: 'High Diamonds',
    priceUSD: 14800,
    rating: 4.98,
    reviewsCount: 38,
    image: '/src/assets/images/hero_jewelry_banner_1793345614955.jpg',
    secondaryImages: [
      '/src/assets/images/hero_jewelry_banner_1793345614955.jpg',
      '/src/assets/images/category_diamond_ring_1793345616149.jpg'
    ],
    description: 'A magnificent 2.50ct cushion-cut VVS1 diamond encased in an exquisite 18K yellow gold pavé setting. Crafted to capture the warm soft ambient glow from every optical facet.',
    metal: '18K Yellow Gold',
    gemstone: 'Natural Diamond',
    carat: 2.50,
    clarity: 'VVS1',
    colorGrade: 'D (Colorless)',
    weightGrams: 5.8,
    inStock: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'solitaire-classic-gold',
    name: 'L’Aura Brilliant Solitaire Band',
    category: 'bridal',
    collection: 'Bridal & Solitaires',
    priceUSD: 9400,
    rating: 4.95,
    reviewsCount: 52,
    image: '/src/assets/images/category_diamond_ring_1793345616149.jpg',
    secondaryImages: [
      '/src/assets/images/category_diamond_ring_1793345616149.jpg',
      '/src/assets/images/hero_jewelry_banner_1793345614955.jpg'
    ],
    description: 'Timeless elegance in solid 18K warm yellow gold. Features an ideal round brilliant cut diamond with knife-edge band precision.',
    metal: '18K Yellow Gold',
    gemstone: 'Ethical Diamond',
    carat: 1.80,
    clarity: 'FL (Flawless)',
    colorGrade: 'E',
    weightGrams: 4.6,
    inStock: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 'sunburst-pendant-gold',
    name: 'Soleil Radiant Sunburst Pendant',
    category: 'gold',
    collection: 'Aura Gold',
    priceUSD: 4600,
    rating: 4.92,
    reviewsCount: 64,
    image: '/src/assets/images/category_gold_necklace_1793345615699.jpg',
    secondaryImages: [
      '/src/assets/images/category_gold_necklace_1793345615699.jpg'
    ],
    description: 'Meticulously hand-fluted 18K yellow gold pendant with a central bezel-set diamond accent. Inspired by Mediterranean sunbeams.',
    metal: '18K Yellow Gold',
    gemstone: 'Brilliant Diamond Accent',
    carat: 0.25,
    clarity: 'VS1',
    colorGrade: 'F',
    weightGrams: 12.4,
    inStock: true,
    isNewRelease: true,
    isFeatured: true,
  },
  {
    id: 'emerald-royal-drop',
    name: 'Imperiale Colombian Emerald Drops',
    category: 'emeralds',
    collection: 'Royal Emeralds',
    priceUSD: 18500,
    rating: 5.0,
    reviewsCount: 19,
    image: '/src/assets/images/category_emerald_earrings_1793345617299.jpg',
    secondaryImages: [
      '/src/assets/images/category_emerald_earrings_1793345617299.jpg'
    ],
    description: 'Unheated rare Colombian green emeralds totaling 4.2 carats, enveloped by a brilliant diamond halo set on dark velvet velvet gold prongs.',
    metal: '18K Yellow Gold',
    gemstone: 'Colombian Emerald',
    carat: 4.20,
    clarity: 'VVS Gem Grade',
    colorGrade: 'Vivid Royal Green',
    weightGrams: 9.2,
    inStock: true,
    isFeatured: true,
  },
  {
    id: 'golden-pearl-bracelet',
    name: 'Sovereign Golden South Sea Pearl Strand',
    category: 'pearls',
    collection: 'Heritage Pearls',
    priceUSD: 8900,
    rating: 4.97,
    reviewsCount: 27,
    image: '/src/assets/images/category_pearl_bracelet_1793345616575.jpg',
    secondaryImages: [
      '/src/assets/images/category_pearl_bracelet_1793345616575.jpg'
    ],
    description: 'Rare 12-14mm deep golden South Sea cultured pearls linked with handcrafted 18K filigree gold rings and micro diamond clasps.',
    metal: '18K Yellow Gold',
    gemstone: 'Golden South Sea Pearl',
    carat: 0.15,
    clarity: 'AAA Pearl Luster',
    colorGrade: 'Deep Natural Gold',
    weightGrams: 28.5,
    inStock: true,
    isNewRelease: true,
    isFeatured: true,
  },
  {
    id: 'monarch-emerald-cut-ring',
    name: 'The Monarch Emerald Cut Platinum Band',
    category: 'bridal',
    collection: 'Bridal & Solitaires',
    priceUSD: 22000,
    rating: 4.99,
    reviewsCount: 15,
    image: '/src/assets/images/hero_jewelry_banner_1793345614955.jpg',
    secondaryImages: [
      '/src/assets/images/hero_jewelry_banner_1793345614955.jpg'
    ],
    description: 'Step-cut emerald diamond of 3.10 carats set in solid high-polish Platinum with tapered baguette side diamonds.',
    metal: 'Platinum',
    gemstone: 'Emerald Cut Diamond',
    carat: 3.10,
    clarity: 'IF (Internally Flawless)',
    colorGrade: 'D',
    weightGrams: 7.2,
    inStock: true,
  },
  {
    id: 'mens-signet-sapphire',
    name: 'Atelier Sovereign Gold Signet Ring',
    category: 'mens',
    collection: 'Men\'s Atelier',
    priceUSD: 5200,
    rating: 4.91,
    reviewsCount: 31,
    image: '/src/assets/images/category_gold_necklace_1793345615699.jpg',
    secondaryImages: [
      '/src/assets/images/category_gold_necklace_1793345615699.jpg'
    ],
    description: 'Substantial solid 18K brushed gold signet ring embedded with an unheated Royal Blue Ceylon Sapphire.',
    metal: '18K Yellow Gold',
    gemstone: 'Ceylon Sapphire',
    carat: 1.20,
    clarity: 'VVS',
    colorGrade: 'Royal Velvet Blue',
    weightGrams: 16.8,
    inStock: true,
  },
  {
    id: 'serpente-gold-bangle',
    name: 'Lustra 18K Gold Flexible Diamond Cuff',
    category: 'gold',
    collection: 'Aura Gold',
    priceUSD: 11200,
    rating: 4.96,
    reviewsCount: 44,
    image: '/src/assets/images/category_pearl_bracelet_1793345616575.jpg',
    secondaryImages: [
      '/src/assets/images/category_pearl_bracelet_1793345616575.jpg'
    ],
    description: 'Engineered spring gold mesh that wraps smoothly around the wrist, accented with pavé diamond end caps.',
    metal: '18K Yellow Gold',
    gemstone: 'Diamond Pavé',
    carat: 1.10,
    clarity: 'VVS1',
    colorGrade: 'E',
    weightGrams: 24.0,
    inStock: true,
  }
];

export interface BoutiqueLocation {
  city: string;
  flag: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    city: 'Paris',
    flag: '🇫🇷',
    name: 'Maison Aura — Place Vendôme',
    address: '18 Place Vendôme, 75001 Paris, France',
    phone: '+33 1 42 68 90 00',
    hours: 'Mon–Sat: 10:00 — 19:30'
  },
  {
    city: 'New York',
    flag: '🇺🇸',
    name: 'Maison Aura — Fifth Avenue',
    address: '740 Fifth Avenue, New York, NY 10019',
    phone: '+1 212 555 0192',
    hours: 'Mon–Sat: 10:00 — 19:00, Sun: 12:00 — 17:00'
  },
  {
    city: 'London',
    flag: '🇬🇧',
    name: 'Maison Aura — New Bond Street',
    address: '142 New Bond St, Mayfair, London W1S 2PR',
    phone: '+44 20 7946 0912',
    hours: 'Mon–Sat: 10:00 — 18:30'
  },
  {
    city: 'Tokyo',
    flag: '🇯🇵',
    name: 'Maison Aura — Ginza',
    address: '6-9-5 Ginza, Chuo-ku, Tokyo 104-0061',
    phone: '+81 3 5555 0143',
    hours: 'Daily: 11:00 — 20:00'
  },
  {
    city: 'Dubai',
    flag: '🇦🇪',
    name: 'Maison Aura — Fashion Avenue',
    address: 'The Dubai Mall, Fashion Avenue G-04',
    phone: '+971 4 388 0099',
    hours: 'Daily: 10:00 — 22:00'
  }
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 3.67, name: 'AED' },
  JPY: { symbol: '¥', rate: 154.5, name: 'JPY (¥)' }
};

export type CurrencyKey = keyof typeof CURRENCIES;

export function formatPrice(priceUSD: number, currencyKey: CurrencyKey = 'USD'): string {
  const curr = CURRENCIES[currencyKey] || CURRENCIES.USD;
  const converted = Math.round(priceUSD * curr.rate);
  if (currencyKey === 'JPY') {
    return `${curr.symbol}${converted.toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toLocaleString('en-US')}`;
}
