'use client'

import { formatCurrency } from '@/lib/prices'

interface PaymentMethodSelectorProps {
  amount: number
  currency: string
  packageId: 'basic' | 'standard' | 'premium'
}

const STRIPE_CHECKOUT_URLS: Record<'basic' | 'standard' | 'premium', string> = {
  basic: 'https://buy.stripe.com/fZu5kv0QBf6o0Yi6PS0kE03',
  standard: 'https://buy.stripe.com/9B67sDdDn0bu9uOb680kE00',
  premium: 'https://buy.stripe.com/fZu5kvfLvf6ogXg6PS0kE02',
}

export function PaymentMethodSelector({
  amount,
  currency,
  packageId,
}: PaymentMethodSelectorProps) {
  const stripeUrl = STRIPE_CHECKOUT_URLS[packageId]

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg border border-gray-200 relative z-10">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Secure Stripe Checkout</h2>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            Your selected plan will be processed through Stripe. Click the button below to complete payment.
          </p>
        </div>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-700">Selected package</span>
            <span className="text-sm font-semibold text-gray-900">{packageId === 'basic' ? 'Basic' : packageId === 'standard' ? 'Standard' : 'Premium'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Total</span>
            <span className="text-base font-semibold text-gray-900">{formatCurrency(amount, currency)}</span>
          </div>
        </div>

        <a
          href={stripeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-[#780000] text-white rounded-xl font-semibold hover:bg-[#5a0000] transition"
        >
          Pay with Stripe
        </a>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6">
        You will be redirected to Stripe's secure checkout page.
      </p>
    </div>
  )
}
