import React, { useState } from 'react';
import { Product, Currency } from '../types';
import { analyzeDeal } from '../services/dealAnalyzer';
import { PriceHistoryChart } from './PriceHistoryChart';
import { formatPrice } from '../services/currency';
import { LineChart, Search, Sparkles, TrendingDown, ArrowRight, ShieldCheck, ShoppingBag, ExternalLink } from 'lucide-react';

interface PriceHistoryViewProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
  onOpenPriceAlert: (product: Product) => void;
  currency?: Currency;
  onAddToCart?: (product: Product) => void;
}

export const PriceHistoryView: React.FC<PriceHistoryViewProps> = ({
  products,
  onOpenDetails,
  onOpenPriceAlert,
  currency = 'RUB',
  onAddToCart,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [filterQuery, setFilterQuery] = useState('');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const deal = selectedProduct ? analyzeDeal(selectedProduct) : null;

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (!selectedProduct || !deal) return null;

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <LineChart className="w-8 h-8 text-orange-500" />
          <span>Анализ истории цен и трендов</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Отслеживайте реальную динамику цен во времени и покупайте товары на историческом минимуме.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Selection List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Выберите товар для анализа</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по товарам..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 outline-hidden focus:border-orange-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredProducts.map((p) => {
                const isSelected = p.id === selectedProduct.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProductId(p.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-200'
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {p.store}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {p.title}
                      </h4>
                      <div className="text-xs font-black text-slate-900 mt-0.5">
                        {formatPrice(p.currentPrice, currency)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Chart and Analytics Card */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Price History Chart Component */}
          <PriceHistoryChart
            history={selectedProduct.history}
            currentPrice={selectedProduct.currentPrice}
          />

          {/* Advice Card «Стоит ли покупать сейчас?» */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Анализ выгодности: {selectedProduct.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                {deal.statusBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Текущая цена</span>
                <span className="text-lg font-black text-slate-900 mt-0.5 block">
                  {formatPrice(selectedProduct.currentPrice, currency)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Средняя за 90 дней</span>
                <span className="text-lg font-black text-slate-700 mt-0.5 block">
                  {formatPrice(deal.averagePrice90d, currency)}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-[11px] text-emerald-800 font-semibold block">Реальная экономия</span>
                <span className="text-lg font-black text-emerald-700 mt-0.5 block">
                  {formatPrice(deal.realSavings, currency)} (-{deal.realDiscountPercent}%)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {deal.verdict}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {onAddToCart && (
                <button
                  type="button"
                  onClick={() => onAddToCart(selectedProduct)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>В корзину для выкупа</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenPriceAlert(selectedProduct)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Настроить оповещение о цене
              </button>

              <button
                type="button"
                onClick={() => onOpenDetails(selectedProduct)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                Все характеристики и отзывы
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
