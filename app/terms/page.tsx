import type { Metadata } from 'next'
import TermsPageClient from './terms-client'

export const metadata: Metadata = {
  title: 'Terms and Conditions - AutoFactsCheck',
  description: 'Read the terms and conditions for using TrueInfoProviderservices. Understand your rights and responsibilities.',
  openGraph: {
    title: 'Terms and Conditions - TrueInfoProvider',
      description: 'Our terms explain the rules for using TrueInfoProvider vehicle history reports.',
    url: 'https://autofactscheck.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
