import React from 'react'

interface ProgressBarProps {
    progress: number // 0-100
    className?: string
    showLabel?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    className = '',
    showLabel = true
}) => {
    const clampedProgress = Math.min(100, Math.max(0, progress))

    return (
        <div className={`w-full ${className}`}>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                    className="bg-primary-600 dark:bg-primary-500 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${clampedProgress}%` }}
                    role="progressbar"
                    aria-valuenow={clampedProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                />
            </div>
            {showLabel && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                    {Math.round(clampedProgress)}%
                </p>
            )}
        </div>
    )
}

export default ProgressBar
