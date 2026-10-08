import { Product, AnalyzedDeal, DealStatus } from '../types';

export function analyzeDeal(product: Product): AnalyzedDeal {
  const current = product.currentPrice;
  const old = product.oldPrice;

  // 1. Calculate store claimed discount
  const shopDiscountPercent = old > current ? Math.round(((old - current) / old) * 100) : 0;

  // 2. Analyze history: calculate 90-day average price and all-time min/max
  const historyPrices = product.history.map(h => h.price);
  const minPriceHistorical = historyPrices.length > 0 ? Math.min(...historyPrices, current) : current;
  const maxPriceHistorical = historyPrices.length > 0 ? Math.max(...historyPrices, old) : old;

  // Average price over history
  const averagePrice90d = historyPrices.length > 0
    ? Math.round(historyPrices.reduce((a, b) => a + b, 0) / historyPrices.length)
    : Math.round(old * 0.9);

  // 3. Real savings based on standard average price
  const realSavings = Math.max(0, averagePrice90d - current);
  const realDiscountPercent = averagePrice90d > current
    ? Math.round(((averagePrice90d - current) / averagePrice90d) * 100)
    : 0;

  // 4. Detect artificial price inflation
  // If store claims big discount (e.g. 50%), but real discount against 90-day average is small (< 10%)
  const isArtificialDiscount = shopDiscountPercent >= 30 && realDiscountPercent <= 12;

  // 5. Deal Score (0 - 100)
  // Weighted: real discount (60%), how close to historical minimum (25%), rating (15%)
  const minRatio = maxPriceHistorical > minPriceHistorical 
    ? (maxPriceHistorical - current) / (maxPriceHistorical - minPriceHistorical) 
    : 0.5;
  const ratingBonus = (product.rating / 5) * 15;
  const discountScore = Math.min(60, realDiscountPercent * 1.3);
  const minScore = Math.min(25, minRatio * 25);
  
  let dealScore = Math.round(discountScore + minScore + ratingBonus);
  if (isArtificialDiscount) {
    dealScore = Math.min(dealScore, 58); // cap inflated deals
  }
  dealScore = Math.max(10, Math.min(99, dealScore));

  // 6. Status and indicators
  let dealStatus: DealStatus = 'normal_price';
  let statusLabel = 'Обычная цена';
  let statusBadge = '🟡 Обычная цена';
  let statusColor = 'text-amber-600 bg-amber-50 border-amber-200';
  let verdict = `Цена соответствует обычной средней стоимости за последние 90 дней (${averagePrice90d.toLocaleString('ru-RU')} ₽).`;

  if (current > averagePrice90d * 1.05) {
    dealStatus = 'high_price';
    statusLabel = 'Цена выше обычной';
    statusBadge = '🔴 Цена выше обычной';
    statusColor = 'text-rose-600 bg-rose-50 border-rose-200';
    verdict = `Не рекомендуем к покупке: текущая цена на ${Math.round(((current - averagePrice90d) / averagePrice90d) * 100)}% выше средней за 90 дней. Рекомендуем подождать снижения.`;
  } else if (isArtificialDiscount) {
    dealStatus = 'normal_price';
    statusLabel = 'Искусственная скидка';
    statusBadge = '🟡 Не такая выгодная, как кажется';
    statusColor = 'text-amber-600 bg-amber-50 border-amber-200';
    verdict = `Внимание: магазин завысил старую цену (${old.toLocaleString('ru-RU')} ₽). За последние 90 дней товар обычно стоил ${averagePrice90d.toLocaleString('ru-RU')} ₽, реальная экономия составляет всего ${realDiscountPercent}%.`;
  } else if (realDiscountPercent >= 30 || current <= minPriceHistorical * 1.03) {
    dealStatus = 'super_deal';
    statusLabel = 'Супервыгодно';
    statusBadge = '🔥 Очень выгодно';
    statusColor = 'text-orange-600 bg-orange-50 border-orange-200';
    verdict = `Отличный момент для покупки! Текущая цена на ${realDiscountPercent}% ниже средней за 90 дней и находится вблизи исторического минимума.`;
  } else if (realDiscountPercent >= 12) {
    dealStatus = 'good_price';
    statusLabel = 'Хорошая цена';
    statusBadge = '🟢 Хорошая цена';
    statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    verdict = `Выгодное предложение: вы экономите ${realSavings.toLocaleString('ru-RU')} ₽ относительно типичной цены на рынке.`;
  }

  return {
    product,
    shopDiscountPercent,
    averagePrice90d,
    minPriceHistorical,
    maxPriceHistorical,
    realSavings,
    realDiscountPercent,
    dealStatus,
    statusLabel,
    statusBadge,
    statusColor,
    dealScore,
    verdict,
    isArtificialDiscount
  };
}
