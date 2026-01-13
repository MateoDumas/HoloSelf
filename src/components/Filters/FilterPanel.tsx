import React from 'react'
import { ModelMetadata } from '@/hooks/useModels'

interface FilterPanelProps {
  models: ModelMetadata[]
  selectedCategory: string | null
  selectedTags: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string | null) => void
  onTagToggle: (tag: string) => void
  onPriceRangeChange: (range: [number, number]) => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  models,
  selectedCategory,
  selectedTags,
  priceRange,
  onCategoryChange,
  onTagToggle,
  onPriceRangeChange,
}) => {
  // Obtener categorías únicas
  const categories = Array.from(
    new Set(models.map((m) => m.meta?.category).filter(Boolean))
  ) as string[]

  // Obtener tags únicos
  const allTags = models.flatMap((m) => m.meta?.tags || [])
  const uniqueTags = Array.from(new Set(allTags))

  // Obtener rango de precios
  const prices = models.map((m) => m.price || 0).filter((p) => p > 0)
  const minPrice = Math.min(...prices, 0)
  const maxPrice = Math.max(...prices, 1000)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-primary-600 dark:text-primary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filtros
      </h3>

      {/* Categorías */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Categoría
        </h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === null}
              onChange={() => onCategoryChange(null)}
              className="mr-2"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Todas</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tags
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uniqueTags.map((tag) => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => onTagToggle(tag)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Rango de Precio */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Precio
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
