import React, { useState, useEffect } from 'react';
import { Product, Currency, TemuAccount } from '../types';
import { HeroSection } from './HeroSection';
import { CategoriesSection } from './CategoriesSection';
import { ProductCard } from './ProductCard';
import {
  Flame,
  Bell,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  ShoppingBag,
  Truck,
  Clock,
  CheckCircle2,
  RefreshCw,
  Zap,
  Tag,
  Link2,
} from 'lucide-react';

interface HomeViewProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onSelectCategory: (categoryName: string) => void;
  selectedCategory: string;
  onOpenDetails: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  onNavigateToBestDeals: () => void;
  onOpenHowItWorks: () => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
  onOpenTemuAnalyzer?: () => void;
  temuAccount: TemuAccount;
  onOpenTemuAuth: () => void;
  onImportToTemu: (product: Product) => void;
  onSyncCartWithTemu?: () => void;
  temuSyncedProductIds?: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onSelectCategory,
  selectedCategory,
  onOpenDetails,
  favorites,
  onToggleFavorite,
  onNavigateToBestDeals,
  onOpenHowItWorks,
  currency = 'RUB',
  onAddToCart,
  onOpenTemuAnalyzer,
  temuAccount,
  onOpenTemuAuth,
  onImportToTemu,
  onSyncCartWithTemu,
  temuSyncedProductIds = [],
}) => {
  // Flash deals tab filter
  const [dealTab, setDealTab] = useState<'all' | 'under99' | 'under199' | 'under499' | 'discount90' | 'temuChoice'>('all');
  const [syncing, setSyncing] = useState(false);

  // Live countdown timer for Temu Lightning Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 44, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      if (onSyncCartWithTemu) onSyncCartWithTemu();
    }, 900);
  };

  // Filter products by selected Temu deal tab
  const filteredProducts = products.filter((p) => {
    if (dealTab === 'under99') return p.currentPrice <= 99;
    if (dealTab === 'under199') return p.currentPrice <= 199;
    if (dealTab === 'under499') return p.currentPrice <= 499;
    if (dealTab === 'discount90') {
      const discount = Math.round(((p.oldPrice - p.currentPrice) / p.oldPrice) * 100);
      return discount >= 85;
    }
    if (dealTab === 'temuChoice') {
      return p.store === 'Temu' || p.brand.toLowerCase().includes('temu');
    }
    return true;
  });

  // Top ultra-cheap lightning products (under 200 RUB)
  const lightningDeals = products
    .filter((p) => p.currentPrice <= 199 || p.store === 'Temu')
    .sort((a, b) => a.currentPrice - b.currentPrice)
    .slice(0, 8);

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* 1. Temu Flash Sale Top Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-black tracking-wide">
            <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-orange-950 text-[10px] uppercase font-black animate-pulse">
              TEMU FLASH
            </span>
            <span>⚡ МОЛНИЕНОСНЫЕ СКИДКИ ДО 95% • ФАБРИЧНЫЕ ЦЕНЫ ОТ 29 ₽</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-xl backdrop-blur-xs">
              <Clock className="w-3.5 h-3.5 text-yellow-300" />
              <span>До смены цен:</span>
              <span className="font-mono font-black text-yellow-300">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 text-orange-100">
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Бесплатная доставка от 0 ₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Hero Search Banner */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={onSearchSubmit}
        onTagClick={(tag) => {
          setSearchQuery(tag);
          onSearchSubmit(tag);
        }}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* 3. Temu Live Account Synchronization Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-zinc-900 text-white p-5 sm:p-7 shadow-xl relative overflow-hidden border border-slate-700/50">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                TM
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-xl font-black">
                    {temuAccount.isConnected
                      ? `Аккаунт Temu синхронизирован: ${temuAccount.name}`
                      : 'Привяжите ваш аккаунт Temu'}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      temuAccount.isConnected
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        temuAccount.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    {temuAccount.isConnected ? 'Синхронизировано' : 'Требуется привязка'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {temuAccount.isConnected
                    ? `Адрес доставки: ${
                        temuAccount.shippingAddress?.fullName
                          ? `${temuAccount.shippingAddress.city ? temuAccount.shippingAddress.city + ', ' : ''}${temuAccount.shippingAddress.street}`
                          : 'не указан (нажмите для добавления)'
                      } • Заказов: ${temuAccount.orders.length} шт. Экспорт товаров прямо в корзину Temu активен.`
                    : 'Сквозной экспорт товаров со скидками до 95% прямо в корзину Temu и быстрое оформление покупок.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              {temuAccount.isConnected ? (
                <>
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={syncing}
                    className="flex-1 sm:flex-initial px-4 py-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    title="Обновить состояние корзины и адреса из Temu"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                    <span>{syncing ? 'Синхронизация...' : 'Синхронизировать корзину'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenTemuAuth}
                    className="px-4 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all shadow-md shadow-orange-500/25 cursor-pointer"
                  >
                    Кабинет Temu
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onOpenTemuAuth}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>⚡ Привязать аккаунт Temu</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 4. Lightning Deals Reel: Суперцены от 29 ₽ (Horizontal / Compact Reel) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Zap className="w-4 h-4 fill-orange-500 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                  ⚡ Товары по суперценам от 29 ₽
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Прямые поставки от китайских фабрик с мгновенным импортом в Temu
                </p>
              </div>
            </div>

            {onOpenTemuAnalyzer && (
              <button
                type="button"
                onClick={onOpenTemuAnalyzer}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Проверить ссылку с Temu</span>
              </button>
            )}
          </div>

          {/* Quick Price Tabs like Temu */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setDealTab('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'all'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🔥 Все супер-акции
            </button>
            <button
              type="button"
              onClick={() => setDealTab('under99')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'under99'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🏷️ До 99 ₽ (Почти даром)
            </button>
            <button
              type="button"
              onClick={() => setDealTab('under199')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'under199'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              ⚡ До 199 ₽
            </button>
            <button
              type="button"
              onClick={() => setDealTab('under499')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'under499'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              💥 До 499 ₽
            </button>
            <button
              type="button"
              onClick={() => setDealTab('discount90')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'discount90'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🎁 Скидки 90%+
            </button>
            <button
              type="button"
              onClick={() => setDealTab('temuChoice')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                dealTab === 'temuChoice'
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              ⭐ Выбор Temu
            </button>
          </div>

          {/* Cards Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5 mt-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenDetails={onOpenDetails}
                isFavorite={favorites.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                currency={currency}
                onAddToCart={onAddToCart}
                onImportToTemu={onImportToTemu}
                isTemuSynced={temuSyncedProductIds.includes(p.id)}
              />
            ))}
          </div>
        </div>

        {/* 5. Info Banner «Как работает прямой выкуп из Temu» */}
        <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 sm:p-8 text-white shadow-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0 backdrop-blur-md">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                Единая корзина и оплата прямо на серверах Temu
              </h3>
              <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
                Выбирайте товары по сверхнизким ценам в DealFinder, добавляйте в корзину и выкупайте их под вашим аккаунтом Temu с бесплатной международной доставкой.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-orange-700 hover:bg-orange-50 shadow-md transition-all shrink-0 cursor-pointer"
          >
            Подробнее о выкупе
          </button>
        </div>

        {/* 6. «Популярные категории» Section */}
        <CategoriesSection
          onSelectCategory={onSelectCategory}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};
