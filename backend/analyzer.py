import statistics
from typing import List
from .models import Product, DealAnalysis, PricePoint


def analyze_product_deal(product: Product) -> DealAnalysis:
    """
    Анализирует динамику цен за 90 дней, определяет реальную экономию
    и выявляет накрученные фейковые скидки продавцов.
    """
    current_price = product.currentPrice
    old_price = product.oldPrice

    # 1. Заявленная скидка в магазине
    shop_discount_pct = 0
    if old_price > current_price:
        shop_discount_pct = round(((old_price - current_price) / old_price) * 100)

    # 2. Анализ истории цен
    history_prices = [p.price for p in product.history] if product.history else [current_price]
    avg_price_90d = round(statistics.mean(history_prices), 2)
    min_price_hist = min(history_prices)
    max_price_hist = max(history_prices)

    # 3. Реальная экономия по отношению к средней цене за 90 дней
    real_savings = max(0.0, round(avg_price_90d - current_price, 2))
    real_discount_pct = 0
    if avg_price_90d > 0 and current_price < avg_price_90d:
        real_discount_pct = round(((avg_price_90d - current_price) / avg_price_90d) * 100)

    # 4. Проверка на искусственное завышение старой цены перед распродажей
    # Если заявленная старая цена более чем на 35% превышает максимальную зафиксированную цену
    is_artificial = False
    if old_price > (max_price_hist * 1.35) and shop_discount_pct > 40 and real_discount_pct < 15:
        is_artificial = True

    # 5. Классификация статуса сделки и оценка 0-100
    deal_score = 50
    if real_discount_pct >= 40:
        deal_status = "super_deal"
        status_badge = "🔥 Суперскидка"
        deal_score = 98
        verdict = "Исторический минимум! Реальная скидка подтверждена за 90 дней."
    elif real_discount_pct >= 15:
        deal_status = "good_price"
        status_badge = "✨ Выгодная цена"
        deal_score = 82
        verdict = "Цена заметно ниже обычной, товар стоит брать."
    elif is_artificial:
        deal_status = "high_price"
        status_badge = "⚠️ Накрученная цена"
        deal_score = 25
        verdict = "Внимание: продавец искусственно завысил старую цену перед акцией."
    elif current_price > avg_price_90d:
        deal_status = "high_price"
        status_badge = "📈 Дороже обычного"
        deal_score = 35
        verdict = "Цена сейчас выше средней, рекомендуем подождать снижения."
    else:
        deal_status = "normal_price"
        status_badge = "⚖️ Обычная цена"
        deal_score = 60
        verdict = "Стандартная рыночная цена без выраженной экономии."

    return DealAnalysis(
        productId=product.id,
        shopDiscountPercent=shop_discount_pct,
        averagePrice90d=avg_price_90d,
        minPriceHistorical=min_price_hist,
        maxPriceHistorical=max_price_hist,
        realSavings=real_savings,
        realDiscountPercent=real_discount_pct,
        dealStatus=deal_status,
        statusBadge=status_badge,
        dealScore=deal_score,
        verdict=verdict,
        isArtificialDiscount=is_artificial,
    )
