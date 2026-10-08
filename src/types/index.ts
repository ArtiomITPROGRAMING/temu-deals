export type DealStatus = 'super_deal' | 'good_price' | 'normal_price' | 'high_price';

export interface PricePoint {
  date: string; // YYYY-MM-DD
  price: number;
}

export interface StoreOffer {
  storeId: string;
  storeName: string;
  storeLogo?: string;
  price: number;
  oldPrice: number;
  url: string;
  inStock: boolean;
  deliveryDays: number;
  freeDelivery: boolean;
  cashbackPercent?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  pros?: string;
  cons?: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  brand: string;
  image: string;
  images?: string[];
  description: string;
  currentPrice: number;
  oldPrice: number;
  store: string;
  storeUrl: string;
  rating: number;
  reviewsCount: number;
  freeDelivery: boolean;
  history: PricePoint[]; // historical price data
  storeOffers: StoreOffer[];
  specs: Record<string, string>;
  reviews: Review[];
  updatedAt: string;
  isHot?: boolean;
}

export interface AnalyzedDeal {
  product: Product;
  shopDiscountPercent: number;
  averagePrice90d: number;
  minPriceHistorical: number;
  maxPriceHistorical: number;
  realSavings: number;
  realDiscountPercent: number;
  dealStatus: DealStatus;
  statusLabel: string;
  statusBadge: string;
  statusColor: string;
  dealScore: number; // 0 to 100
  verdict: string;
  isArtificialDiscount: boolean;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  targetPrice: number;
  currentPrice: number;
  contactMethod: 'email' | 'telegram' | 'push';
  contactValue: string;
  createdAt: string;
  isActive: boolean;
}

export interface NotificationItem {
  id: string;
  productId?: string;
  title: string;
  message: string;
  date: string;
  type: 'price_drop' | 'target_reached' | 'fav_discount' | 'promo';
  read: boolean;
  oldPrice?: number;
  newPrice?: number;
  discountPercent?: number;
}

export type Currency = 'RUB' | 'USD' | 'EUR' | 'KZT';

export interface CartItem {
  id: string; // cart item unique id
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: string;
}

export interface TemuAddress {
  fullName: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
}

export interface TemuOrder {
  id: string;
  temuOrderId: string;
  items: CartItem[];
  totalPrice: number;
  currency: Currency;
  status: 'paid' | 'shipped' | 'delivered' | 'processing';
  statusLabel: string;
  trackingNumber?: string;
  estimatedDelivery: string;
  createdAt: string;
}

export interface TemuAccount {
  isConnected: boolean;
  emailOrPhone: string;
  name: string;
  avatar?: string;
  shippingAddress?: TemuAddress;
  linkedAt?: string;
  orders: TemuOrder[];
}

export type AdapterTier = 'direct_gateway' | 'cors_mesh' | 'deep_resolver' | 'heuristic_synthesis';
export type CircuitBreakerState = 'closed' | 'half_open' | 'open';
export type NetworkQuality = '4g' | '3g' | '2g' | 'offline' | 'unknown';
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface RegionalConfig {
  countryCode: string;
  countryName: string;
  defaultCurrency: Currency;
  customsDutyLimitEur: number;
  estimatedDeliveryDays: string;
  freeShippingThreshold: number;
}

export interface AdaptiveEngineMetrics {
  activeTier: AdapterTier;
  tierName: string;
  latencyMs: number;
  reliabilityPercent: number;
  antiBotEvasionScore: number; // 0 to 100
  totalRequests: number;
  bypassedRequests: number;
  circuitBreakerState: CircuitBreakerState;
  networkMode: 'turbo' | 'adaptive' | 'low_data';
  activeRegion: RegionalConfig;
  activeDevice: DeviceType;
  lastSyncTimestamp: string;
}

export interface AdaptiveLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'success' | 'evasion';
  tier: AdapterTier;
  message: string;
}

