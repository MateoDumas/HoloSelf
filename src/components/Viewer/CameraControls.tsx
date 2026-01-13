import React from 'react'
import { motion } from 'framer-motion'

interface CameraControlsProps {
    onViewChange?: (view: 'front' | 'back' | 'left' | 'right' | 'top') => void
    className?: string
}

const CameraControls: React.FC<CameraControlsProps> = ({ onViewChange, className = '' }) => {
    const views = [
        { name: 'Frontal', value: 'front' as const, icon: '⬆️' },
        { name: 'Atrás', value: 'back' as const, icon: '⬇️' },
        { name: 'Izquierda', value: 'left' as const, icon: '⬅️' },
        { name: 'Derecha', value: 'right' as const, icon: '➡️' },
        { name: 'Superior', value: 'top' as const, icon: '🔝' },
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
                    title={view.name}
                    aria-label={`Vista ${view.name.toLowerCase()}`}
                >
                    <span className="mr-1">{view.icon}</span>
                    <span className="hidden sm:inline">{view.name}</span>
                </motion.button>
            ))}
        </div>
    )
}

export default CameraControls
