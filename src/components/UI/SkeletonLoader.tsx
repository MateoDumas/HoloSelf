import React from 'react'

interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'image' | 'button'
  className?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'card', className = '' }) => {
  if (type === 'card') {
    return (
      <div className={`card animate-pulse ${className}`}>
        <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          <div className="flex gap-2">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1" />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className={`animate-pulse space-y-2 ${className}`}>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      </div>
    )
  }

  if (type === 'image') {
    return (
      <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} />
    )
  }

  if (type === 'button') {
    return (
      <div className={`animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
    )
  }

  return null
}

export default SkeletonLoader
