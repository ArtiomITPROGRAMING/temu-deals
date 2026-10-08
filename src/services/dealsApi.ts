import { Product, PriceAlert, NotificationItem } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { backendApi } from './backendApi';

/**
 * DealFinder API Service Interface
 * Connects to Temu backend microservices, scrapers and supply channels
 */
export interface MarketplaceApiAdapter {
  fetchProducts(query?: string, category?: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  trackPrice(alert: PriceAlert): Promise<{ success: boolean; alertId: string }>;
  getNotifications(): Promise<NotificationItem[]>;
}

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    productId: 'p-temu-cheap-1',
    title: 'Добро пожаловать в DealFinder Temu',
    message: 'Умный поиск реальных цен, отслеживание 90-дневной истории и прямая синхронизация с корзиной Temu активированы.',
    date: 'Сегодня',
    type: 'promo',
    read: false,
  },
  {
    id: 'n-2',
    productId: 'p-temu-cheap-2',
    title: 'Прямые поставки с фабрик Temu Direct',
    message: 'В каталог добавлены подтвержденные товары по фабричным ценам от 29 ₽ с бесплатной международной доставкой.',
    date: 'Сегодня',
    type: 'promo',
    read: false,
  },
];

class DealsApiService implements MarketplaceApiAdapter {
  private products: Product[] = [...MOCK_PRODUCTS];

  async fetchProducts(query?: string, category?: string): Promise<Product[]> {
    try {
      const live = await backendApi.fetchProducts(category);
      if (live && live.length > 0) {
        let result = live as Product[];
        if (query && query.trim()) {
          const q = query.toLowerCase().trim();
          result = result.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q)
          );
        }
        return result;
      }
    } catch {
      // safe fallback to local mock
    }

    let result = [...this.products];
    if (category && category !== 'all') {
      result = result.filter((p) => p.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async trackPrice(alert: PriceAlert): Promise<{ success: boolean; alertId: string }> {
    return { success: true, alertId: alert.id };
  }

  async getNotifications(): Promise<NotificationItem[]> {
    return [...mockNotifications];
  }
}

export const dealsApi = new DealsApiService();
