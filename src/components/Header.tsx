import React, { useState } from 'react';
import {
  Flame,
  Search,
  Heart,
  Bell,
  User,
  Menu,
  X,
  TrendingDown,
  Layers,
  Scale,
  LineChart,
  Link2,
  ShoppingBag,
  Globe,
  Sparkles,
} from 'lucide-react';
import { Currency, TemuAccount } from '../types';
import { CURRENCY_SYMBOLS } from '../services/currency';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  favoritesCount: number;
  unreadNotificationsCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExecuteSearch: (query: string) => void;
  onOpenTemuAnalyzer: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  temuAccount: TemuAccount;
  onOpenTemuAuth: () => void;
  onOpenAdaptiveEngine?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  favoritesCount,
  unreadNotificationsCount,
  cartCount,
  onOpenCart,
  onOpenSearch,
  searchQuery,
  setSearchQuery,
  onExecuteSearch,
  onOpenTemuAnalyzer,
  currency,
  setCurrency,
  temuAccount,
  onOpenTemuAuth,
  onOpenAdaptiveEngine,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: 'RUB', label: 'RUB (₽)', symbol: '₽' },
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
    { code: 'KZT', label: 'KZT (₸)', symbol: '₸' },
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: Flame },
    { id: 'categories', label: 'Категории', icon: Layers },
    { id: 'best-deals', label: 'Лучшие скидки', icon: TrendingDown },
    { id: 'comparison', label: 'Сравнение цен', icon: Scale },
    { id: 'favorites', label: 'Избранное', icon: Heart, count: favoritesCount },
    { id: 'price-history', label: 'История цен', icon: LineChart },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          {/* Left: Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 fill-white stroke-orange-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  Deal<span className="text-orange-500">Finder</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-orange-100 text-orange-700">
                  TEMU
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block -mt-0.5">
                Умные скидки & выкуп в Temu
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-orange-500 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Temu Sync, Currency, Cart, Account */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Search Input (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex relative items-center">
              <input
                type="text"
                placeholder="Поиск по скидкам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-56 pl-9 pr-3.5 py-2 rounded-xl text-xs bg-slate-100 focus:bg-white border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Temu Quick Link Button */}
            <button
              type="button"
              onClick={onOpenTemuAnalyzer}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-100 hover:bg-orange-200 text-orange-800 transition-colors shadow-2xs"
              title="Вставить ссылку с Temu для проверки цены и экономии"
            >
              <Link2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Ссылка Temu</span>
            </button>

            {/* Temu Account Sync Pill */}
            <button
              type="button"
              onClick={onOpenTemuAuth}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                temuAccount.isConnected
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title="Синхронизация корзины и заказов с Temu"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  temuAccount.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span className="truncate max-w-[100px]">
                {temuAccount.isConnected ? `Temu: ${temuAccount.name}` : 'Синхронизация Temu'}
              </span>
            </button>

            {/* Adaptive Engine Mesh Status Pill */}
            {onOpenAdaptiveEngine && (
              <button
                type="button"
                onClick={onOpenAdaptiveEngine}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                title="Адаптивный движок: статус обхода WAF & прокси-шлюзы"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Адаптер 99%</span>
              </button>
            )}

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Выбор валюты отображения цен"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-40 text-xs">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                      Валюта цен
                    </div>
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCurrency(c.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${
                          currency === c.code ? 'font-bold text-orange-600 bg-orange-50/60' : 'text-slate-700'
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className="text-slate-400 font-mono">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Shopping Cart Button with Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Корзина Temu"
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-sm shadow-orange-500/20 transition-all flex items-center justify-center cursor-pointer"
              title="Открыть корзину покупок"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-slate-900 text-white ring-2 ring-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Поиск"
              className="md:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => handleNavClick('notifications')}
              aria-label="Уведомления"
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activeView === 'notifications'
                  ? 'bg-orange-50 text-orange-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => handleNavClick('favorites')}
              aria-label="Избранное"
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activeView === 'favorites'
                  ? 'bg-rose-50 text-rose-500'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'text-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-2xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Profile / Account Button */}
            <button
              onClick={() => handleNavClick('account')}
              className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all ${
                activeView === 'account'
                  ? 'border-orange-300 bg-orange-50/70 text-orange-700'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                А
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Кабинет</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-100 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Temu Sync Status Bar */}
            <div className="p-3 mb-2 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    temuAccount.isConnected ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                <span className="font-bold text-slate-800">
                  {temuAccount.isConnected ? `Temu: ${temuAccount.name}` : 'Temu не синхронизирован'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTemuAuth();
                }}
                className="font-bold text-orange-600 underline"
              >
                {temuAccount.isConnected ? 'Настройки' : 'Войти'}
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <span>Корзина покупок</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">
                {cartCount} шт.
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTemuAnalyzer();
              }}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-orange-700 bg-orange-100/80 flex items-center gap-3 transition-colors"
            >
              <Link2 className="w-4 h-4 text-orange-600" />
              <span>⚡ Анализ ссылки с Temu</span>
            </button>

            {onOpenAdaptiveEngine && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdaptiveEngine();
                }}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Адаптивный движок & Обход WAF</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300">
                  99.8% OK
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
