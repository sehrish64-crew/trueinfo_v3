"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Country {
  code: string
  name: string
  countryCode: string
  currency: string
  language: string
}

import countriesList from '@/lib/countries'

export const countries: Country[] = countriesList


interface CountryContextType {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

const defaultCountry = countries.find(c => c.code === 'GB') || countries[0]

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(defaultCountry)

  if (process.env.NODE_ENV !== 'production') {
    // quick debug: how many countries are available
    console.log('[i18n] Loaded countries count:', countries.length)
  }

  useEffect(() => {
    try {
      document.cookie = `cv_locale=${defaultCountry.language}; path=/; max-age=${60 * 60 * 24 * 365}`
    } catch (e) {
      // ignore cookie errors
    }
  }, [])

  const setSelectedCountry = (_country: Country) => {
    setSelectedCountryState(defaultCountry)
    try {
      localStorage.setItem('selectedCountryCode', defaultCountry.code)
      // Also write a cookie so server-rendered pages can pick up the selected language
      document.cookie = `cv_locale=${defaultCountry.language}; path=/; max-age=${60 * 60 * 24 * 365}`
    } catch (e) {
      // ignore localStorage / cookie errors
    }
    // Dev log to help debugging language selection
    if (process.env.NODE_ENV !== 'production') {
      console.log('[i18n] Selected country is locked to:', defaultCountry.code)
    }
  }

  return (
    <CountryContext.Provider value={{ selectedCountry: selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
}
