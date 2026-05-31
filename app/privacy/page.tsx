import type { Metadata } from 'next'
import PrivacyPageClient from './privacy-client'

export const metadata: Metadata = {
  title: 'Privacy Policy - AutoFactsCheck',
  description: 'Read our privacy policy to understand how TrueInfoProvidercollects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy - TrueInfoProvider',
    description: 'Our commitment to protecting your personal information and privacy.',
    url: 'https://autofactscheck.com/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
