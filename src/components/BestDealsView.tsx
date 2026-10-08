import React, { useState, useMemo } from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { formatPrice } from '../services/currency';
import {
  Flame,
  Star,
  ExternalLink,
  Heart,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface BestDealsViewProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

export const BestDealsView: React.FC<BestDealsViewProps> = ({
  products,
  onOpenDetails,
  favorites,
  onToggleFavorite,
  currency = 'RUB',
  onAddToCart,
}) => {
  const [filterThreshold, setFilterThreshold] = useState<number>(0);

  const thresholds = [
    { label: 'Все', value: 0 },
    { label: '10%+', value: 10 },
    { label: '20%+', value: 20 },
    { label: '30%+', value: 30 },
    { label: '50%+', value: 50 },
    { label: '70%+', value: 70 },
    { label: '90%+', value: 90 },
  ];

  const analyzedList = useMemo(() => {
    return products
      .map((p) => ({
        product: p,
        deal: analyzeDeal(p),
      }))
      .filter((item) => {
        if (filterThreshold === 0) return true;
        return item.deal.realDiscountPercent >= filterThreshold;
      })
      .sort((a, b) => b.deal.dealScore - a.deal.dealScore);
  }, [products, filterThreshold]);

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 sm:p-10 text-white shadow-xl shadow-orange-500/20 mb-8 overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Рейтинг реальной выгоды</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Лучшие скидки с подтвержденной выгодой
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
            Здесь собраны предложения с максимальным рейтингом выгоды по версии нашего алгоритма.
            Мы проверили историю каждого товара за 90 дней и исключили накрутки.
          </p>
        </div>

        {/* Big subtle flame background */}
        <Flame className="absolute -right-6 -bottom-6 w-48 h-48 text-white/10" />
      </div>

      {/* Filter Tabs by Discount Size */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        <span className="text-xs font-bold text-slate-500 shrink-0">Реальная скидка:</span>
        {thresholds.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setFilterThreshold(t.value)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              filterThreshold === t.value
                ? 'bg-orange-500 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Top Deals List */}
      <div className="space-y-4">
        {analyzedList.map(({ product, deal }, idx) => {
          const isFav = favorites.includes(product.id);
          return (
            <div
              key={product.id}
              onClick={() => onOpenDetails(product)}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-200 shadow-xs hover:shadow-lg transition-all p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 sm:gap-6 cursor-pointer"
            >
              {/* Rank Number & Image */}
              <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
                <div className="w-8 text-center font-black text-lg text-slate-300 group-hover:text-orange-500 transition-colors">
                  #{idx + 1}
                </div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-orange-500 text-white">
                    -{deal.shopDiscountPercent}%
                  </div>
                </div>
              </div>

              {/* Title, Category & Verdict */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">{product.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-700">{product.store}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-1.5">
                  {product.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                  {deal.verdict}
                </p>

                {/* Score Indicator Pill */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      deal.dealScore >= 85
                        ? 'bg-orange-100 text-orange-800 border border-orange-200'
                        : deal.dealScore >= 70
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-600" />
                    <span>
                      {deal.dealScore}/100 — {deal.dealScore >= 85 ? 'Супервыгодно' : deal.dealScore >= 70 ? 'Очень выгодно' : 'Выгодно'}
                    </span>
                  </span>

                  <span className="text-xs text-slate-400">
                    Обычно: <strong className="text-slate-700">{formatPrice(deal.averagePrice90d, currency)}</strong>
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between md:flex-col md:items-end w-full md:w-56 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {formatPrice(product.currentPrice, currency)}
                  </div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center md:justify-end gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Экономия: {formatPrice(deal.realSavings, currency)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(product);
                    }}
                    className={`p-2 rounded-xl border transition-colors ${
                      isFav ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-slate-200 bg-white text-slate-400 hover:text-rose-500'
                    }`}
                    title="В избранное"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                  </button>

                  {onAddToCart && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700 transition-colors"
                      title="В корзину Temu"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetails(product);
                    }}
                    className="py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
