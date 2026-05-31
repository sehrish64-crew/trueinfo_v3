import type { Metadata } from 'next'
import RefundPolicyPageClient from './refund-policy-client'

export const metadata: Metadata = {
  title: 'Refund Policy - AutoFactsCheck',
  description: 'Learn about TrueInfoProviderrefund policy and how to request a refund for your vehicle history report.',
  openGraph: {
    title: 'Refund Policy - TrueInfoProvider',
    description: 'Our customer-friendly refund policy details.',
    url: 'https://autofactscheck.com/refund-policy',
    type: 'website',
  },
}

export default function RefundPolicyPage() {
  return <RefundPolicyPageClient />
}
