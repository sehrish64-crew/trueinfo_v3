export const PRICING_MAP: Record<string, { basic: number; standard: number; premium: number }> = {
  'USD': { basic: 50, standard: 60, premium: 70 },
  'EUR': { basic: 50, standard: 60, premium: 70 },
  'GBP': { basic: 50, standard: 60, premium: 70 },
  'AUD': { basic: 50, standard: 60, premium: 70 },
  'PLN': { basic: 50, standard: 60, premium: 70 },
  'SEK': { basic: 50, standard: 60, premium: 70 },
  'AED': { basic: 50, standard: 60, premium: 70 },
  'MDL': { basic: 50, standard: 60, premium: 70 },
  'BAM': { basic: 50, standard: 60, premium: 70 },
  'RON': { basic: 50, standard: 60, premium: 70 },
  'DKK': { basic: 50, standard: 60, premium: 70 },
  'CHF': { basic: 50, standard: 60, premium: 70 },
  'CZK': { basic: 50, standard: 60, premium: 70 },
  'BGN': { basic: 50, standard: 60, premium: 70 },
  'HUF': { basic: 50, standard: 60, premium: 70 },
  'UAH': { basic: 50, standard: 60, premium: 70 },
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
