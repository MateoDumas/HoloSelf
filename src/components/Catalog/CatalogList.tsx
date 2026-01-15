import React, { useState } from 'react'
import { useModels } from '@/hooks/useModels'
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter'
import ModelCard from './ModelCard'
import SearchBar from '@/components/Search/SearchBar'
import FilterPanel from '@/components/Filters/FilterPanel'
import SkeletonLoader from '@/components/UI/SkeletonLoader'

interface CatalogListProps {
  page?: number
  pageSize?: number
}

const CatalogList: React.FC<CatalogListProps> = ({
  page: initialPage = 1,
  pageSize = 20,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const { data, isLoading, error } = useModels(currentPage, pageSize)
  const [showFilters, setShowFilters] = useState(false)

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filteredModels,
    resetFilters,
  } = useSearchAndFilter({
    models: data?.models || [],
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <SkeletonLoader key={i} type="card" />
        ))}
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

  const displayModels = filteredModels

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Catálogo de Productos
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {displayModels.length} {displayModels.length === 1 ? 'modelo' : 'modelos'} disponibles
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
          >
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </button>
        </div>

        <div className="mb-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <label className="text-sm text-gray-600 dark:text-gray-400">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="name">Nombre</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1">
            <FilterPanel
              models={data?.models || []}
              selectedCategory={selectedCategory}
              selectedTags={selectedTags}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onTagToggle={toggleTag}
              onPriceRangeChange={setPriceRange}
              onReset={resetFilters}
            />
          </div>
        )}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
          {displayModels.length === 0 && (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No se encontraron productos
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Paginación accesible */}
      {data.total > pageSize && (
        <nav
          className="mt-8 flex justify-center items-center gap-3"
          aria-label="Paginación del catálogo"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 text-sm">
            Página {currentPage} de {Math.ceil(data.total / pageSize)}
          </span>
          <button
            type="button"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(Math.ceil(data.total / pageSize), prev + 1),
              )
            }
            disabled={currentPage >= Math.ceil(data.total / pageSize)}
            aria-disabled={currentPage >= Math.ceil(data.total / pageSize)}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  )
}

export default CatalogList
