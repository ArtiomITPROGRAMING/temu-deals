import React, { useState } from 'react';
import { Product, PriceAlert } from '../types';
import { Bell, X, Check, Mail, Send, BellRing } from 'lucide-react';

interface PriceAlertModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSaveAlert: (alert: PriceAlert) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaveAlert,
}) => {
  const [targetPrice, setTargetPrice] = useState<number>(
    Math.round(product.currentPrice * 0.9 / 50) * 50
  );
  const [contactMethod, setContactMethod] = useState<'email' | 'telegram' | 'push'>('telegram');
  const [contactValue, setContactValue] = useState<string>('@alex_deal');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: PriceAlert = {
      id: 'alert-' + Date.now(),
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      targetPrice: Number(targetPrice),
      currentPrice: product.currentPrice,
      contactMethod,
      contactValue,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    onSaveAlert(newAlert);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  const discountFromCurrent = Math.round(
    ((product.currentPrice - targetPrice) / product.currentPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Следить за ценой</h3>
              <p className="text-xs text-slate-500">Мгновенное уведомление при падении цены</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Отслеживание настроено!</h4>
            <p className="text-sm text-slate-500">
              Мы пришлем вам уведомление, как только цена на {product.brand} опустится до{' '}
              <span className="font-semibold text-slate-800">{targetPrice.toLocaleString('ru-RU')} ₽</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Product summary */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <img
                src={product.image}
                alt={product.title}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-slate-900 line-clamp-1">
                  {product.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Текущая цена:{' '}
                  <span className="font-bold text-slate-900">
                    {product.currentPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>

            {/* Target price input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Желаемая цена (₽):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={product.currentPrice - 1}
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold text-slate-900 focus:outline-hidden focus:border-orange-500 focus:ring-3 focus:ring-orange-500/15"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  ₽
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 flex items-center justify-between">
                <span>Экономия: {(product.currentPrice - targetPrice).toLocaleString('ru-RU')} ₽</span>
                <span className="text-orange-600 font-semibold">
                  {discountFromCurrent > 0 ? `-${discountFromCurrent}% от текущей` : ''}
                </span>
              </p>
            </div>

            {/* Quick target price presets */}
            <div className="grid grid-cols-3 gap-2">
              {[0.9, 0.8, 0.7].map((factor) => {
                const val = Math.round((product.currentPrice * factor) / 50) * 50;
                const percent = Math.round((1 - factor) * 100);
                return (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => setTargetPrice(val)}
                    className="py-1.5 px-2 rounded-lg text-xs font-medium border border-slate-200 hover:border-orange-400 hover:bg-orange-50 transition-colors text-slate-700"
                  >
                    -{percent}% ({val.toLocaleString('ru-RU')} ₽)
                  </button>
                );
              })}
            </div>

            {/* Notification Channel */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Куда прислать оповещение:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setContactMethod('telegram')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    contactMethod === 'telegram'
                      ? 'bg-sky-50 text-sky-700 border-2 border-sky-400'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    contactMethod === 'email'
                      ? 'bg-amber-50 text-amber-700 border-2 border-amber-400'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setContactMethod('push')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    contactMethod === 'push'
                      ? 'bg-orange-50 text-orange-700 border-2 border-orange-400'
                      : 'bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Web Push</span>
                </button>
              </div>

              <input
                type="text"
                value={contactValue}
                onChange={(e) => setContactValue(e.target.value)}
                placeholder={
                  contactMethod === 'telegram'
                    ? '@username в Telegram'
                    : contactMethod === 'email'
                    ? 'Ваш email адрес'
                    : 'Браузерное уведомление'
                }
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-orange-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all"
            >
              Уведомить меня при снижении цены
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
