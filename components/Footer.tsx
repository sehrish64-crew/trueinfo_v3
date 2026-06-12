"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

const footerLinks = [
  { key: 'footer_privacy', href: '/privacy' },
  { key: 'footer_terms', href: '/terms' },
  { key: 'footer_refund', href: '/refund-policy' },
]

const socialLinks = [
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const { t } = useTranslations()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  return (
    <footer className="relative overflow-hidden text-white bg-gradient-to-b from-black via-[#120000] to-black">

      {/* glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#780000]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#780000]/20 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* TEXT */}
        <div className="border-b border-white/10 pb-6 text-center">
          <p className="text-[11px] sm:text-xs md:text-sm text-white/70 leading-relaxed">

            <span className="block mb-2">
              All Rights Reserved. {new Date().getFullYear()} ©
              <span className="ml-1 inline-block bg-gradient-to-r from-[#ffd7d7] via-[#ff7a7a] to-[#ff7a7a] bg-clip-text text-transparent font-semibold tracking-wide drop-shadow-[0_0_14px_rgba(255,122,122,0.25)]">
                TrueInfoProvider
              </span>
            </span>

            <Link href="/terms" className="text-[#ccc] hover:text-red-400 transition">
             <u> Terms & Conditions</u>
            </Link>
            {' , '}
            <Link href="/privacy" className="text-[#ccc] hover:text-red-400 transition">
             <u> Privacy Policy</u>
            </Link>
            {' , '}
            <Link href="/refund-policy" className="text-[#ccc] hover:text-red-400 transition">
             <u> Refund Policy</u>
            </Link>

            <span className="block mt-2">
              <span className="inline-block bg-gradient-to-r from-[#ffd7d7] via-[#ffb8b8] to-[#ff7a7a] bg-clip-text text-transparent font-medium">
                An approved NMVTIS data provider.
              </span>
            </span>

            {/* <span className="block mt-2 text-white/90">
              SIU OFFICES, 4-6 GREATOREX STREET, LONDON, UNITED KINGDOM E1 5NF
            </span> */}
            <span className="block mt-1 text-white/90">
              Phone: <a href="tel:+447555979712" className="text-[#ccc] hover:text-red-400 transition">+44 7555 979712</a>
              <span className="mx-2">|</span>
              <a href="https://wa.me/447555979712" target="_blank" rel="noreferrer" className="text-[#ccc] hover:text-green-400 transition">
                WhatsApp Chat
              </a>
            </span>
            <span className="block mt-2">
              <span className="text-white/90">Email: Info@trueinfoprovider.com</span>
            </span>
          </p>
        </div>

        {/* PAYMENT */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">

            <img src="/paypal-icon.svg" className="h-6 opacity-80 hover:opacity-100 transition" />
            <img src="/master-card-icon.svg" className="h-6 opacity-80 hover:opacity-100 transition" />
            <img src="/visa-icon.svg" className="h-6 opacity-80 hover:opacity-100 transition" />
            <img src="/norton-extra-text-icon.svg" className="h-6 opacity-80 hover:opacity-100 transition" />

          </div>
        </div>

      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#780000] to-transparent" />
    </footer>
  )
}