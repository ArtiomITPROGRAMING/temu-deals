import React, { useState } from 'react';
import { Product, PriceAlert, TemuAccount, Currency } from '../types';
import { ProductCard } from './ProductCard';
import { formatPrice } from '../services/currency';
import {
  User,
  Heart,
  Bell,
  Eye,
  Settings,
  Flame,
  ShieldCheck,
  TrendingDown,
  Trash2,
  ExternalLink,
  Smartphone,
  Mail,
  CheckCircle2,
  ShoppingBag,
  Truck,
  RefreshCw,
  Clock,
  PackageCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface AccountViewProps {
  products: Product[];
  favorites: string[];
  alerts: PriceAlert[];
  viewHistory: string[];
  onOpenDetails: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onRemoveAlert: (alertId: string) => void;
  currency?: Currency;
  temuAccount?: TemuAccount;
  onOpenTemuAuth?: () => void;
  onAddToCart?: (product: Product) => void;
  onImportToTemu?: (product: Product) => void;
}

type AccountTab = 'profile' | 'temu' | 'favorites' | 'tracking' | 'history' | 'settings';

export const AccountView: React.FC<AccountViewProps> = ({
  products,
  favorites,
  alerts,
  viewHistory,
  onOpenDetails,
  onToggleFavorite,
  onRemoveAlert,
  currency = 'RUB',
  temuAccount,
  onOpenTemuAuth,
  onAddToCart,
  onImportToTemu,
}) => {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile');
  const [telegramNotifications, setTelegramNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [minDiscountThreshold, setMinDiscountThreshold] = useState(30);

  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const historyProducts = products.filter(p => viewHistory.includes(p.id));
  const temuOrdersCount = temuAccount?.orders?.length || 0;

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Account Header Hero */}
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            {temuAccount?.isConnected && temuAccount.name ? temuAccount.name.slice(0, 2).toUpperCase() : '👤'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {temuAccount?.isConnected && temuAccount.name ? temuAccount.name : 'Гостевой аккаунт'}
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                temuAccount?.isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {temuAccount?.isConnected ? 'Temu Активен' : 'Не авторизован'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {temuAccount?.isConnected
                ? `${temuAccount.emailOrPhone} • Синхронизирован с Temu`
                : 'Войдите в аккаунт Temu для сохранения заказов и адреса'}
            </p>
          </div>
        </div>

        {/* Total Savings & Orders Metric Cards */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-center">
            <span className="text-[11px] text-orange-700 font-semibold block">Сэкономлено в Temu</span>
            <span className="text-xl sm:text-2xl font-black text-orange-600 mt-0.5 block">
              {formatPrice(temuAccount?.orders?.reduce((sum, o) => sum + (o.totalPrice * 0.35), 0) || 0, currency)}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] text-slate-500 font-semibold block">Заказов Temu</span>
            <span className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5 block">
              {temuOrdersCount} шт.
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Navigation Sidebar (Left) + Content (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 space-y-1">
          <div className="bg-white rounded-3xl border border-slate-100 p-3 shadow-xs space-y-1">
            {[
              { id: 'profile', label: 'Профиль и статистика', icon: User },
              { id: 'temu', label: 'Заказы из Temu', icon: ShoppingBag, count: temuOrdersCount },
              { id: 'favorites', label: 'Избранное', icon: Heart, count: favoriteProducts.length },
              { id: 'tracking', label: 'Отслеживаемые товары', icon: Flame, count: alerts.length },
              { id: 'history', label: 'История просмотров', icon: Eye, count: historyProducts.length },
              { id: 'settings', label: 'Настройки', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AccountTab)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-8 lg:col-span-9">
          {/* Tab: Temu Orders & Sync */}
          {activeTab === 'temu' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-orange-600" />
                    <span>Синхронизированные заказы Temu</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Статусы посылок, трек-номера и адрес доставки с серверов Temu
                  </p>
                </div>

                {onOpenTemuAuth && (
                  <button
                    type="button"
                    onClick={onOpenTemuAuth}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-100 hover:bg-orange-200 text-orange-800 transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{temuAccount?.isConnected ? 'Синхронизировать' : 'Подключить Temu'}</span>
                  </button>
                )}
              </div>

              {/* Temu Account Status Box */}
              {temuAccount?.isConnected ? (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Аккаунт: {temuAccount.emailOrPhone}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Подключен: {temuAccount.linkedAt ? new Date(temuAccount.linkedAt).toLocaleDateString('ru-RU') : 'Сегодня'}
                        </div>
                      </div>
                    </div>

                    {temuAccount.shippingAddress && (
                      <div className="text-xs text-slate-700 bg-white/80 p-2.5 rounded-xl border border-orange-100">
                        <div className="font-bold flex items-center gap-1 text-slate-900">
                          <MapPin className="w-3.5 h-3.5 text-orange-600" />
                          <span>{temuAccount.shippingAddress.fullName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {temuAccount.shippingAddress.country}, {temuAccount.shippingAddress.city}, {temuAccount.shippingAddress.street}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Подключите аккаунт Temu для единого выкупа
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Автоматически подтягивайте адрес доставки, отслеживайте трек-номера посылок и оплачивайте корзины с максимальными скидками.
                  </p>
                  {onOpenTemuAuth && (
                    <button
                      type="button"
                      onClick={onOpenTemuAuth}
                      className="px-6 py-3 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-md shadow-orange-500/20"
                    >
                      Подключить Temu
                    </button>
                  )}
                </div>
              )}

              {/* Temu Orders List */}
              {temuAccount && temuAccount.orders.length > 0 ? (
                <div className="space-y-4">
                  {temuAccount.orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-200 shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-slate-900">
                            {order.temuOrderId}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              order.status === 'delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'shipped'
                                ? 'bg-sky-100 text-sky-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.statusLabel}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500">
                          Дата оформления: {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Трек-номер:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {order.trackingNumber || 'Присваивается...'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Ожидаемая доставка:</span>
                          <span className="font-bold text-slate-800">
                            {order.estimatedDelivery}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Сумма заказа:</span>
                          <span className="font-bold text-orange-600 text-sm">
                            {formatPrice(order.totalPrice, currency)}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <a
                          href="https://temu.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                        >
                          <span>Смотреть в приложении Temu</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : temuAccount?.isConnected ? (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center text-xs text-slate-500">
                  Пока нет оформленных заказов. Добавляйте товары в корзину и нажимайте "Оплатить в Temu".
                </div>
              ) : null}
            </div>
          )}

          {/* Tab 1: Profile & Stats */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Ваша статистика</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500">Заказов через Temu</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">{temuOrdersCount}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500">Отслеживаемых товаров</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">{alerts.length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500">В избранном</span>
                  <div className="text-2xl font-black text-orange-600 mt-1">{favoriteProducts.length}</div>
                </div>
              </div>

              {/* Verified Status */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold block">Алгоритм DealFinder активен 24/7</span>
                  Цены и остатки на складах Temu анализируются в реальном времени с подтверждением 90-дневной истории.
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Tracked Alerts */}
          {activeTab === 'tracking' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-slate-900">Отслеживаемые товары ({alerts.length})</h2>
              </div>

              {alerts.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={alert.productImage}
                          alt={alert.productTitle}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                            {alert.productTitle}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <span className="text-slate-500">
                              Текущая: {formatPrice(alert.currentPrice, currency)}
                            </span>
                            <span>•</span>
                            <span className="text-orange-600 font-bold">
                              Цель: {formatPrice(alert.targetPrice, currency)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => onRemoveAlert(alert.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Удалить оповещение"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  Нет активных отслеживаний цен.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Favorites in Account */}
          {activeTab === 'favorites' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Избранное ({favoriteProducts.length})</h2>
              {favoriteProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {favoriteProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={onOpenDetails}
                      isFavorite={true}
                      onToggleFavorite={onToggleFavorite}
                      currency={currency}
                      onAddToCart={onAddToCart}
                      onImportToTemu={onImportToTemu}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Список избранного пуст.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: History in Account */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">История просмотров ({historyProducts.length})</h2>
              {historyProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {historyProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onOpenDetails={onOpenDetails}
                      isFavorite={favorites.includes(p.id)}
                      onToggleFavorite={onToggleFavorite}
                      currency={currency}
                      onAddToCart={onAddToCart}
                      onImportToTemu={onImportToTemu}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  История просмотров пуста.
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Настройки аккаунта</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Уведомления в Telegram
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Мгновенные сообщения при падении цен на товары в избранном
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={telegramNotifications}
                    onChange={(e) => setTelegramNotifications(e.target.checked)}
                    className="w-5 h-5 accent-orange-500 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Email-рассылка лучших предложений
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Еженедельный дайджест проверенных скидок от 50%
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="w-5 h-5 accent-orange-500 rounded"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900">
                      Порог реальной скидки для уведомлений:
                    </span>
                    <span className="font-bold text-orange-600">{minDiscountThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={minDiscountThreshold}
                    onChange={(e) => setMinDiscountThreshold(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    Оповещать только если подтвержденная алгоритмом скидка выше этого значения.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
