import React, { useState } from 'react';
import { NotificationItem, Product } from '../types';
import {
  Bell,
  TrendingDown,
  Target,
  Sparkles,
  CheckCheck,
  ArrowRight,
  Trash2,
  Clock,
} from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onClearNotifications: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onClearNotifications,
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="w-5 h-5 text-emerald-600" />;
      case 'target_reached':
        return <Target className="w-5 h-5 text-orange-600" />;
      case 'fav_discount':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBadge = (type: NotificationItem['type']) => {
    switch (type) {
      case 'price_drop':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'target_reached':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'fav_discount':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Уведомления</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
              {notifications.filter(n => !n.read).length} новых
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Оповещения о снижении цен, целевых порогах и горячих скидках
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Прочитать все</span>
          </button>
          <button
            type="button"
            onClick={onClearNotifications}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 bg-white border border-slate-200 transition-colors shadow-2xs"
            title="Очистить все"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Все ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'unread'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Только непрочитанные ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectNotification(item)}
            className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              item.read
                ? 'bg-white border-slate-100 hover:border-slate-200'
                : 'bg-orange-50/40 border-orange-200 shadow-xs hover:border-orange-300'
            }`}
          >
            {/* Icon */}
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${getBadge(item.type)}`}>
              {getIcon(item.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                {item.message}
              </p>

              {/* Price Details Pill */}
              {item.newPrice && item.oldPrice && (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-800">
                  <span>Стало: {item.newPrice.toLocaleString('ru-RU')} ₽</span>
                  <span className="text-slate-400 line-through">Было: {item.oldPrice.toLocaleString('ru-RU')} ₽</span>
                  {item.discountPercent && (
                    <span className="text-orange-600">(-{item.discountPercent}%)</span>
                  )}
                </div>
              )}
            </div>

            {/* Right arrow */}
            <div className="self-center text-slate-300 hover:text-orange-500 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
