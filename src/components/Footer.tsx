import React from 'react';
import { Flame, ShieldCheck, Clock, Bell, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-100">
      {/* Orange Benefits Banner (Matching bottom bar in reference image) */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 py-4 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Sparkles className="w-5 h-5 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Лучшие скидки каждый день</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Clock className="w-5 h-5 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Отслеживание цен 24/7</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Bell className="w-5 h-5 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Уведомления о снижении</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-yellow-200 shrink-0" />
              <span className="text-xs sm:text-sm font-bold">Без регистрации для поиска</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Deal<span className="text-orange-500">Finder</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              DealFinder — независимый сервис мониторинга цен и поиска реальной выгоды в интернет-магазинах. Мы проверяем историю стоимости товаров, защищая покупателей от мнимых скидок и завышенных цен.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} DealFinder Inc. Все права защищены.
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Разделы
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Главная</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Популярные категории</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Лучшие скидки</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Сравнение магазинов</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">История цен</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Каналы Temu
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Temu Choice</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Фабрики Temu Direct</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Молниеносные скидки Flash</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Экспресс-доставка Temu</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Хаб ликвидаций Temu Outlet</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Помощь & API
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Как работает алгоритм</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">API для магазинов</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Telegram-бот</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Поддержка</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
