"use client"

import { useState } from 'react'
import Link from 'next/link'
import { X, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useCountry, countries } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'

export default function Header() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const { t } = useTranslations()
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country)
    setIsCountryDropdownOpen(false)
    setSearchQuery('')
  }

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

              {/* COUNTRY */}
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:border-[#780000] hover:shadow-sm transition-all"
              >
                <img
                  src={`https://flagcdn.com/w40/${selectedCountry?.countryCode}.png`}
                  className="w-5 h-4 rounded"
                  alt=""
                />
                <span className="text-sm font-semibold text-gray-700">
                  {selectedCountry?.code}
                </span>
              </button>

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
      {isCountryDropdownOpen && (
        <div className="fixed inset-0 z-[70] bg-black/40">
          <div className="bg-white max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-xl max-h-[80vh] flex flex-col">
            <Input
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-2">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="flex items-center gap-2 p-3 rounded-lg border hover:border-[#780000] hover:bg-red-50 transition"
                >
                  <img
                    src={`https://flagcdn.com/w80/${country.countryCode}.png`}
                    className="w-6 h-4 rounded"
                  />
                  <span className="text-sm font-medium">{country.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCountryDropdownOpen(false)}
              className="mt-5 text-sm text-gray-500 hover:text-[#780000]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}