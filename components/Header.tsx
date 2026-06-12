"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Search, Menu } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

export default function Header() {
  const { t } = useTranslations()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLink =
    "relative text-gray-700 hover:text-[#780000] transition-all font-semibold group"

  const isActivePath = (href: string) => pathname === href

  const mobileNavLink = (href: string) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
      isActivePath(href)
        ? 'bg-gradient-to-r from-black via-[#780000] to-red-600 text-white border-transparent shadow-md'
        : 'text-black border-gray-200 hover:bg-red-50 hover:text-[#780000]'
    }`

  const activeLine =
    "absolute left-0 -bottom-1 w-0 h-[2px] bg-[#780000] group-hover:w-full transition-all duration-300"

  return (
    <>
      <header className="sticky top-0 z-[40] bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              {/* <img src="/logo.png" alt="TrueInfoProvider" className="h-8 w-auto sm:h-9" /> */}
              <div className="flex items-center leading-none">
                <span className="max-w-[190px] text-[15px] font-black uppercase tracking-[0.12em] whitespace-nowrap bg-gradient-to-r from-black via-[#780000] to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(120,0,0,0.18)] sm:max-w-none sm:text-[14px] md:text-[15px] lg:text-xl">
                  True Info Provider
                </span>
           
              </div>
            </Link>

            {/* NAV */}
            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className={navLink}>
                {t('nav_home')}
                <span className={activeLine}></span>
              </Link>

              <Link href="/pricing" className={navLink}>
                {t('nav_pricing')}
                <span className={activeLine}></span>
              </Link>

              <Link href="/contact-us" className={navLink}>
                {t('nav_contact')}
                <span className={activeLine}></span>
              </Link>

              <Link href="/about-us" className={navLink}>
                {t('nav_about')}
                <span className={activeLine}></span>
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">


              {/* MOBILE MENU */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden rounded-lg hover:bg-gray-100 transition"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BORDER ACCENT */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#780000] to-transparent"></div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-3">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              {/* <img src="/logo.png" className="h-8" alt="TrueInfoProvider" /> */}
              <div className="flex items-center leading-none">
                <span className="max-w-[190px] text-[13px] font-black uppercase tracking-[0.12em] whitespace-nowrap bg-gradient-to-r from-black via-[#780000] to-red-600 bg-clip-text text-transparent sm:max-w-none sm:text-[14px] md:text-[15px] lg:text-xl">
                  True Info Provider
                </span>
               
              </div>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>

          <div className="space-y-3 text-sm font-semibold">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLink('/')}>
              {t('nav_home')}
            </Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLink('/pricing')}>
              {t('nav_pricing')}
            </Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLink('/contact-us')}>
              {t('nav_contact')}
            </Link>
            <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLink('/about-us')}>
              {t('nav_about')}
            </Link>
          </div>
        </div>
      )}

      {/* COUNTRY DROPDOWN (unchanged logic, styling improved minimal idea) */}
    </>
  )
}