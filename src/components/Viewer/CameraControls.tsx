import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface CameraControlsProps {
    onViewChange?: (view: 'front' | 'back' | 'left' | 'right' | 'top') => void
    className?: string
}

const CameraControls: React.FC<CameraControlsProps> = ({ onViewChange, className = '' }) => {
    const { t } = useTranslation()

    const views = [
        { key: 'front', value: 'front' as const, icon: '⬆️' },
        { key: 'back', value: 'back' as const, icon: '⬇️' },
        { key: 'left', value: 'left' as const, icon: '⬅️' },
        { key: 'right', value: 'right' as const, icon: '➡️' },
        { key: 'top', value: 'top' as const, icon: '🔝' },
    ]

    return (
        <div className={`flex gap-2 flex-wrap ${className}`}>
            {views.map((view) => (
                <motion.button
                    key={view.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onViewChange?.(view.value)}
                    className="px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                    title={t('camera_controls.view_label', {
                        direction: t(`camera_controls.${view.key}`).toLowerCase(),
                    })}
                    aria-label={t('camera_controls.view_label', {
                        direction: t(`camera_controls.${view.key}`).toLowerCase(),
                    })}
                >
                    <span className="mr-1">{view.icon}</span>
                    <span className="hidden sm:inline">
                        {t(`camera_controls.${view.key}`)}
                    </span>
                </motion.button>
            ))}
        </div>
    )
}

export default CameraControls
