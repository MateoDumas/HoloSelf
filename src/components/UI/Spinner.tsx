import React from 'react'

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 dark:border-t-primary-500 rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
