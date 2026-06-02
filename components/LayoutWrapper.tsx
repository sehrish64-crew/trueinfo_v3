"use client"

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CountryProvider } from '@/contexts/CountryContext'

const whatsappLink = 'https://wa.me/447828760930'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Ensure admin pages still have the country context available for translations
    return (
      <CountryProvider>
        {children}
      </CountryProvider>
    )
  }

  return (
    <CountryProvider>
      <Header />
      <div className="fixed bottom-6 right-6 z-[9999]">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-white shadow-2xl shadow-black/25 transition hover:bg-[#1eb954]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.149-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.618-.92-2.216-.242-.579-.487-.5-.672-.51l-.572-.01c-.198 0-.52.075-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.1 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.122-.272-.198-.57-.347z" />
            <path d="M20.52 3.48A11.96 11.96 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.116.55 4.087 1.513 5.831L0 24l6.36-1.664A11.93 11.93 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.205-1.247-6.207-3.48-8.52zM12 21.75c-1.812 0-3.503-.49-4.997-1.386l-.357-.213-3.78.987.98-3.69-.232-.376A9.69 9.69 0 0 1 2.25 12c0-5.395 4.355-9.75 9.75-9.75 2.602 0 5.048 1.015 6.885 2.86A9.72 9.72 0 0 1 21.75 12c0 5.395-4.355 9.75-9.75 9.75z" />
          </svg>
          <span className="text-sm font-semibold">WhatsApp</span>
        </a>
      </div>
      {children}
      <Footer />
    </CountryProvider>
  )
}
