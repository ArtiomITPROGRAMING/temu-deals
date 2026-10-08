import React from 'react';
import { CATEGORIES_LIST } from '../data/mockProducts';
import {
  Cpu,
  Smartphone,
  Laptop,
  Monitor,
  Zap,
  Gamepad2,
  Home,
  Shirt,
  Sparkles,
  Car,
  Dumbbell,
  Headphones,
  Grid,
} from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
  selectedCategory: string;
}

const iconMap: Record<string, React.ElementType> = {
  Grid,
  Cpu,
  Smartphone,
  Laptop,
  Monitor,
  Zap,
  Gamepad2,
  Home,
  Shirt,
  Sparkles,
  Car,
  Dumbbell,
  Headphones,
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Популярные категории
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ищите лучшие скидки в интересующих вас разделах
          </p>
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORIES_LIST.filter(c => c.id !== 'all').map((cat) => {
          const Icon = iconMap[cat.icon] || Grid;
          const isSelected = selectedCategory === cat.name;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col items-center text-center ${
                isSelected
                  ? 'bg-orange-50 border-orange-300 ring-2 ring-orange-200 shadow-sm'
                  : 'bg-white hover:bg-slate-50/80 border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Max discount tag top right */}
              {cat.maxDiscount && (
                <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full text-[9px] font-black bg-orange-100 text-orange-700">
                  до {cat.maxDiscount}
                </span>
              )}

              {/* Icon Container */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Category Name */}
              <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors">
                {cat.name}
              </div>

              {/* Items Count */}
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                {cat.count} предложений
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
