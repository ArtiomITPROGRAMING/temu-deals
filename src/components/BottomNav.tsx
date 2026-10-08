import React from 'react';
import {
  Flame,
  Search,
  ShoppingBag,
  User,
  Link2,
  TrendingDown,
  Heart,
} from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTemuAnalyzer: () => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  setActiveView,
  cartCount,
  onOpenCart,
  onOpenTemuAnalyzer,
  favoritesCount,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-2xl px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around select-none"
      aria-label="Мобильная навигация"
    >
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeView === 'home' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Flame className={`w-5 h-5 ${activeView === 'home' ? 'fill-orange-500' : ''}`} />
        <span className="text-[10px] mt-0.5">Главная</span>
      </button>

      {/* 2. Search / Catalog */}
      <button
        type="button"
        onClick={() => {
          setActiveView('search');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeView === 'search' || activeView === 'categories'
            ? 'text-orange-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Каталог</span>
      </button>

      {/* 3. Center Hero Action: Temu Link Analyzer */}
      <div className="flex-1 flex justify-center -mt-5">
        <button
          type="button"
          onClick={onOpenTemuAnalyzer}
          className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white shadow-lg shadow-orange-500/35 flex flex-col items-center justify-center active:scale-95 transition-transform border-2 border-white cursor-pointer"
          title="Вставить ссылку Temu для анализа и выкупа"
        >
          <Link2 className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* 4. Cart */}
      <button
        type="button"
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center flex-1 py-1 rounded-xl text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-orange-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-slate-900 text-white ring-2 ring-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5 font-medium">Корзина</span>
      </button>

      {/* 5. Account / Favorites */}
      <button
        type="button"
        onClick={() => {
          setActiveView('account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeView === 'account' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Кабинет</span>
      </button>
    </nav>
  );
};
