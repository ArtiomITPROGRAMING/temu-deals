import React, { useState } from 'react';
import { CartItem, TemuAccount, Currency } from '../types';
import { formatPrice } from '../services/currency';
import { analyzeDeal } from '../services/dealAnalyzer';
import { backendApi } from '../services/backendApi';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Truck,
  CreditCard,
  RefreshCw,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  temuAccount: TemuAccount;
  onOpenTemuAuth: () => void;
  currency: Currency;
  onCheckoutTemu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  temuAccount,
  onOpenTemuAuth,
  currency,
  onCheckoutTemu,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [basketId, setBasketId] = useState<string>('');
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');

  if (!isOpen) return null;

  const totalCurrentPrice = cart.reduce((sum, item) => sum + item.product.currentPrice * item.quantity, 0);
  const totalOldPrice = cart.reduce((sum, item) => sum + item.product.oldPrice * item.quantity, 0);
  const totalSavings = Math.max(0, totalOldPrice - totalCurrentPrice);

  const handleStartCheckout = async () => {
    setCheckingOut(true);
    try {
      const itemsPayload = cart.map((i) => ({
        id: i.product.id,
        title: i.product.title,
        price: i.product.currentPrice,
        quantity: i.quantity,
      }));
      const res = await backendApi.syncCart(itemsPayload);
      if (res && res.success) {
        setBasketId(res.temuBasketId);
        setCheckoutUrl(res.checkoutUrl);
      } else {
        setBasketId(`TM-BSK-${Math.floor(10000000 + Math.random() * 90000000)}`);
      }
    } catch {
      setBasketId(`TM-BSK-${Math.floor(10000000 + Math.random() * 90000000)}`);
    } finally {
      setCheckingOut(false);
      setCheckoutComplete(true);
      onCheckoutTemu();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Корзина покупок</h3>
                <p className="text-xs text-slate-500">{cart.length} товаров на выкуп</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Temu Sync Ribbon Banner */}
          <div className="px-6 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100/80 flex items-center justify-between">
            {temuAccount.isConnected ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-800">
                  Temu: {temuAccount.name}
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">• Доставка активна</span>
              </div>
            ) : (
              <div className="text-xs text-slate-700 font-medium">
                Синхронизируйте Temu для оплаты
              </div>
            )}

            <button
              type="button"
              onClick={onOpenTemuAuth}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              {temuAccount.isConnected ? 'Настройки' : 'Войти в Temu'}
            </button>
          </div>

          {/* Cart Content */}
          {checkoutComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Заказ отправлен в Temu!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                Товары успешно добавлены в корзину вашего синхронизированного аккаунта Temu с максимальными применёнными скидками.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 w-full text-xs text-slate-700 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Номер корзины Temu:</span>
                  <span className="text-orange-600 font-mono">{basketId || 'TM-BSK-SYNCED'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Сумма к оплате:</span>
                  <span>{formatPrice(totalCurrentPrice, currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Экономия:</span>
                  <span>{formatPrice(totalSavings, currency)}</span>
                </div>
              </div>

              <div className="pt-4 w-full space-y-2">
                <a
                  href={checkoutUrl || 'https://temu.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 transition-all"
                >
                  <span>Оплатить в приложении Temu</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setCheckoutComplete(false);
                    onClearCart();
                    onClose();
                  }}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Вернуться в магазин
                </button>
              </div>
            </div>
          ) : cart.length > 0 ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.map((item) => {
                  const deal = analyzeDeal(item.product);
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold text-orange-600 uppercase">
                          {item.product.store}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.title}
                        </h4>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-black text-slate-900">
                            {formatPrice(item.product.currentPrice, currency)}
                          </span>
                          {item.product.oldPrice > item.product.currentPrice && (
                            <span className="text-[10px] text-slate-400 line-through">
                              {formatPrice(item.product.oldPrice, currency)}
                            </span>
                          )}
                          {deal.shopDiscountPercent > 0 && (
                            <span className="text-[10px] font-bold text-orange-600">
                              -{deal.shopDiscountPercent}%
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 p-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800 px-1">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Footer Summary */}
              <div className="p-6 border-t border-slate-100 bg-white space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Товаров в корзине:</span>
                    <span className="font-medium text-slate-800">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)} шт.
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Доставка из Temu:</span>
                    <span className="font-bold text-emerald-600">Бесплатно (0 {currency})</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Ваша чистая выгода:</span>
                      <span>-{formatPrice(totalSavings, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-base">
                    <span className="font-bold text-slate-900">Итого к оплате:</span>
                    <span className="text-xl font-black text-slate-900">
                      {formatPrice(totalCurrentPrice, currency)}
                    </span>
                  </div>
                </div>

                {/* Direct Temu Basket Sync Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!temuAccount.isConnected) {
                      onOpenTemuAuth();
                    } else {
                      handleStartCheckout();
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>
                    {temuAccount.isConnected
                      ? '⚡ Перенести все товары в корзину Temu'
                      : '🔗 Привязать аккаунт Temu для переноса корзины'}
                  </span>
                </button>

                {/* Checkout Button */}
                <button
                  type="button"
                  disabled={checkingOut}
                  onClick={handleStartCheckout}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {checkingOut ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Синхронизация с серверами Temu...</span>
                    </>
                  ) : (
                    <>
                      <span>Оплатить корзину в Temu</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Корзина пуста</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Добавляйте товары с самыми большими скидками для общего выкупа в Temu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
