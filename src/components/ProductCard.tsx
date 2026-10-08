import React from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { formatPrice } from '../services/currency';
import { Star, Heart, ExternalLink, TrendingDown, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
  onImportToTemu?: (product: Product) => void;
  isTemuSynced?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
  currency = 'RUB',
  onAddToCart,
  onImportToTemu,
  isTemuSynced,
}) => {
  const deal = analyzeDeal(product);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Top badges (Mobile & Desktop adaptive) */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 items-start max-w-[70%]">
        {/* Claimed Store Discount */}
        {deal.shopDiscountPercent > 0 && (
          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
            -{deal.shopDiscountPercent}%
          </span>
        )}

        {/* Real Deal Status Badge */}
        <span
          className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-bold border shadow-2xs backdrop-blur-md truncate ${
            deal.dealStatus === 'super_deal'
              ? 'bg-orange-500/90 text-white border-orange-400'
              : deal.dealStatus === 'good_price'
              ? 'bg-emerald-600/90 text-white border-emerald-500'
              : deal.dealStatus === 'high_price'
              ? 'bg-rose-500/90 text-white border-rose-400'
              : 'bg-amber-100/95 text-amber-800 border-amber-300'
          }`}
        >
          {deal.statusBadge}
        </span>
      </div>

      {/* Favorite Button (Responsive touch target) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
        aria-label="В избранное"
        className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
          isFavorite
            ? 'bg-rose-50 text-rose-500 shadow-xs ring-2 ring-rose-200'
            : 'bg-white/85 hover:bg-white text-slate-400 hover:text-rose-500 shadow-2xs backdrop-blur-xs'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full pt-[85%] bg-slate-50 cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Store pill on bottom-left of image */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-[9px] sm:text-[11px] font-medium text-white flex items-center gap-1">
          <span>{product.store}</span>
          {product.freeDelivery && (
            <span className="text-emerald-300 text-[9px] sm:text-[10px] hidden sm:inline">• Доставка 0 ₽</span>
          )}
        </div>
      </div>

      {/* Card Content (Adaptive padding: p-2.5 on phones, p-4 on desktop) */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
          <span className="truncate hover:text-slate-700 max-w-[65%]">{product.category}</span>
          <div className="flex items-center gap-0.5 text-slate-700 font-bold shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 text-[10px] hidden sm:inline">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(product)}
          className="font-bold sm:font-semibold text-slate-900 text-xs sm:text-sm line-clamp-2 min-h-[2.1rem] sm:min-h-[2.6rem] hover:text-orange-600 cursor-pointer transition-colors leading-snug mb-2"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
            <span className="text-base sm:text-2xl font-black text-slate-900 tracking-tight">
              {formatPrice(product.currentPrice, currency)}
            </span>
            {product.oldPrice > product.currentPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice, currency)}
              </span>
            )}
          </div>

          {/* Real Benefit Analytics Box */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] sm:text-xs mb-2.5 space-y-0.5 sm:space-y-1">
            <div className="flex items-center justify-between text-slate-500">
              <span>Обычно:</span>
              <span className="font-medium text-slate-700">
                {formatPrice(deal.averagePrice90d, currency)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 truncate">Реально:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-0.5 shrink-0">
                <TrendingDown className="w-3 h-3" />
                {formatPrice(deal.realSavings, currency)}
                {deal.realDiscountPercent > 0 && ` (-${deal.realDiscountPercent}%)`}
              </span>
            </div>
          </div>

          {/* Action Buttons (Adaptive layout for mobile & desktop) */}
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => onOpenDetails(product)}
                className="flex-1 py-2 px-1.5 rounded-xl text-[11px] sm:text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center truncate"
              >
                <span className="hidden sm:inline">Подробнее</span>
                <span className="sm:hidden">Инфо</span>
              </button>

              {onAddToCart && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="flex-[1.4] py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  title="Добавить в корзину"
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">В корзину</span>
                </button>
              )}

              <a
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 transition-colors shrink-0"
                title={`Перейти на ${product.store}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Temu 1-Click Import Button */}
            {onImportToTemu && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onImportToTemu(product);
                }}
                className={`w-full py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  isTemuSynced
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20'
                }`}
                title="Синхронизировать и импортировать товар прямо в аккаунт Temu"
              >
                {isTemuSynced ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Синхронизировано в Temu</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-200 shrink-0" />
                    <span className="truncate">⚡ Импортировать в Temu</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
