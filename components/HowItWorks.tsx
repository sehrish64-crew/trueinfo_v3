"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

export default function HowItWorks() {
  const { t } = useTranslations()
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '1',
      titleKey: 'howitworks_step1_title',
      descKey: 'howitworks_step1_desc',
      linkKey: 'howitworks_step1_link',
    },
    {
      number: '2',
      titleKey: 'howitworks_step2_title',
      descKey: 'howitworks_step2_desc',
      linkKey: 'howitworks_step2_link',
    },
    {
      number: '3',
      titleKey: 'howitworks_step3_title',
      descKey: 'howitworks_step3_desc',
      linkKey: 'howitworks_step3_link',
    },
    {
      number: '4',
      titleKey: 'howitworks_step4_title',
      descKey: 'howitworks_step4_desc',
      linkKey: 'howitworks_step4_link',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, index])
            }, index * 150)
          })
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#780000]/10 via-white to-[#780000]/5 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {t('howitworks_title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            {t('howitworks_subtitle')}
          </p>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >

                <div className="flex gap-5 items-start">

                  {/* NUMBER BADGE */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#780000] blur-xl opacity-30 rounded-2xl"></div>

                    <div className="w-16 h-16 bg-[#780000] rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition">
                      <span className="text-white text-2xl font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#780000] transition">
                      {t(step.titleKey)}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {t(step.descKey)}
                    </p>

                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#780000] font-semibold hover:opacity-80"
                    >
                      {t(step.linkKey)}
                      <ArrowRight className="w-4 h-4" />
                    </a>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[#780000] hover:bg-[#5a0000] text-white font-bold px-8 py-4 rounded-full transition hover:scale-105"
          >
            {t('howitworks_cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  )
}