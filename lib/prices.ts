export const PRICING_MAP: Record<string, { basic: number; standard: number; premium: number }> = {
  'USD': { basic: 30, standard: 40, premium: 50 },
  'EUR': { basic: 30, standard: 40, premium: 50 },
  'GBP': { basic: 30, standard: 40, premium: 50 },
  'AUD': { basic: 30, standard: 40, premium: 50 },
  'PLN': { basic: 30, standard: 40, premium: 50 },
  'SEK': { basic: 30, standard: 40, premium: 50 },
  'AED': { basic: 30, standard: 40, premium: 50 },
  'MDL': { basic: 30, standard: 40, premium: 50 },
  'BAM': { basic: 30, standard: 40, premium: 50 },
  'RON': { basic: 30, standard: 40, premium: 50 },
  'DKK': { basic: 30, standard: 40, premium: 50 },
  'CHF': { basic: 30, standard: 40, premium: 50 },
  'CZK': { basic: 30, standard: 40, premium: 50 },
  'BGN': { basic: 30, standard: 40, premium: 50 },
  'HUF': { basic: 30, standard: 40, premium: 50 },
  'UAH': { basic: 30, standard: 40, premium: 50 },
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'AUD': 'A$',
  'PLN': 'zł',
  'SEK': 'kr',
  'AED': 'د.إ',
  'MDL': 'L',
  'BAM': 'KM',
  'RON': 'lei',
  'DKK': 'kr',
  'CHF': 'CHF',
  'CZK': 'Kč',
  'BGN': 'лв',
  'HUF': 'Ft',
  'UAH': '₴',
}

export function getPrice(packageId: 'basic' | 'standard' | 'premium', currency = 'GBP') {
  const pricing = PRICING_MAP[currency] || PRICING_MAP['GBP']
  return pricing[packageId]
}

export function getCurrencySymbol(currency = 'GBP') {
  return CURRENCY_SYMBOLS[currency] || '£'
}

export function formatCurrency(amount: number, currency = 'GBP', locale = 'en-GB') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount)
  } catch (e) {
    // Fallback to simple formatting
    const symbol = getCurrencySymbol(currency)
    return `${symbol} ${amount.toFixed(2)}`
  }
}
