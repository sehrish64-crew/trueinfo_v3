"use client"

import { useState } from 'react'
import Link from 'next/link'
import { X, Search, Menu } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

export default function Header() {
  const { t } = useTranslations()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLink =
    "relative text-gray-700 hover:text-[#780000] transition-all font-semibold group"

  const activeLine =
    "absolute left-0 -bottom-1 w-0 h-[2px] bg-[#780000] group-hover:w-full transition-all duration-300"

  return (
    <>
      <header className="sticky top-0 z-[40] bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="TrueInfoProvider" className="h-9 sm:h-10 w-auto" />
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
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
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
        <div className="fixed inset-0 z-[100] bg-white p-6">
          <div className="flex justify-between items-center mb-8">
            <img src="/logo.png" className="h-8" />
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X />
            </button>
          </div>

          <div className="space-y-4 text-lg font-semibold">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#780000]">Home</Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#780000]">Pricing</Link>
            <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#780000]">Contact</Link>
            <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#780000]">About</Link>
          </div>
        </div>
      )}

      {/* COUNTRY DROPDOWN (unchanged logic, styling improved minimal idea) */}
    </>
  )
}