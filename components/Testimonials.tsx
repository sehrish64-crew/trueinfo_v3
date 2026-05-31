"use client"

import { useState, useEffect, useRef } from 'react'
import { Quote, CheckCircle, User, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ReviewForm from './ReviewForm'
import { Review } from '@/lib/database'
import { useTranslations } from '@/lib/translations'

export default function Testimonials() {
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        if (response.ok) {
          const data = await response.json()
          setReviews(data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3))
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3))
  }

  const renderStars = (rating: number) => (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'fill-[#780000] text-[#780000]' : 'text-gray-300'
            }`}
        />
      ))}
    </div>
  )

  const visibleReviews = reviews.slice(currentIndex * 3, currentIndex * 3 + 3)

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#780000]/10 via-white to-[#780000]/20 overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#780000] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#780000] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-[#780000] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('testimonials_title')}
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            {t('testimonials_subtitle')}
          </p>

          <Button 
            onClick={() => setIsReviewFormOpen(true)}
            className="bg-[#780000] hover:bg-red-900 text-white px-8 py-6 text-lg"
          >
            {t('testimonials_add_review')}
          </Button>
        </div>

        {/* VIDEO SECTION */}
        <div className={`relative h-80 rounded-3xl overflow-hidden mb-16 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>

          <video
            src="/accidental.mp4"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />

          {/* LIGHTER GRADIENT (FIXED) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#780000]/60 via-[#780000]/30 to-transparent flex items-center">

            <div className="max-w-xl px-12">

              <h3 className="text-3xl font-bold text-white mb-4">
                {t('testimonials_trusted_title')}
              </h3>

              <p className="text-white/90 mb-6">
                {t('testimonials_trusted_subtitle')}
              </p>

              <div className="flex items-center gap-6">

                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full bg-[#780000] border-4 border-white flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  ))}
                </div>

                <div className="text-white">
                  <p className="text-2xl font-bold">5M+</p>
                  <p className="text-sm opacity-80">
                    {t('testimonials_reports_generated')}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* REVIEWS */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#780000] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {visibleReviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition">

                <Quote className="w-10 h-10 text-[#780000]" />

                {renderStars(review.rating)}

                <p className="text-gray-700 mb-6">{review.comment}</p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#780000] flex items-center justify-center">
                    <User className="text-white w-6 h-6" />
                  </div>

                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-green-600 text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
      />

    </section>
  )
}