import React from 'react';
import { Search, Flame, Sparkles, TrendingDown, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (query: string) => void;
  onTagClick: (tag: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onTagClick,
}) => {
  const popularTags = [
    'Наушники',
    'Видеокарты',
    'Телефоны',
    'Ноутбуки',
    'Клавиатуры',
    'Мониторы',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-transparent py-10 sm:py-16">
      {/* Decorative gradient blur orbs */}
      <div className="absolute top-10 left-1/4 -z-10 w-72 h-72 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute top-1/2 right-10 -z-10 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text, Search, Popular Queries */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>Умный анализ скидок и честных цен 2026</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Найди самые{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                выгодные
              </span>{' '}
              товары
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Мы сравниваем цены и помогаем найти товары с{' '}
              <span className="font-semibold text-slate-900">настоящими большими скидками</span>,
              отсекая искусственно завышенные цены и фейковые акции.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSubmit} className="relative max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-orange-500/8 border border-slate-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
                <div className="flex-1 flex items-center px-3 gap-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Что вы хотите купить? (напр. RTX 3060, наушники...)"
                    className="w-full py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-hidden bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all text-center shrink-0 cursor-pointer"
                >
                  Найти предложения
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-500 mb-2">
                Популярные запросы:
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagClick(tag)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 border border-slate-200 text-slate-700 shadow-2xs transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Temu Deals Showcase Card (Matching Reference Style) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Visual Box */}
              <div className="relative rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 p-7 text-white shadow-2xl shadow-orange-500/30 overflow-hidden">
                {/* Background decorative circles */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 blur-xl" />
                <div className="absolute top-4 right-4 text-4xl opacity-20 font-black">
                  %
                </div>

                {/* Badge top */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                  <span>Алгоритм DealFinder AI</span>
                </div>

                <h3 className="text-2xl font-black mb-2 leading-tight">
                  Экономьте до 70% на каждой покупке
                </h3>
                <p className="text-xs text-orange-100 mb-6 leading-relaxed">
                  Мы отслеживаем более 2 000 000 цен ежедневно напрямую на фабриках, складах и серверах Temu.
                </p>

                {/* Live mini comparison badge card */}
                <div className="bg-white rounded-2xl p-4 text-slate-900 shadow-lg space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">Пример анализа:</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-100 text-orange-700">
                      🔥 Очень выгодно
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-xl">
                      🎧
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        Наушники Pro 4 Bluetooth
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-lg font-black text-slate-900">999 ₽</span>
                        <span className="text-xs text-slate-400 line-through">2 699 ₽</span>
                        <span className="text-xs font-black text-orange-600">-63%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-800 flex items-center justify-between font-medium">
                    <span>Реальная экономия:</span>
                    <span className="font-bold text-emerald-700">1 151 ₽ (57%)</span>
                  </div>
                </div>

                {/* Stats row below */}
                <div className="grid grid-cols-3 gap-2 mt-5 text-center text-white">
                  <div>
                    <div className="text-lg font-black">2.4M+</div>
                    <div className="text-[10px] text-orange-200">Товаров в базе</div>
                  </div>
                  <div>
                    <div className="text-lg font-black">15+</div>
                    <div className="text-[10px] text-orange-200">Маркетплейсов</div>
                  </div>
                  <div>
                    <div className="text-lg font-black">24/7</div>
                    <div className="text-[10px] text-orange-200">Трекинг цен</div>
                  </div>
                </div>
              </div>

              {/* Floating notification badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2.5 max-w-[240px]">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-slate-900 block">RTX 3060 Dual</span>
                  <span className="text-emerald-600 font-semibold">-28% реальная скидка</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
