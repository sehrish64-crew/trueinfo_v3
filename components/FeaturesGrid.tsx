"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, TrendingUp, FileText, AlertTriangle, Zap, Shield } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

export default function FeaturesGrid() {
  const { t } = useTranslations()
  const [activeTab, setActiveTab] = useState('odometer')
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const tabs = [
    { id: 'odometer', label: 'Odometer Check' },
    { id: 'ownership', label: 'Ownership History' },
    { id: 'photos', label: 'Photos on Sale' },
    { id: 'damage', label: 'Damage Check' },
    { id: 'technical', label: 'Technical Data' },
    { id: 'stolen', label: 'Stolen VIN Check' },
  ]

  // Auto-cycle through tabs
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab)
        const nextIndex = (currentIndex + 1) % tabs.length
        return tabs[nextIndex].id
      })
    }, 5000) // Change tab every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, tabs])

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 animate-fade-in px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-[1.2]">
            Make Smarter Car Decisions with Verified History Reports
          </h2>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
            Instantly uncover hidden issues, ownership records, mileage accuracy, and accident history with TrueInfoProvider.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 sm:gap-2 md:gap-4 border-b border-border pb-1 sm:pb-0 animate-fade-in-up">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative min-w-max">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs sm:text-sm md:text-base font-semibold pb-2 sm:pb-3 px-2 sm:px-3 transition ${activeTab === tab.id
                  ? 'text-[#780000]'
                  : 'text-muted-foreground hover:text-[#780000]'
                  }`}
              >
                {tab.label}
              </button>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
                {activeTab === tab.id && (
                  <div className="h-full bg-[#780000] w-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 sm:mt-10">

          {/* ODOMETER */}
          {activeTab === 'odometer' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/odometer-check-en@1x.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-[#780000]/10 flex items-center justify-center rounded-xl">
                  <TrendingUp className="text-[#780000]" />
                </div>

                <h3 className="text-2xl font-bold">Past Odometer Readings</h3>
                <p className="text-gray-600">
                  Detect mileage fraud by analyzing historical odometer records across multiple sources.
                </p>

                <Link href="/pricing" className="bg-[#780000] hover:bg-[#5a0000] text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  Check Your Car <ChevronRight />
                </Link>
              </div>
            </div>
          )}

          {/* OWNERSHIP */}
          {activeTab === 'ownership' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/ownership.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-[#780000]/10 flex items-center justify-center rounded-xl">
                  <FileText className="text-[#780000]" />
                </div>

                <h3 className="text-2xl font-bold">Ownership History</h3>
                <p className="text-gray-600">
                  Track previous owners, usage type, and complete ownership timeline.
                </p>

                <Link href="/pricing" className="bg-[#780000] hover:bg-[#5a0000] text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  Check Ownership <ChevronRight />
                </Link>
              </div>
            </div>
          )}

          {/* PHOTOS */}
          {activeTab === 'photos' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/photos-sale.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-[#780000]/10 flex items-center justify-center rounded-xl">
                  <Zap className="text-[#780000]" />
                </div>

                <h3 className="text-2xl font-bold">Photos on Sale</h3>
                <p className="text-gray-600">
                  Compare vehicle images over time and identify possible damage.
                </p>

                <Link href="/pricing" className="bg-[#780000] hover:bg-[#5a0000] text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  View Photos <ChevronRight />
                </Link>
              </div>
            </div>
          )}

          {/* DAMAGE */}
          {activeTab === 'damage' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/damage.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-red-100 flex items-center justify-center rounded-xl">
                  <AlertTriangle className="text-red-600" />
                </div>

                <h3 className="text-2xl font-bold">Damage Check</h3>
                <p className="text-gray-600">
                  Discover accident, flood, fire, and insurance-reported damages.
                </p>

                <Link href="/pricing" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  Check Damage <ChevronRight />
                </Link>
              </div>
            </div>
          )}

          {/* TECHNICAL */}
          {activeTab === 'technical' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/specification.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-[#780000]/10 flex items-center justify-center rounded-xl">
                  <Zap className="text-[#780000]" />
                </div>

                <h3 className="text-2xl font-bold">Technical Data</h3>
                <p className="text-gray-600">
                  Full specifications including engine, transmission, and features.
                </p>

                <button className="bg-[#780000] hover:bg-[#5a0000] text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  View Specs <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* STOLEN */}
          {activeTab === 'stolen' && (
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              <div className="relative w-full h-52 sm:h-64 md:h-80">
                <Image src="/stolen.webp" alt="" fill className="object-contain" />
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 bg-[#780000]/10 flex items-center justify-center rounded-xl">
                  <Shield className="text-[#780000]" />
                </div>

                <h3 className="text-2xl font-bold">Stolen VIN Check</h3>
                <p className="text-gray-600">
                  Verify if a vehicle is reported stolen or flagged.
                </p>

                <Link href="/pricing" className="bg-[#780000] hover:bg-[#5a0000] text-white px-6 py-3 rounded-full inline-flex items-center gap-2">
                  Verify Status <ChevronRight />
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Badge */}
        <div className="mt-10 sm:mt-16 p-2.5 sm:p-6 bg-[#780000]/10 border border-[#780000]/20 rounded-xl flex flex-col gap-2.5 sm:flex-row sm:gap-4">
          <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#780000]/20 rounded-full flex items-center justify-center shrink-0 text-xs sm:text-base">
            ✓
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-base font-bold">Official NMVTIS Source</h4>
            <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed">
              TrueInfoProvider is an approved NMVTIS provider helping prevent fraud and unsafe vehicle purchases.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
