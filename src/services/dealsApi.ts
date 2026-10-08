import { Product, PriceAlert, NotificationItem } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

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
    productId: 'p-1',
    title: 'Снижение цены на Беспроводные наушники Pro 4',
    message: 'Цена на Беспроводные наушники Pro 4 Bluetooth снизилась на 18% в магазине Temu!',
    date: '10 мин назад',
    type: 'price_drop',
    read: false,
    oldPrice: 1220,
    newPrice: 999,
    discountPercent: 18,
  },
  {
    id: 'n-2',
    productId: 'p-2',
    title: 'Целевая цена достигнута: 4K Проектор Magcubic',
    message: 'Цена на 4K проектор Magcubic в Temu Choice достигла установленной вами цены (2 890 ₽).',
    date: 'Вчера',
    type: 'target_reached',
    read: false,
    oldPrice: 3600,
    newPrice: 2890,
    discountPercent: 20,
  },
  {
    id: 'n-3',
    productId: 'p-3',
    title: 'Найдена скидка 54% на товар из вашего избранного',
    message: 'Механическая клавиатура Redragon K552 теперь доступна всего за 1 799 ₽ на складе Temu.',
    date: '2 дня назад',
    type: 'fav_discount',
    read: true,
    oldPrice: 3899,
    newPrice: 1799,
    discountPercent: 54,
  },
  {
    id: 'n-4',
    productId: 'p-4',
    title: 'Добро пожаловать в DealFinder!',
    message: 'Товары сохранены в избранное. Начните следить за ценами и экономить!',
    date: '3 дня назад',
    type: 'promo',
    read: true,
  },
];

class DealsApiService implements MarketplaceApiAdapter {
  private products: Product[] = [...MOCK_PRODUCTS];

  async fetchProducts(query?: string, category?: string): Promise<Product[]> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 80));

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
