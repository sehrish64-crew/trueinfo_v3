import type { Metadata } from 'next'
import ContactUsClient from './contact-us-client'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact TrueInfoProvider - Customer Support',
  description: 'Get in touch with TrueInfoProvider for any inquiries, support, or sales questions. Available 24/7 to help you.',
  openGraph: {
    title: 'Contact TrueInfoProvider',
    description: 'Reach out to our customer support team for assistance with vehicle history reports.',
    url: 'https://trueinfoprovider.com/contact-us',
    type: 'website',
  },
}

export default function ContactUsPage() {
  return <ContactUsClient />
}
