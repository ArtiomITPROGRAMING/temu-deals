/**
 * DealFinder Live Python Backend API Client
 * Connects to live Render.com FastAPI service: https://temu-deals-backend.onrender.com
 */

const DEFAULT_API_URL = 'https://temu-deals-backend.onrender.com';

export const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_BACKEND_URL) ||
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_BACKEND_URL) ||
  DEFAULT_API_URL;

export interface BackendHealthResponse {
  status: string;
  uptime: number;
  database: string;
  temu_gateway: string;
}

export interface BackendDealAnalysis {
  status: string;
  badgeColor: string;
  dealScore: number;
  average90DaysPrice: number;
  lowestPrice: number;
  currentDiscountPercent: number;
  verdict: string;
}

export interface BackendSyncCartResponse {
  success: boolean;
  syncedItemsCount: number;
  temuBasketId: string;
  totalAmount: number;
  freeShipping: boolean;
  checkoutUrl: string;
  message: string;
}

export interface BackendTemuLinkResponse {
  goodsId: string;
  title: string;
  category: string;
  brand: string;
  flashPrice: number;
  retailPrice: number;
  discount: string;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface BackendTemuAuthResponse {
  isConnected: boolean;
  emailOrPhone: string;
  name: string;
  avatar: string;
  shippingAddress: {
    city: string;
    street: string;
    recipient: string;
    phone: string;
  };
  orders: Array<{
    id: string;
    temuOrderId: string;
    itemsCount: number;
    totalPrice: number;
    status: string;
    statusLabel: string;
    trackingNumber: string;
    estimatedDelivery: string;
    createdAt: string;
  }>;
  token: string;
}

class BackendApiService {
  private baseUrl: string = API_BASE_URL;

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public async checkHealth(): Promise<BackendHealthResponse | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/health`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public async fetchProducts(category?: string, maxPrice?: number): Promise<any[] | null> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());

      const url = `${this.baseUrl}/api/products${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public async analyzeDeal(currentPrice: number, oldPrice: number): Promise<BackendDealAnalysis | null> {
    try {
      const url = `${this.baseUrl}/api/analyze-deal?currentPrice=${currentPrice}&oldPrice=${oldPrice}`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public async resolveTemuLink(url: string): Promise<BackendTemuLinkResponse | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/resolve-temu-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public async syncCart(items: Array<{ id: string; title: string; price: number; quantity: number }>): Promise<BackendSyncCartResponse | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/temu/sync-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  public async authTemu(authType: 'phone' | 'email' | 'qr' | 'token', credential: string, code?: string): Promise<BackendTemuAuthResponse | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/temu/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ authType, credential, code }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
}

export const backendApi = new BackendApiService();
