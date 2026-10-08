import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { formatPrice } from '../services/currency';
import { PriceHistoryChart } from './PriceHistoryChart';
import {
  X,
  Star,
  Heart,
  ExternalLink,
  BellRing,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  ChevronRight,
  TrendingDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onOpenPriceAlert: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenPriceAlert,
  currency = 'RUB',
  onAddToCart,
}) => {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'chart' | 'stores' | 'specs' | 'reviews'>('chart');

  if (!isOpen || !product) return null;

  const deal = analyzeDeal(product);
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-600 flex items-center justify-center backdrop-blur-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 overflow-x-auto">
            <span>Главная</span>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span>{product.category}</span>
            {product.subcategory && (
              <>
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span>{product.subcategory}</span>
              </>
            )}
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-slate-700 font-medium truncate max-w-[200px]">{product.brand}</span>
          </div>

          {/* Top Grid: Gallery & Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Gallery Column */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-square w-full rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                <img
                  src={gallery[selectedImg] || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Store badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-xs font-semibold text-white">
                  {product.store}
                </div>
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImg === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <Truck className="w-4 h-4 text-orange-500 mb-1" />
                  <span>Быстрая доставка</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                  <span>Безопасная оплата</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <RotateCcw className="w-4 h-4 text-sky-500 mb-1" />
                  <span>Возврат 14-90 дней</span>
                </div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="flex flex-col">
              {/* Title & Brand */}
              <div className="mb-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1 text-slate-800 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount.toLocaleString('ru-RU')} отзывов</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">В наличии</span>
              </div>

              {/* Main Price Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-orange-100/80 mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {formatPrice(product.currentPrice, currency)}
                  </span>
                  {product.oldPrice > product.currentPrice && (
                    <span className="text-base text-slate-400 line-through">
                      {formatPrice(product.oldPrice, currency)}
                    </span>
                  )}
                  {deal.shopDiscountPercent > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-black bg-orange-500 text-white shadow-xs">
                      -{deal.shopDiscountPercent}%
                    </span>
                  )}
                </div>

                {/* Real Benefit Analytics Breakdown */}
                <div className="mt-3 pt-3 border-t border-orange-100/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Реальная средняя цена:</span>
                    <div className="font-bold text-slate-800 text-sm mt-0.5">
                      {formatPrice(deal.averagePrice90d, currency)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Реальная экономия:</span>
                    <div className="font-bold text-emerald-600 text-sm mt-0.5 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      {formatPrice(deal.realSavings, currency)} ({deal.realDiscountPercent}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* «СТОИТ ЛИ ПОКУПАТЬ?» Block */}
              <div
                className={`p-4 rounded-2xl border mb-5 ${
                  deal.dealStatus === 'super_deal'
                    ? 'bg-orange-50/80 border-orange-200'
                    : deal.dealStatus === 'good_price'
                    ? 'bg-emerald-50/80 border-emerald-200'
                    : deal.dealStatus === 'high_price'
                    ? 'bg-rose-50/80 border-rose-200'
                    : 'bg-amber-50/80 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {deal.statusBadge}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    • Рейтинг выгоды: {deal.dealScore}/100
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {deal.verdict}
                </p>
                {deal.isArtificialDiscount && (
                  <div className="mt-2 text-[11px] text-amber-800 bg-amber-100/70 p-2 rounded-lg flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Обратите внимание: заявленная скидка -{deal.shopDiscountPercent}% накручена. Настоящая скидка составляет {deal.realDiscountPercent}%.
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-auto">
                {onAddToCart && (
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-3.5 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>В корзину для выкупа</span>
                  </button>
                )}

                <a
                  href={product.storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center flex items-center justify-center gap-1.5"
                >
                  <span>В магазин {product.store}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenPriceAlert(product)}
                  className="p-3.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center"
                  title="Следить за ценой"
                >
                  <BellRing className="w-4 h-4 text-orange-500" />
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(product)}
                  aria-label="В избранное"
                  className={`p-3.5 rounded-xl border flex items-center justify-center transition-all ${
                    isFavorite
                      ? 'border-rose-300 bg-rose-50 text-rose-500'
                      : 'border-slate-200 bg-white text-slate-400 hover:text-rose-500'
                  }`}
                  title="Добавить в избранное"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 border-b border-slate-100 mb-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('chart')}
                className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'chart'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                График истории цены
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'stores'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Сравнение магазинов ({product.storeOffers.length})
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Отзывы ({product.reviewsCount})
              </button>
            </div>

            {/* Tab 1: Price History Chart */}
            {activeTab === 'chart' && (
              <div>
                <PriceHistoryChart history={product.history} currentPrice={product.currentPrice} />
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <p>
                    История цен собирается нашими роботами ежедневно по 15+ крупным маркетплейсам. Вы видите график реальных колебаний стоимости за вычетом сезонных накруток.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Store Offers Comparison Table */}
            {activeTab === 'stores' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-500 mb-2">
                  Сравнение текущих предложений в других магазинах:
                </div>
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-white">
                  {product.storeOffers.map((offer) => {
                    const isLowest = offer.price === Math.min(...product.storeOffers.map(o => o.price));
                    return (
                      <div
                        key={offer.storeId}
                        className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isLowest ? 'bg-orange-50/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                            <Store className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">
                                {offer.storeName}
                              </span>
                              {isLowest && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                                  Лучшая цена
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              Доставка: {offer.deliveryDays} дн. {offer.freeDelivery ? '• Бесплатно' : ''}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <div className="text-right">
                            <div className="text-lg font-black text-slate-900">
                              {formatPrice(offer.price, currency)}
                            </div>
                            {offer.cashbackPercent && (
                              <div className="text-[11px] text-orange-600 font-semibold">
                                +{offer.cashbackPercent}% кэшбэк
                              </div>
                            )}
                          </div>
                          <a
                            href={product.storeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors flex items-center gap-1"
                          >
                            <span>Купить</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Specs & Description */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Описание</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Основные характеристики</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-500">{key}</span>
                        <span className="font-semibold text-slate-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.length > 0 ? (
                  product.reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs">{r.author}</span>
                          <span className="text-slate-400 text-[10px]">{r.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2">{r.text}</p>
                      {r.pros && (
                        <div className="text-[11px] text-emerald-700 bg-emerald-50/70 p-2 rounded-xl mb-1 flex items-start gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Плюсы:</strong> {r.pros}
                          </span>
                        </div>
                      )}
                      {r.cons && (
                        <div className="text-[11px] text-rose-700 bg-rose-50/70 p-2 rounded-xl flex items-start gap-1">
                          <span className="font-bold shrink-0">—</span>
                          <span>
                            <strong>Минусы:</strong> {r.cons}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Пока нет отзывов для данного товара
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
