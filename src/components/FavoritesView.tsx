import React from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { formatPrice } from '../services/currency';
import { Heart, Trash2, ExternalLink, ArrowRight, TrendingDown, ShoppingBag } from 'lucide-react';

interface FavoritesViewProps {
  products: Product[];
  favorites: string[];
  onOpenDetails: (product: Product) => void;
  onRemoveFavorite: (product: Product) => void;
  onNavigateHome: () => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  products,
  favorites,
  onOpenDetails,
  onRemoveFavorite,
  onNavigateHome,
  currency = 'RUB',
  onAddToCart,
}) => {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <span>Избранное</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
            {favoriteProducts.length} товаров
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Мы отслеживаем цены на товары в вашем списке и предупредим при снижении стоимости.
        </p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="space-y-4">
          {favoriteProducts.map((p) => {
            const deal = analyzeDeal(p);
            const prevPrice = p.history.length > 1 ? p.history[p.history.length - 2].price : p.currentPrice * 1.1;
            const priceChange = p.currentPrice - prevPrice;
            const percentChange = Math.round((priceChange / prevPrice) * 100);

            return (
              <div
                key={p.id}
                onClick={() => onOpenDetails(p)}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 sm:gap-6 cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {deal.shopDiscountPercent > 0 && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[10px] font-black bg-orange-500 text-white">
                      -{deal.shopDiscountPercent}%
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="text-xs text-slate-400 mb-0.5">
                    {p.store} • {p.category}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-2">
                    {p.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="text-slate-500">
                      Обычно: <strong>{formatPrice(deal.averagePrice90d, currency)}</strong>
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Экономия: {formatPrice(deal.realSavings, currency)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        percentChange < 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Динамика: {percentChange}% за 30 дней
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between md:flex-col md:items-end w-full md:w-56 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-left md:text-right">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      {formatPrice(p.currentPrice, currency)}
                    </div>
                    {p.oldPrice > p.currentPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(p.oldPrice, currency)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite(p);
                      }}
                      title="Удалить из избранного"
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors border border-slate-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {onAddToCart && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                        title="Добавить в корзину Temu"
                        className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-700 transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    )}

                    <a
                      href={p.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2 px-3.5 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xs flex items-center gap-1"
                    >
                      <span>Купить</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
            <Heart className="w-8 h-8 fill-rose-500/20" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ваш список избранного пуст</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Нажимайте на сердечко на карточках товаров с выгодными скидками, чтобы добавить их сюда и отслеживать изменение цен.
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xs"
          >
            Найти товары со скидками
          </button>
        </div>
      )}
    </div>
  );
};
