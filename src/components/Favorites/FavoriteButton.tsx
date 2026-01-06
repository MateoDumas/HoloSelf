import React from 'react'
import { useFavoritesStore } from '@/store/useFavoritesStore'

interface FavoriteButtonProps {
  productId: string
  className?: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  productId,
  className = '',
}) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  const favorite = isFavorite(productId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(productId)
      }}
      className={`p-2 rounded-full transition-colors ${
        favorite
          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
      } ${className}`}
      aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg
        className="w-5 h-5"
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}

export default FavoriteButton
