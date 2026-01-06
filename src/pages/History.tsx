import React from 'react'
import { Link } from 'react-router-dom'
import { useHistoryStore } from '@/store/useHistoryStore'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'
import ThemeToggle from '@/components/ThemeToggle'
import CartButton from '@/components/Cart/CartButton'

const History: React.FC = () => {
  const { viewedProducts, clearHistory, getRecentProducts } = useHistoryStore()
  const { data: allModels } = useModels(1, 100)

  const recentProductIds = getRecentProducts(20)
  const recentModels = allModels?.models.filter((m) =>
    recentProductIds.includes(m.id)
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
                Historial de Vistas
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {recentModels.length} {recentModels.length === 1 ? 'producto' : 'productos'} visitados
              </p>
            </div>
            <div className="flex items-center gap-4">
              {viewedProducts.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Limpiar historial
                </button>
              )}
              <CartButton />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {recentModels.length === 0 ? (
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No has visitado ningún producto aún
            </p>
            <Link to="/" className="btn-primary inline-block">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default History
