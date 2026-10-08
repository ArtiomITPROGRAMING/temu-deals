import React from 'react';
import { X, Flame, ShieldAlert, LineChart, BellRing, CheckCircle2 } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Как работает DealFinder?</h3>
            <p className="text-xs text-slate-500">Почему мы отличаем настоящую скидку от обмана</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          {/* Step 1 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Сбор цен 24/7</h4>
              <p className="text-xs text-slate-600">
                Наши поисковые боты ежедневно сканируют миллионы страниц и товаров напрямую на фабриках и складах Temu, сохраняя динамику каждого изменения стоимости за 90 дней.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Защита от искусственных скидок</h4>
              <p className="text-xs text-slate-600">
                Часто продавцы завышают старую цену (например, с 2 100 ₽ до 5 000 ₽) перед «черной пятницей» или распродажей. DealFinder рассчитывает <strong>реальную среднюю цену за 90 дней</strong> и показывает истинную экономию, а не фальшивые проценты!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Индикатор выгоды</h4>
              <p className="text-xs text-slate-600 mb-2">
                Каждый товар получает понятный статус:
              </p>
              <div className="space-y-1 text-xs">
                <div>🔥 <strong>Очень выгодно</strong> — цена на 25%+ ниже типичной и вблизи минимума.</div>
                <div>🟢 <strong>Хорошая цена</strong> — честная скидка 12-25% от рыночной стоимости.</div>
                <div>🟡 <strong>Обычная цена</strong> — скидка минимальна или старая цена завышена.</div>
                <div>🔴 <strong>Цена выше обычной</strong> — сейчас покупать не стоит, цена выросла.</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/60 border border-sky-200">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-black text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Умные уведомления</h4>
              <p className="text-xs text-slate-600">
                Укажите желаемую цену (например: «уведомить меня, когда станет дешевле 900 ₽»), и мы пришлем мгновенное оповещение прямо в ваш Telegram или на электронную почту.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-colors"
          >
            Понятно, спасибо
          </button>
        </div>
      </div>
    </div>
  );
};
