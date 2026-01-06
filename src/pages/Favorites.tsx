import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'
import ThemeToggle from '@/components/ThemeToggle'
import CartButton from '@/components/Cart/CartButton'

const Favorites: React.FC = () => {
  const { favorites } = useFavoritesStore()
  const { data: allModels } = useModels(1, 100)

  const favoriteModels = allModels?.models.filter((m) =>
    favorites.includes(m.id)
  ) || []

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link
                to="/"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-2 mb-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Volver al catálogo
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Mis Favoritos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {favoriteModels.length} {favoriteModels.length === 1 ? 'producto' : 'productos'} guardados
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CartButton />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteModels.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-4"
              fill="none"
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
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No tienes productos favoritos aún
            </p>
            <Link to="/" className="btn-primary inline-block">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Favorites
