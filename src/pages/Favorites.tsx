import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'
import CompareButton from '@/components/Compare/CompareButton'
import { Heart, ArrowRight } from 'lucide-react'

const Favorites: React.FC = () => {
  const { favorites } = useFavoritesStore()
  const { data: allModels } = useModels(1, 100)

  const favoriteModels = allModels?.models.filter((m) =>
    favorites.includes(m.id)
  ) || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mis Favoritos
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {favoriteModels.length} {favoriteModels.length === 1 ? 'producto' : 'productos'} guardados
          </p>
        </div>
        {favoriteModels.length > 0 && <CompareButton />}
      </div>

      {favoriteModels.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No tienes favoritos
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Guarda los productos que más te gusten para verlos más tarde.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Explorar catálogo
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
