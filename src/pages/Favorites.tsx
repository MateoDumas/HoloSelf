import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'
import CompareButton from '@/components/Compare/CompareButton'
import { Heart, ArrowRight } from 'lucide-react'
import ProductCardSkeleton from '@/components/Catalog/ProductCardSkeleton'
import { useTranslation } from 'react-i18next'

const Favorites: React.FC = () => {
  const { favorites } = useFavoritesStore()
  const { data: allModels, isLoading, error } = useModels(1, 100)
  const { t } = useTranslation()

  const favoriteModels =
    allModels?.models.filter((m) => favorites.includes(m.id)) || []

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('favorites_page.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {t('favorites_page.loading')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('favorites_page.error_title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">
            {t('favorites_page.error_desc')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            {t('favorites_page.back_to_catalog')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('favorites_page.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t(
              favoriteModels.length === 1
                ? 'favorites_page.count_one'
                : 'favorites_page.count_other',
              { count: favoriteModels.length },
            )}
          </p>
        </div>
        {favoriteModels.length > 0 && (
          <CompareButton models={allModels?.models || []} />
        )}
      </div>

      {favoriteModels.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('favorites_page.empty_title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            {t('favorites_page.empty_desc')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            {t('favorites_page.explore_catalog')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
