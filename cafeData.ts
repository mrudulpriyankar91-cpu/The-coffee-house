import heroCafeImg from '../assets/images/hero_coffee_house_1794650145675.jpg';
import flatWhiteImg from '../assets/images/menu_espresso_cup_1794650146006.jpg';
import matchaPastryImg from '../assets/images/menu_matcha_pastry_1794650146247.jpg';
import pourOverImg from '../assets/images/menu_pourover_filter_1794650146880.jpg';
import roasteryImg from '../assets/images/roastery_coffee_craft_1794650147127.jpg';

export type MenuCategory =
  | 'All'
  | 'Espresso & Filter'
  | 'Tea & Matcha'
  | 'Bakery & Plates'
  | 'Whole Bean';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'All'>;
  price: number;
  originOrNotes: string;
  description: string;
  servingInfo: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  milkOptions?: boolean;
}

export const CAFE_IMAGES = {
  hero: heroCafeImg,
  roastery: roasteryImg,
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'All',
  'Espresso & Filter',
  'Tea & Matcha',
  'Bakery & Plates',
  'Whole Bean',
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'house-flat-white',
    name: 'House Flat White',
    category: 'Espresso & Filter',
    price: 5.25,
    originOrNotes: 'Huila, Colombia · Dark Cacao, Roasted Hazelnut',
    description: 'Double ristretto pulled at 9 bars with velvety microfoam.',
    servingInfo: '6 oz Ceramic Cup',
    featured: true,
    image: flatWhiteImg,
    imageAlt: 'House flat white with microfoam rosetta in a speckled ceramic cup on pale limestone',
    milkOptions: true,
  },
  {
    id: 'ceremonial-matcha-pairing',
    name: 'Ceremonial Matcha & Cardamom Bun',
    category: 'Tea & Matcha',
    price: 11.50,
    originOrNotes: 'Uji First Harvest · Stone-Milled Spelt',
    description: 'Hand-whisked shade-grown matcha paired with a warm laminated cardamom knot.',
    servingInfo: 'Iced or Hot · Morning Set',
    featured: true,
    image: matchaPastryImg,
    imageAlt: 'Layered ceremonial matcha latte in fluted glass beside a flaky cardamom bun on stoneware',
    milkOptions: true,
  },
  {
    id: 'v60-single-origin',
    name: 'Single-Origin V60 Pour Over',
    category: 'Espresso & Filter',
    price: 6.50,
    originOrNotes: 'Yirgacheffe, Ethiopia · Jasmine, White Peach',
    description: 'Brewed to order over three minutes for floral clarity and tea-like body.',
    servingInfo: '10 oz Glass Carafe',
    featured: true,
    image: pourOverImg,
    imageAlt: 'Hand-poured single-origin filter coffee blooming in a ribbed glass dripper',
    milkOptions: false,
  },
  {
    id: 'double-espresso',
    name: 'Double Espresso',
    category: 'Espresso & Filter',
    price: 4.00,
    originOrNotes: 'Seasonal Blend · Blood Orange, Molasses',
    description: 'Balanced sweetness and syrupy crema dialed in every morning.',
    servingInfo: '2 oz · Sparkling Water Side',
    milkOptions: false,
  },
  {
    id: 'cortado',
    name: 'Cortado',
    category: 'Espresso & Filter',
    price: 4.75,
    originOrNotes: 'Huila, Colombia · Caramel, Almond',
    description: 'Equal parts double espresso and lightly textured steamed milk.',
    servingInfo: '4.5 oz Fluted Glass',
    milkOptions: true,
  },
  {
    id: 'iced-oat-latte',
    name: 'Iced Brown Sugar Oat Latte',
    category: 'Espresso & Filter',
    price: 6.25,
    originOrNotes: 'House Syrup · Madagascar Vanilla',
    description: 'Espresso shaken over crystal ice with barista oat milk and muscovado.',
    servingInfo: '12 oz Iced',
    milkOptions: true,
  },
  {
    id: 'hojicha-latte',
    name: 'Roasted Hojicha Latte',
    category: 'Tea & Matcha',
    price: 5.75,
    originOrNotes: 'Kyoto, Japan · Toasted Chestnut, Cocoa',
    description: 'Slow-roasted green tea leaves whisked smoothly with steamed milk.',
    servingInfo: '10 oz Hot or Iced',
    milkOptions: true,
  },
  {
    id: 'oolong-loose-leaf',
    name: 'High Mountain Alishan Oolong',
    category: 'Tea & Matcha',
    price: 5.25,
    originOrNotes: 'Chiayi, Taiwan · Orchid, Sweet Cream',
    description: 'Whole-leaf spring harvest steeped in a stoneware kyusu teapot.',
    servingInfo: '14 oz Pot · Two Steepings',
    milkOptions: false,
  },
  {
    id: 'cardamom-morning-bun',
    name: 'Laminated Cardamom Knot',
    category: 'Bakery & Plates',
    price: 5.50,
    originOrNotes: 'Cultured Normandy Butter · Freshly Ground Green Cardamom',
    description: 'Baked at 06:00 daily with crisp caramelized edges and tender crumb.',
    servingInfo: 'Baked Fresh Daily',
    milkOptions: false,
  },
  {
    id: 'sourdough-tartine',
    name: 'Whipped Ricotta & Fig Tartine',
    category: 'Bakery & Plates',
    price: 12.50,
    originOrNotes: 'Country Levain · Wildflower Honey, Thyme',
    description: 'Thick-cut toasted sourdough with house ricotta, black mission figs, and flaky salt.',
    servingInfo: 'Served Until 15:00',
    milkOptions: false,
  },
  {
    id: 'almond-frangipane-croissant',
    name: 'Twice-Baked Almond Croissant',
    category: 'Bakery & Plates',
    price: 6.00,
    originOrNotes: 'California Marcona Almond · Rum Simple Syrup',
    description: 'Filled with house almond cream and finished with toasted flaked almonds.',
    servingInfo: 'Baked Fresh Daily',
    milkOptions: false,
  },
  {
    id: 'beans-yirgacheffe',
    name: 'Ethiopia Worka Sakaro (Whole Bean)',
    category: 'Whole Bean',
    price: 22.00,
    originOrNotes: 'Washed · Elevation 2,100m · Bergamot, Honeydew',
    description: 'Light Nordic filter roast packaged in recyclable valve-sealed kraft tins.',
    servingInfo: '250g Bag · Roasted Tuesday',
    milkOptions: false,
  },
  {
    id: 'beans-huila-espresso',
    name: 'Colombia El Paraíso (Whole Bean)',
    category: 'Whole Bean',
    price: 20.00,
    originOrNotes: 'Honey Process · Elevation 1,850m · Milk Chocolate, Plum',
    description: 'Our house espresso lot designed for rich crema at home or office.',
    servingInfo: '250g Bag · Roasted Tuesday',
    milkOptions: false,
  },
];

export const ROASTERY_PILLARS = [
  {
    index: '01.',
    title: 'Direct-Trade Harvests',
    detail:
      'We partner directly with smallholder washing stations in Huila, Gedeb, and Nyeri, paying transparent farmgate premiums above specialty benchmarks.',
  },
  {
    index: '02.',
    title: 'Light Nordic Roasting',
    detail:
      'Roasted every Tuesday in 12 kg batches on our cast-iron drum roaster to preserve origin aromatics, crisp acidity, and natural sweetness without bitterness.',
  },
  {
    index: '03.',
    title: 'Stone-Milled Viennoiserie',
    detail:
      'Our pastry kitchen ferments organic heritage wheat dough for 48 hours and laminates with cultured butter before sunrise each morning.',
  },
];

export const HOURS_LIST = [
  { days: 'Monday – Friday', hours: '07:00 – 18:00' },
  { days: 'Saturday', hours: '08:00 – 19:00' },
  { days: 'Sunday', hours: '08:00 – 17:00' },
];
