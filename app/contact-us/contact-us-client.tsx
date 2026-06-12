'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/lib/translations'
import { parseJsonSafe } from '@/lib/utils'

// const contactInfo = [
//   {
//     icon: Mail,
//     title: 'Email',
//     details: ['info@TrueInfoProvider.com'],
//     gradient: 'from-[#780000] to-red-900'
//   },
//   {
//     icon: MapPin,
//     title: 'Office',
//     details: ['SIU OFFICES, 4-6 GREATOREX STREET LONDON UNITED KINGDOM E1 5NF'],
//     gradient: 'from-[#780000] to-black'
//   }
// ]

export default function ContactUsClient() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await parseJsonSafe(res)

      if (!res.ok) throw new Error(data.error || 'Failed')

      setSubmitSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#780000]/10 via-white to-[#780000]/5"></div>

      <div className="absolute -top-20 left-10 w-96 h-96 bg-[#780000]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-200/40 rounded-full blur-3xl"></div>

      <div ref={heroRef} className="relative container mx-auto px-3 py-10 sm:px-4 sm:py-14 md:py-16">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#780000]/10 border border-[#780000]/20 rounded-full text-[#780000] font-semibold">
            <MessageCircle size={16} />
            Get in Touch
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mt-5 sm:mt-6 text-gray-900 leading-tight">
            Contact <span className="text-[#780000]">TrueInfoProvider</span>
          </h1>

          <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            We’re here to help you with vehicle history reports & support anytime.
          </p>
        </div>

        {/* CONTACT CARDS */}
        {/* <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white`}>
                <item.icon />
              </div>

              <h3 className="text-xl font-bold mt-4 text-gray-900">{item.title}</h3>

              {item.details.map((d, idx) => (
                <p key={idx} className="text-gray-600 text-sm mt-1">
                  {d}
                </p>
              ))}
            </div>
          ))}
        </div> */}

        {/* FORM */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          <div className="bg-gradient-to-r from-[#780000] to-black text-white p-4 sm:p-6 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Send us a message
            </h2>
            <p className="text-white/80 mt-2 text-xs sm:text-sm">
              We usually respond within 2–4 hours
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-5">

            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="focus:ring-[#780000] text-sm sm:text-base"
              />

              <Input
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-sm sm:text-base"
              />
            </div>

            <Input
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="text-sm sm:text-base"
            />

            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[120px] sm:min-h-[140px] text-sm sm:text-base"
            />

            {submitSuccess && (
              <p className="text-green-600 font-medium">Message sent successfully!</p>
            )}

            {submitError && (
              <p className="text-red-600">{submitError}</p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#780000] hover:bg-black text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transition-all"
            >
              <Send className="mr-2" size={18} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}