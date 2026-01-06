import React from 'react'
import { useModels } from '@/hooks/useModels'
import ModelCard from './ModelCard'

interface CatalogListProps {
  page?: number
  pageSize?: number
}

const CatalogList: React.FC<CatalogListProps> = ({
  page = 1,
  pageSize = 20,
}) => {
  const { data, isLoading, error } = useModels(page, pageSize)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600">Cargando catálogo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar el catálogo</p>
          <p className="text-sm text-gray-600">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      </div>
    )
  }

  if (!data || data.models.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600">No hay modelos disponibles</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Catálogo de Productos
        </h2>
        <p className="text-gray-600 mt-1">
          {data.total} {data.total === 1 ? 'modelo' : 'modelos'} disponibles
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      
      {/* Paginación básica - puedes mejorarla después */}
      {data.total > pageSize && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            disabled={page === 1}
            className="btn-secondary disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-4 py-2 text-gray-700">
            Página {page} de {Math.ceil(data.total / pageSize)}
          </span>
          <button
            disabled={page >= Math.ceil(data.total / pageSize)}
            className="btn-secondary disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default CatalogList
