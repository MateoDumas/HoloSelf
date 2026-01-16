import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Onboarding: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      // Small delay to not overwhelm the user immediately
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true)
      setStep(0)
    }
    window.addEventListener('triggerOnboarding', handleTrigger)
    return () => window.removeEventListener('triggerOnboarding', handleTrigger)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenOnboarding', 'true')
  }

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleClose()
    }
  }

  const steps = [
    {
      title: t('onboarding.welcome_title'),
      description: t('onboarding.welcome_desc'),
      image: '👋'
    },
    {
      title: t('onboarding.ar_title'),
      description: t('onboarding.ar_desc'),
      image: '📱'
    },
    {
      title: t('onboarding.cart_title'),
      description: t('onboarding.cart_desc'),
      image: '🛒'
    }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 pt-10 sm:pt-12 text-center">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{steps[step].image}</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {steps[step].title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  {steps[step].description}
                </p>
              </motion.div>

              <div className="flex items-center justify-between mt-6 sm:mt-8">
                <div className="flex gap-2">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === step
                          ? 'bg-blue-600'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
                >
                  {step === steps.length - 1 ? (
                    <>
                      {t('onboarding.finish')} <Check className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      {t('onboarding.next')} <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Onboarding
