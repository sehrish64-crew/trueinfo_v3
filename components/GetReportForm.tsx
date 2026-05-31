'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, HelpCircle, Key, Hash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCountry } from '@/contexts/CountryContext'
import countriesList from '@/lib/countries'
import { Input as TextInput } from '@/components/ui/input'
import { useTranslations } from '@/lib/translations'
import { parseJsonSafe } from '@/lib/utils'
import { getPrice, formatCurrency } from '@/lib/prices'

interface GetReportFormProps {
  isOpen: boolean
  onClose: () => void
  preselectedPackage?: string
  prefilledIdentType?: 'vin' | 'plate'
  prefilledIdentValue?: string
}

const vehicleTypes = ['Car', 'Motorcycle', 'Truck', 'Boat', 'ATV', 'RVS', 'Caravan', 'Motorhome', 'Campervan']
const packages = [
  { id: 'basic', name: 'Basic Report' },
  { id: 'standard', name: 'Standard Report' },
  { id: 'premium', name: 'Premium Report' },
]

export default function GetReportForm({ isOpen, onClose, preselectedPackage, prefilledIdentType, prefilledIdentValue }: GetReportFormProps) {
  const { selectedCountry, setSelectedCountry } = useCountry()

  // Add dropdown styling
  useEffect(() => {
    if (!isOpen) return
    
    const style = document.createElement('style')
    style.textContent = `
      [role="option"]:hover {
        background-color: #780000 !important;
        color: white !important;
      }
      [role="option"][data-state="checked"] {
        background-color: #780000 !important;
        color: white !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style)
    }
  }, [isOpen])

  const [vehicleIdType, setVehicleIdType] = useState<'vin' | 'plate'>('vin')
  const [vehicleType, setVehicleType] = useState('')
  const [vinNumber, setVinNumber] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage || '')
  const [selectedCountryCode, setSelectedCountryCode] = useState(selectedCountry?.code || 'US')
  const [countryFilter, setCountryFilter] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    setError('')
    if (!vehicleType) return setError('Select vehicle type'), false
    if (vehicleIdType === 'vin' && !vinNumber) return setError('Enter VIN'), false
    if (vehicleIdType === 'plate' && !plateNumber) return setError('Enter plate number'), false
    if (!customerEmail) return setError('Enter email'), false
    if (!selectedPackage) return setError('Select a package'), false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      // Prepare form data
      const formData = {
        packageId: selectedPackage,
        currency: selectedCountry.currency,
        customerEmail,
        vehicleIdentifier: vehicleIdType === 'vin' ? vinNumber : plateNumber,
        vehicleType,
        amount: getPrice(selectedPackage as any, selectedCountry.currency),
      }
      
      // Send form submission to admin email
      console.log('📧 Sending form submission to admin...')
      const submissionResponse = await fetch('/api/report-form-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!submissionResponse.ok) {
        console.warn('⚠️ Form submission email failed:', submissionResponse.status)
        // Continue even if email fails
      } else {
        console.log('✅ Form submission email sent successfully')
      }

      // Store payment form data in sessionStorage for use on payment page
      sessionStorage.setItem('paymentFormData', JSON.stringify(formData))
      
      // Redirect to payment page
      window.location.href = '/checkout'
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to process payment. Please try again.'
      setError(errorMessage)
      console.error('❌ Error in handleSubmit:', errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[9999] rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-[#780000]/20 flex flex-col">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#780000] via-[#a52a2a] to-[#780000] border-b border-[#780000]/30 px-8 py-6 flex items-center justify-between flex-shrink-0 relative z-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get Vehicle Report
            </h2>
            <p className="text-xs text-white/80 mt-1">Quick and easy vehicle information</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-white/20 rounded-xl transition-colors duration-200"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6 text-white hover:text-white/80 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Search Type Selection */}
            <div className="bg-gradient-to-br from-[#780000]/5 to-[#a52a2a]/5 p-4 rounded-xl border border-[#780000]/30">
              <Label className="block text-sm font-semibold text-foreground mb-3">
                Search By
              </Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setVehicleIdType('vin')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    vehicleIdType === 'vin'
                      ? 'bg-gradient-to-r from-[#780000] to-[#5c0000] text-white shadow-lg shadow-[#780000]/40 scale-105'
                      : 'bg-white border-2 border-[#780000]/30 text-foreground hover:border-[#780000]/60 hover:bg-[#780000]/5'
                  }`}
                >
                  <Key className="w-5 h-5" />
                  <span>By VIN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVehicleIdType('plate')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    vehicleIdType === 'plate'
                      ? 'bg-gradient-to-r from-[#780000] to-[#5c0000] text-white shadow-lg shadow-[#780000]/40 scale-105'
                      : 'bg-white border-2 border-[#780000]/30 text-foreground hover:border-[#780000]/60 hover:bg-[#780000]/5'
                  }`}
                >
                  <Hash className="w-5 h-5" />
                  <span>By Plate</span>
                </button>
              </div>
            </div>

            {/* VIN or Plate Input */}
            {vehicleIdType === 'vin' ? (
              <div className="space-y-2">
                <Label htmlFor="vin" className="block text-sm font-semibold text-foreground">
                  VIN Number
                </Label>
                <div className="relative">
                  <Input
                    id="vin"
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    placeholder="Enter VIN number"
                    required
                    className="h-12 pr-10 border-2 border-[#780000]/30 focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/20 bg-white transition-colors"
                    maxLength={17}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#780000] transition-colors"
                    title="VIN (Vehicle Identification Number) is a unique 17-character code"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your 17-character Vehicle Identification Number
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="plate" className="block text-sm font-semibold text-foreground">
                  License Plate Number
                </Label>
                <Input
                  id="plate"
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="Enter Plate Number"
                  required
                  className="h-12 border-2 border-[#780000]/30 focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/20 bg-white transition-colors"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your vehicle&apos;s license plate number
                </p>
              </div>
            )}

            {/* Vehicle Type */}
            <div className="space-y-2">
              <Label htmlFor="vehicleType" className="block text-sm font-semibold text-foreground">
                Vehicle Type
              </Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger className="h-12 border-2 border-[#780000]/30 focus:border-[#780000] bg-white">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent className="z-[10000]">
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="h-12 border-2 border-[#780000]/30 focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/20 bg-white transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                We'll send the report to this email address
              </p>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label className="block text-sm font-semibold text-foreground">Country</Label>
              <Select
                value={selectedCountryCode}
                onValueChange={(v) => {
                  setSelectedCountryCode(v)
                  const found = countriesList.find((c) => c.code === v)
                  if (found) setSelectedCountry(found)
                }}
              >
                <SelectTrigger className="h-12 border-2 border-[#780000]/30 focus:border-[#780000] bg-white">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="z-[10000] max-h-60 overflow-auto">
                  <div className="p-2">
                    <TextInput
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      placeholder="Search countries"
                      className="mb-2 h-9"
                    />
                  </div>
                  {countriesList
                    .filter(
                      (c) =>
                        c.name.toLowerCase().includes(countryFilter.toLowerCase()) ||
                        c.code.toLowerCase().includes(countryFilter.toLowerCase())
                    )
                    .map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Package Selection */}
            <div className="space-y-3">
              <Label className="block text-sm font-semibold text-foreground">
                Select Your Package
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center group ${
                      selectedPackage === pkg.id
                        ? 'bg-gradient-to-br from-[#780000]/15 to-[#a52a2a]/10 border-[#780000] shadow-lg shadow-[#780000]/20'
                        : 'bg-white border-[#780000]/30 hover:border-[#780000]/60 hover:bg-[#780000]/5 hover:shadow-md'
                    }`}
                  >
                    <div className="font-bold text-sm text-foreground group-hover:text-[#780000] transition-colors">
                      {pkg.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 font-semibold">
                      {formatCurrency(
                        getPrice(pkg.id as any, selectedCountry.currency),
                        selectedCountry.currency
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl animate-in fade-in">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#780000]/20">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 rounded-lg font-semibold border-2 border-[#780000]/30 text-foreground hover:bg-[#780000]/5 hover:border-[#780000]/60"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 rounded-lg font-semibold bg-gradient-to-r from-[#780000] to-[#5c0000] hover:from-[#5c0000] hover:to-[#480000] text-white shadow-lg shadow-[#780000]/40 disabled:opacity-60 transition-all"
                disabled={isSubmitting || !selectedPackage}
              >
                {isSubmitting
                  ? 'Processing...'
                  : `Continue to Payment - ${
                      selectedPackage
                        ? formatCurrency(
                            getPrice(selectedPackage as any, selectedCountry.currency),
                            selectedCountry.currency
                          )
                        : '$0'
                    }`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}