import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, number> = {
  RUB: 1,       // base
  USD: 0.0108,  // 1 RUB ~ 0.0108 USD (92.5 RUB/USD)
  EUR: 0.0099,  // 1 RUB ~ 0.0099 EUR (101 RUB/EUR)
  KZT: 5.15,    // 1 RUB ~ 5.15 KZT
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
  KZT: '₸',
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  RUB: 'RUB (Российский рубль)',
  USD: 'USD (Доллар США)',
  EUR: 'EUR (Евро)',
  KZT: 'KZT (Казахстанский тенге)',
};

export function convertPrice(rubAmount: number, targetCurrency: Currency): number {
  if (targetCurrency === 'RUB') return rubAmount;
  const rate = CURRENCY_RATES[targetCurrency];
  const converted = rubAmount * rate;
  if (targetCurrency === 'USD' || targetCurrency === 'EUR') {
    return Math.round(converted * 100) / 100;
  }
  return Math.round(converted);
}

export function formatPrice(rubAmount: number, currency: Currency = 'RUB'): string {
  const converted = convertPrice(rubAmount, currency);
  const symbol = CURRENCY_SYMBOLS[currency];

  if (currency === 'USD') {
    return `$${converted.toFixed(2)}`;
  }
  if (currency === 'EUR') {
    return `€${converted.toFixed(2)}`;
  }
  return `${converted.toLocaleString('ru-RU')} ${symbol}`;
}
