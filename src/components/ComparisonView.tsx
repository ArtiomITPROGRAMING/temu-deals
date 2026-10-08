import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { formatPrice } from '../services/currency';
import {
  Scale,
  Store,
  ExternalLink,
  Truck,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface ComparisonViewProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  products,
  onOpenDetails,
  currency = 'RUB',
  onAddToCart,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const deal = product ? analyzeDeal(product) : null;

  if (!product || !deal) return null;

  const minOfferPrice = Math.min(...product.storeOffers.map((o) => o.price));

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Scale className="w-8 h-8 text-orange-500" />
          <span>Сравнение складов и фабрик Temu</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Выберите товар и сравните условия поставщиков: официальный склад Temu Choice, прямая отгрузка с фабрики Temu Direct, авиадоставка Temu Express и ликвидация Temu Outlet.
        </p>
      </div>

      {/* Select product tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8">
        {products.slice(0, 7).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProductId(p.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              selectedProductId === p.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <img src={p.image} alt={p.title} className="w-5 h-5 rounded-md object-cover" />
            <span className="truncate max-w-[140px]">{p.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Product Hero & Store Table */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-8">
        {/* Top Product Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-100 shrink-0"
            />
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                {product.brand} • {product.category}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {product.title}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="text-slate-500">
                  Средняя цена: <strong>{formatPrice(deal.averagePrice90d, currency)}</strong>
                </span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">
                  {deal.statusBadge}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAddToCart && (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>В корзину</span>
              </button>
            )}
            <button
              onClick={() => onOpenDetails(product)}
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Смотреть историю цен
            </button>
          </div>
        </div>

        {/* Store Comparison Cards */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Предложения в магазинах ({product.storeOffers.length}):
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.storeOffers.map((offer) => {
              const isBest = offer.price === minOfferPrice;
              const diffFromBest = offer.price - minOfferPrice;

              return (
                <div
                  key={offer.storeId}
                  className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                    isBest
                      ? 'bg-gradient-to-b from-orange-50/60 to-white border-orange-300 ring-2 ring-orange-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isBest && (
                    <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-2xs">
                      🔥 САМАЯ НИЗКАЯ ЦЕНА
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5 text-slate-700" />
                        <span className="font-bold text-slate-900 text-sm">{offer.storeName}</span>
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold">В наличии</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="text-2xl font-black text-slate-900">
                        {formatPrice(offer.price, currency)}
                      </div>
                      {offer.oldPrice > offer.price && (
                        <div className="text-xs text-slate-400 line-through">
                          {formatPrice(offer.oldPrice, currency)}
                        </div>
                      )}
                      {!isBest && diffFromBest > 0 && (
                        <div className="text-[11px] text-slate-500 mt-1">
                          дороже на +{formatPrice(diffFromBest, currency)}
                        </div>
                      )}
                    </div>

                    {/* Shipping & Cashback */}
                    <div className="space-y-1.5 text-xs text-slate-600 pb-4 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Truck className="w-3.5 h-3.5" />
                          Срок доставки:
                        </span>
                        <span className="font-semibold text-slate-800">
                          {offer.deliveryDays} дн. {offer.freeDelivery ? '(0 ₽)' : ''}
                        </span>
                      </div>
                      {offer.cashbackPercent && (
                        <div className="flex items-center justify-between text-orange-600 font-bold">
                          <span>Бонусы/кэшбэк:</span>
                          <span>+{offer.cashbackPercent}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="pt-4 mt-auto">
                    <a
                      href={product.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all ${
                        isBest
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span>Купить в {offer.storeName}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
