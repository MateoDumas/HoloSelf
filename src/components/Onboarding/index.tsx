import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'

interface OnboardingStep {
    title: string
    description: string
    icon: React.ReactNode
}

const steps: OnboardingStep[] = [
    {
        title: '¡Bienvenido a HoloSelf!',
        description: 'Explora nuestro catálogo de productos en 3D y AR',
        icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
        )
    },
    {
        title: 'Vista 3D Interactiva',
        description: 'Rota, acerca y explora cada producto en detalle',
        icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        )
    },
    {
        title: 'Realidad Aumentada',
        description: 'Toca el botón AR para ver productos en tu espacio',
        icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: 'Favoritos y Carrito',
        description: 'Guarda tus productos favoritos y agrégalos al carrito',
        icon: (
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    }
]

const Onboarding: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('holoself-onboarding-seen')
        if (!hasSeenOnboarding) {
            setIsVisible(true)
        }
    }, [])

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleComplete()
        }
    }

    const handleSkip = () => {
        handleComplete()
    }

    const handleComplete = () => {
        localStorage.setItem('holoself-onboarding-seen', 'true')
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={(e) => e.target === e.currentTarget && handleSkip()}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200 dark:border-gray-700"
                    >
                        <button
                            onClick={handleSkip}
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                            aria-label="Cerrar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <div className="text-primary-500 dark:text-primary-400 mb-6 flex justify-center">
                                    {steps[currentStep].icon}
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {steps[currentStep].title}
                                </h2>

                                <p className="text-base text-gray-700 dark:text-gray-300 mb-8">
                                    {steps[currentStep].description}
                                </p>

                                <div className="flex gap-2 justify-center mb-6">
                                    {steps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === currentStep
                                                ? 'w-8 bg-primary-500'
                                                : 'w-2 bg-gray-300 dark:bg-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {currentStep > 0 && (
                                        <button
                                            onClick={() => setCurrentStep(currentStep - 1)}
                                            className="btn-secondary flex-1"
                                        >
                                            Atrás
                                        </button>
                                    )}
                                    <button
                                        onClick={handleNext}
                                        className="btn-primary flex-1"
                                    >
                                        {currentStep === steps.length - 1 ? '¡Comenzar!' : 'Siguiente'}
                                    </button>
                                </div>

                                {currentStep < steps.length - 1 && (
                                    <button
                                        onClick={handleSkip}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4 transition-colors"
                                    >
                                        Saltar tutorial
                                    </button>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Onboarding
