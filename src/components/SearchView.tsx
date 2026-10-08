import React, { useState, useMemo } from 'react';
import { Product, Currency } from '../types';
import { ProductCard } from './ProductCard';
import { analyzeDeal } from '../services/dealAnalyzer';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw,
  Check,
  Flame,
  Truck,
  Filter,
} from 'lucide-react';

interface SearchViewProps {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenDetails: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

type SortOption = 'best_real_deal' | 'biggest_discount' | 'lowest_price' | 'highest_rating' | 'newest';

export const SearchView: React.FC<SearchViewProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenDetails,
  favorites,
  onToggleFavorite,
  currency = 'RUB',
  onAddToCart,
}) => {
  // Filter states
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [onlyRealDeals, setOnlyRealDeals] = useState<boolean>(false);
  const [onlyFreeDelivery, setOnlyFreeDelivery] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('best_real_deal');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Available stores
  const storeList = useMemo(() => {
    const set = new Set(products.map(p => p.store));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Available categories
  const categoryList = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const deal = analyzeDeal(p);

      // Search query filter (title, category, brand, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category
      if (selectedCategory !== 'all' && selectedCategory !== '' && p.category !== selectedCategory) {
        return false;
      }

      // Price range
      if (minPrice && p.currentPrice < Number(minPrice)) return false;
      if (maxPrice && p.currentPrice > Number(maxPrice)) return false;

      // Discount size
      if (minDiscount > 0 && deal.shopDiscountPercent < minDiscount) return false;

      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      // Store
      if (selectedStore !== 'all' && p.store !== selectedStore) return false;

      // Only real deals
      if (onlyRealDeals && (deal.dealStatus !== 'super_deal' && deal.dealStatus !== 'good_price')) {
        return false;
      }

      // Free delivery
      if (onlyFreeDelivery && !p.freeDelivery) return false;

      return true;
    }).sort((a, b) => {
      const dealA = analyzeDeal(a);
      const dealB = analyzeDeal(b);

      switch (sortBy) {
        case 'best_real_deal':
          return dealB.dealScore - dealA.dealScore;
        case 'biggest_discount':
          return dealB.shopDiscountPercent - dealA.shopDiscountPercent;
        case 'lowest_price':
          return a.currentPrice - b.currentPrice;
        case 'highest_rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    minDiscount,
    minRating,
    selectedStore,
    onlyRealDeals,
    onlyFreeDelivery,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinDiscount(0);
    setMinRating(0);
    setSelectedStore('all');
    setSelectedCategory('all');
    setOnlyRealDeals(false);
    setOnlyFreeDelivery(false);
    setSortBy('best_real_deal');
  };

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Search & Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {searchQuery ? `Результаты поиска: «${searchQuery}»` : 'Каталог всех предложений'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Найдено <span className="font-bold text-slate-900">{filteredProducts.length}</span> товаров со скидками
            {selectedCategory !== 'all' && ` в категории «${selectedCategory}»`}
          </p>
        </div>

        {/* Mobile Filter Trigger & Sort dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden py-2 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold flex items-center gap-2 text-slate-700 shadow-2xs"
          >
            <Filter className="w-4 h-4 text-orange-500" />
            <span>Фильтры</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 hidden sm:inline">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs font-semibold text-slate-800 bg-transparent outline-hidden cursor-pointer"
            >
              <option value="best_real_deal">Лучшая реальная выгода 🔥</option>
              <option value="biggest_discount">Самая большая скидка %</option>
              <option value="lowest_price">Самая низкая цена</option>
              <option value="highest_rating">Лучший рейтинг ★</option>
              <option value="newest">Новинки</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters (Left) + Product Cards (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Sidebar Filters */}
        <div
          className={`md:col-span-4 lg:col-span-3 space-y-5 ${
            mobileFilterOpen ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-slate-900">Фильтры</h3>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-slate-400 hover:text-orange-600 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Сбросить</span>
              </button>
            </div>

            {/* Checkbox: Только реальные скидки */}
            <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-200/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyRealDeals}
                  onChange={(e) => setOnlyRealDeals(e.target.checked)}
                  className="mt-0.5 rounded text-orange-500 focus:ring-orange-400 w-4 h-4 accent-orange-500"
                />
                <div>
                  <span className="text-xs font-bold text-orange-950 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    Только реальные скидки
                  </span>
                  <span className="text-[10px] text-orange-800/80 block mt-0.5 leading-tight">
                    Исключить товары с накрученной старой ценой
                  </span>
                </div>
              </label>
            </div>

            {/* Checkbox: Бесплатная доставка */}
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyFreeDelivery}
                onChange={(e) => setOnlyFreeDelivery(e.target.checked)}
                className="rounded text-orange-500 focus:ring-orange-400 w-4 h-4 accent-orange-500"
              />
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-slate-500" />
                Бесплатная доставка
              </span>
            </label>

            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Цена (₽):
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="От"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-orange-500"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-orange-500"
                />
              </div>
            </div>

            {/* Discount Percentage Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Размер скидки магазина:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 20, 30, 50, 70].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setMinDiscount(d)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                      minDiscount === d
                        ? 'bg-orange-500 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d === 0 ? 'Все' : `от ${d}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Рейтинг товара:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                      minRating === r
                        ? 'bg-orange-500 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r === 0 ? 'Любой' : `★ ${r}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Store Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Магазин / Маркетплейс:
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-hidden focus:border-orange-500"
              >
                <option value="all">Все магазины</option>
                {storeList.filter(s => s !== 'all').map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Категория:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-hidden focus:border-orange-500"
              >
                <option value="all">Все категории</option>
                {categoryList.filter(c => c !== 'all').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="md:col-span-8 lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-5">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpenDetails={onOpenDetails}
                  isFavorite={favorites.includes(p.id)}
                  onToggleFavorite={onToggleFavorite}
                  currency={currency}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ничего не найдено</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Попробуйте изменить поисковый запрос или сбросить установленные фильтры.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xs"
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
