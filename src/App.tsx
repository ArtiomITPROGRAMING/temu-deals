import React, { useState, useEffect } from 'react';
import {
  Product,
  PriceAlert,
  NotificationItem,
  CartItem,
  Currency,
  TemuAccount,
  TemuOrder,
} from './types';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { mockNotifications } from './services/dealsApi';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { BestDealsView } from './components/BestDealsView';
import { FavoritesView } from './components/FavoritesView';
import { ComparisonView } from './components/ComparisonView';
import { PriceHistoryView } from './components/PriceHistoryView';
import { NotificationsView } from './components/NotificationsView';
import { AccountView } from './components/AccountView';
import { ProductModal } from './components/ProductModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { TemuLinkAnalyzerModal } from './components/TemuLinkAnalyzerModal';
import { CartDrawer } from './components/CartDrawer';
import { TemuAuthModal } from './components/TemuAuthModal';
import { AdaptiveEngineModal } from './components/AdaptiveEngineModal';
import { BottomNav } from './components/BottomNav';
import { trackEvent } from './services/firebase';
import { formatPrice } from './services/currency';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation
  const [activeView, setActiveView] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Currency
  const [currency, setCurrency] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_currency');
      return (saved as Currency) || 'RUB';
    } catch {
      return 'RUB';
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [alertModalProduct, setAlertModalProduct] = useState<Product | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState<boolean>(false);
  const [temuAnalyzerOpen, setTemuAnalyzerOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTemuAuthOpen, setIsTemuAuthOpen] = useState<boolean>(false);
  const [adaptiveEngineOpen, setAdaptiveEngineOpen] = useState<boolean>(false);

  // Cart State with LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_cart');
      if (saved) return JSON.parse(saved);
      // Default demo item in cart from Temu
      const firstTemu = MOCK_PRODUCTS.find((p) => p.store === 'Temu') || MOCK_PRODUCTS[0];
      return [
        {
          id: 'cart-init-1',
          product: firstTemu,
          quantity: 1,
          addedAt: new Date().toISOString(),
        },
      ];
    } catch {
      return [];
    }
  });

  // Temu Synced Account with LocalStorage
  const [temuAccount, setTemuAccount] = useState<TemuAccount>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_temu_account');
      if (saved) return JSON.parse(saved);
      return {
        isConnected: true,
        emailOrPhone: '+7 (926) 482-19-02',
        name: 'Александр В.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        shippingAddress: {
          fullName: 'Александр Васильев',
          phone: '+7 (926) 482-19-02',
          country: 'Россия',
          city: 'Москва',
          street: 'ул. Тверская, д. 12, кв. 45',
          postalCode: '125009',
        },
        linkedAt: '2026-10-06T12:00:00Z',
        orders: [
          {
            id: 'ord-101',
            temuOrderId: 'TM-94819204',
            items: [],
            totalPrice: 1998,
            currency: 'RUB',
            status: 'shipped',
            statusLabel: 'В пути (Авиаперевозка из Китая)',
            trackingNumber: 'LP00694829104CN',
            estimatedDelivery: '14-18 октября',
            createdAt: '2026-10-06T15:20:00Z',
          },
          {
            id: 'ord-102',
            temuOrderId: 'TM-83719284',
            items: [],
            totalPrice: 3450,
            currency: 'RUB',
            status: 'delivered',
            statusLabel: 'Доставлен в пункт выдачи CDEK',
            trackingNumber: 'LP00583719284CN',
            estimatedDelivery: '28 сентября',
            createdAt: '2026-09-22T10:10:00Z',
          },
        ],
      };
    } catch {
      return {
        isConnected: false,
        emailOrPhone: '',
        name: '',
        orders: [],
      };
    }
  });

  // User Favorites with LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_favs');
      return saved ? JSON.parse(saved) : ['p-1', 'p-2', 'p-3'];
    } catch {
      return ['p-1', 'p-2', 'p-3'];
    }
  });

  // Price Alerts with LocalStorage
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_alerts');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'alt-1',
              productId: 'p-1',
              productTitle: 'Беспроводные наушники Pro 4 TWS',
              productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
              targetPrice: 900,
              currentPrice: 999,
              contactMethod: 'telegram',
              contactValue: '@alex_deal',
              createdAt: '2026-10-06T12:00:00Z',
              isActive: true,
            },
            {
              id: 'alt-2',
              productId: 'p-2',
              productTitle: 'Видеокарта Palit GeForce RTX 3060 Dual 12GB',
              productImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
              targetPrice: 24000,
              currentPrice: 24990,
              contactMethod: 'telegram',
              contactValue: '@alex_deal',
              createdAt: '2026-10-07T14:30:00Z',
              isActive: true,
            },
          ];
    } catch {
      return [];
    }
  });

  const [viewHistory, setViewHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_history');
      return saved ? JSON.parse(saved) : ['p-1', 'p-2', 'p-4', 'p-7'];
    } catch {
      return ['p-1', 'p-2', 'p-4', 'p-7'];
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dealfinder_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('dealfinder_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dealfinder_temu_account', JSON.stringify(temuAccount));
  }, [temuAccount]);

  useEffect(() => {
    localStorage.setItem('dealfinder_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dealfinder_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const [temuSyncedProductIds, setTemuSyncedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dealfinder_temu_synced_ids');
      return saved ? JSON.parse(saved) : ['p-temu-cheap-1', 'p-temu-cheap-2'];
    } catch {
      return ['p-temu-cheap-1', 'p-temu-cheap-2'];
    }
  });

  useEffect(() => {
    localStorage.setItem('dealfinder_history', JSON.stringify(viewHistory));
  }, [viewHistory]);

  useEffect(() => {
    localStorage.setItem('dealfinder_temu_synced_ids', JSON.stringify(temuSyncedProductIds));
  }, [temuSyncedProductIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          product,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });
    showToast(`Товар "${product.title.slice(0, 25)}..." добавлен в корзину Temu`);
    trackEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.title,
      price: product.currentPrice,
      currency,
    });
  };

  // Direct Temu 1-Click Import Handler
  const handleImportToTemu = (product: Product) => {
    handleAddToCart(product, 1);
    setTemuSyncedProductIds((prev) => Array.from(new Set([...prev, product.id])));

    if (temuAccount.isConnected) {
      showToast(`Товар "${product.title.slice(0, 22)}..." импортирован в корзину Temu!`);
      trackEvent('import_to_temu', {
        product_id: product.id,
        title: product.title,
        price: product.currentPrice,
        account: temuAccount.name,
      });
    } else {
      showToast('Товар добавлен! Привяжите аккаунт Temu для завершения импорта');
      setIsTemuAuthOpen(true);
    }
  };

  const handleSyncCartToTemu = () => {
    if (cart.length === 0) {
      showToast('Корзина пуста — добавьте товары для синхронизации');
      return;
    }
    const ids = cart.map((i) => i.product.id);
    setTemuSyncedProductIds((prev) => Array.from(new Set([...prev, ...ids])));
    showToast(`Корзина (${cart.length} тов.) синхронизирована с серверами Temu!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Товар удален из корзины');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckoutTemu = () => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + item.product.currentPrice * item.quantity, 0);
    const newOrderId = `TM-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: TemuOrder = {
      id: `ord-${Date.now()}`,
      temuOrderId: newOrderId,
      items: [...cart],
      totalPrice: totalAmount,
      currency,
      status: 'shipped',
      statusLabel: 'Оплачен и готовится к отправке',
      trackingNumber: `LP00${Math.floor(100000000 + Math.random() * 900000000)}CN`,
      estimatedDelivery: 'Через 7-12 дней',
      createdAt: new Date().toISOString(),
    };

    setTemuAccount((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }));

    trackEvent('purchase', {
      transaction_id: newOrderId,
      value: totalAmount,
      currency,
      items_count: cart.length,
    });
  };

  // Favorites Handlers
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Удалено из избранного: ${product.brand}`);
        trackEvent('remove_from_wishlist', { item_id: product.id, item_name: product.title });
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Добавлено в избранное: ${product.brand}`);
        trackEvent('add_to_wishlist', {
          item_id: product.id,
          item_name: product.title,
          price: product.currentPrice,
        });
        return [...prev, product.id];
      }
    });
  };

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
    trackEvent('view_item', {
      item_id: product.id,
      item_name: product.title,
      price: product.currentPrice,
      category: product.category,
    });
    // Add to view history
    setViewHistory((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 20));
  };

  const handleOpenPriceAlert = (product: Product) => {
    setAlertModalProduct(product);
    setAlertModalOpen(true);
  };

  const handleSaveAlert = (newAlert: PriceAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
    trackEvent('set_price_alert', {
      item_id: newAlert.productId,
      target_price: newAlert.targetPrice,
      channel: newAlert.contactMethod,
    });
    showToast(`Оповещение настроено: цель ${formatPrice(newAlert.targetPrice, currency)}`);
  };

  const handleRemoveAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast('Оповещение удалено');
  };

  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    setActiveView('search');
    trackEvent('search', { search_term: query });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    setActiveView('search');
    trackEvent('select_category', { category: catName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Все уведомления прочитаны');
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    showToast('Список уведомлений очищен');
  };

  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (item.productId) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) handleOpenDetails(prod);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        favoritesCount={favorites.length}
        unreadNotificationsCount={unreadCount}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setActiveView('search')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onExecuteSearch={handleExecuteSearch}
        onOpenTemuAnalyzer={() => setTemuAnalyzerOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        temuAccount={temuAccount}
        onOpenTemuAuth={() => setIsTemuAuthOpen(true)}
        onOpenAdaptiveEngine={() => setAdaptiveEngineOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-20 md:pb-0">
        {activeView === 'home' && (
          <HomeView
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchSubmit={handleExecuteSearch}
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
            onOpenDetails={handleOpenDetails}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToBestDeals={() => setActiveView('best-deals')}
            onOpenHowItWorks={() => setHowItWorksOpen(true)}
            currency={currency}
            onAddToCart={handleAddToCart}
            onOpenTemuAnalyzer={() => setTemuAnalyzerOpen(true)}
            temuAccount={temuAccount}
            onOpenTemuAuth={() => setIsTemuAuthOpen(true)}
            onImportToTemu={handleImportToTemu}
            onSyncCartWithTemu={handleSyncCartToTemu}
            temuSyncedProductIds={temuSyncedProductIds}
          />
        )}

        {activeView === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Все категории товаров
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Выберите категорию, чтобы найти товары с максимальной реальной экономией
            </p>
            <SearchView
              products={products}
              searchQuery=""
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenDetails={handleOpenDetails}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              currency={currency}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {activeView === 'search' && (
          <SearchView
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenDetails={handleOpenDetails}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'best-deals' && (
          <BestDealsView
            products={products}
            onOpenDetails={handleOpenDetails}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'comparison' && (
          <ComparisonView
            products={products}
            onOpenDetails={handleOpenDetails}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'price-history' && (
          <PriceHistoryView
            products={products}
            onOpenDetails={handleOpenDetails}
            onOpenPriceAlert={handleOpenPriceAlert}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'favorites' && (
          <FavoritesView
            products={products}
            favorites={favorites}
            onOpenDetails={handleOpenDetails}
            onRemoveFavorite={handleToggleFavorite}
            onNavigateHome={() => setActiveView('home')}
            currency={currency}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeView === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            onSelectNotification={handleSelectNotification}
            onClearNotifications={handleClearNotifications}
          />
        )}

        {activeView === 'account' && (
          <AccountView
            products={products}
            favorites={favorites}
            alerts={alerts}
            viewHistory={viewHistory}
            onOpenDetails={handleOpenDetails}
            onToggleFavorite={handleToggleFavorite}
            onRemoveAlert={handleRemoveAlert}
            currency={currency}
            temuAccount={temuAccount}
            onOpenTemuAuth={() => setIsTemuAuthOpen(true)}
            onAddToCart={handleAddToCart}
            onImportToTemu={handleImportToTemu}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenPriceAlert={(p) => {
          setProductModalOpen(false);
          handleOpenPriceAlert(p);
        }}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      <PriceAlertModal
        product={alertModalProduct || products[0]}
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        onSaveAlert={handleSaveAlert}
      />

      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
      />

      <TemuLinkAnalyzerModal
        isOpen={temuAnalyzerOpen}
        onClose={() => setTemuAnalyzerOpen(false)}
        onAddProduct={(newProd) => {
          setProducts((prev) => [newProd, ...prev.filter((p) => p.id !== newProd.id)]);
          showToast('Товар с Temu добавлен в каталог!');
          trackEvent('add_temu_product', { id: newProd.id, title: newProd.title });
        }}
        onOpenDetails={handleOpenDetails}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        temuAccount={temuAccount}
        onOpenTemuAuth={() => {
          setIsCartOpen(false);
          setIsTemuAuthOpen(true);
        }}
        currency={currency}
        onCheckoutTemu={handleCheckoutTemu}
      />

      {/* Temu Account Sync Modal */}
      <TemuAuthModal
        isOpen={isTemuAuthOpen}
        onClose={() => setIsTemuAuthOpen(false)}
        temuAccount={temuAccount}
        onUpdateTemuAccount={setTemuAccount}
        onShowToast={showToast}
      />

      {/* Adaptive Engine Modal */}
      <AdaptiveEngineModal
        isOpen={adaptiveEngineOpen}
        onClose={() => setAdaptiveEngineOpen(false)}
        onRegionChange={(reg) => {
          setCurrency(reg.defaultCurrency);
          showToast(`Регион обновлен: ${reg.countryName} (${reg.defaultCurrency})`);
        }}
      />

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTemuAnalyzer={() => setTemuAnalyzerOpen(true)}
        favoritesCount={favorites.length}
      />
    </div>
  );
};

export default App;
