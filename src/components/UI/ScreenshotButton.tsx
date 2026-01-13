import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScreenshotButtonProps {
    canvasRef?: React.RefObject<HTMLCanvasElement>
    modelName?: string
}

const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({ canvasRef, modelName = 'model' }) => {
    const [showNotification, setShowNotification] = useState(false)

    const handleScreenshot = () => {
        if (canvasRef?.current) {
            try {
                const canvas = canvasRef.current
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = url
                        link.download = `${modelName}-screenshot-${Date.now()}.png`
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        URL.revokeObjectURL(url)

                        setShowNotification(true)
                        setTimeout(() => setShowNotification(false), 3000)
                    }
                })
            } catch (error) {
                console.error('Failed to take screenshot:', error)
            }
        }
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScreenshot}
                className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-md"
                title="Tomar captura"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">¡Captura guardada!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ScreenshotButton
