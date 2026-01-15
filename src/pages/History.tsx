import React from 'react'
import { Link } from 'react-router-dom'
import { useHistoryStore } from '@/store/useHistoryStore'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'
import { History as HistoryIcon, ArrowRight, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ProductCardSkeleton from '@/components/Catalog/ProductCardSkeleton'

const History: React.FC = () => {
  const { clearHistory, getRecentProducts } = useHistoryStore()
  const { data: allModels, isLoading, error } = useModels(1, 100)

  const recentProductIds = getRecentProducts(20)
  const recentModels =
    allModels?.models.filter((m) => recentProductIds.includes(m.id)) || []

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Historial de Vistas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Cargando tu historial reciente...
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
            Error al cargar tu historial
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">
            Intenta recargar la página o vuelve más tarde.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Volver al catálogo
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
            Historial de Vistas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {recentModels.length} {recentModels.length === 1 ? 'producto' : 'productos'} visitados recientemente
          </p>
        </div>
        {recentModels.length > 0 && (
          <button
            onClick={() => {
              clearHistory()
              toast.success('Historial borrado')
            }}
            className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Borrar historial
          </button>
        )}
      </div>

      {recentModels.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <HistoryIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Historial vacío
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Los productos que visites aparecerán aquí para que puedas encontrarlos fácilmente.
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
          {recentModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </div>
  )
}

export default History
