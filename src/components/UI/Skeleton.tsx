import React from 'react'
import { useTranslation } from 'react-i18next'

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular'
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    variant = 'rectangular'
}) => {
    const { t } = useTranslation()
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'

    const variantClasses = {
        text: 'h-4 w-full rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg'
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            aria-label={t('loading')}
        />
    )
}

export default Skeleton
