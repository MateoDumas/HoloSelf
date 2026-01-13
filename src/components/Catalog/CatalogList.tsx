import React, { useState } from 'react'
import { useModels } from '@/hooks/useModels'
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter'
import ModelCard from './ModelCard'
import SearchBar from '@/components/Search/SearchBar'
import FilterPanel from '@/components/Filters/FilterPanel'
import ProductCardSkeleton from './ProductCardSkeleton'
import CategoryPills from './CategoryPills'

interface CatalogListProps {
  page?: number
  pageSize?: number
}

const CatalogList: React.FC<CatalogListProps> = ({
  page = 1,
  pageSize = 20,
}) => {
  const { data, isLoading, error } = useModels(page, pageSize)
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
  } = useSearchAndFilter({
    models: data?.models || [],
  })

  // Calcular categorías disponibles
  const categories = React.useMemo(() => {
    if (!data?.models) return []
    const cats = new Set(data.models.map((m) => m.meta?.category).filter(Boolean))
    return Array.from(cats) as string[]
  }, [data?.models])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
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

  const displayModels = searchQuery || selectedCategory || selectedTags.length > 0
    ? filteredModels
    : data?.models || []

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
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
            className="btn-secondary w-full sm:w-auto"
          >
            {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </button>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Category Pills */}
        <div className="mb-6">
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <div className="mb-4 flex gap-2 items-center">
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
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No se encontraron productos con los filtros seleccionados
              </p>
            </div>
          )}
        </div>
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
