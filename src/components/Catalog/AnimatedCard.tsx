import { motion } from 'framer-motion'
import React from 'react'
import { ModelMetadata } from '@/hooks/useModels'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '@/store/useFavoritesStore'

interface AnimatedCardProps {
    model: ModelMetadata
    index?: number
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ model, index = 0 }) => {
    const { favorites, toggleFavorite } = useFavoritesStore()
    const isFavorite = favorites.some(fav => fav.id === model.id)

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: index * 0.05,
                duration: 0.4,
                ease: 'easeOut'
            }
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="card group relative"
        >
            <Link to={`/product/${model.id}`} className="block">
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                    <img
                        src={model.image || '/placeholder.png'}
                        alt={model.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 flex-1">
                        {model.title}
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(model)
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <svg
                            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'
                                }`}
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
                    </motion.button>
                </div>

                {model.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {model.description}
                    </p>
                )}

                <div className="flex justify-between items-center">
                    {model.price && (
                        <span className="text-xl font-bold gradient-text">
                            ${model.price.toFixed(2)}
                        </span>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-sm px-4 py-2"
                    >
                        Ver 3D/AR
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}

export default AnimatedCard
