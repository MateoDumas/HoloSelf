import React from 'react'
import { ModelMetadata } from '@/hooks/useModels'
import { useTranslation } from 'react-i18next'

interface FilterPanelProps {
  models: ModelMetadata[]
  selectedCategory: string | null
  selectedTags: string[]
  priceRange: [number, number]
  onCategoryChange: (category: string | null) => void
  onTagToggle: (tag: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onReset: () => void
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  models,
  selectedCategory,
  selectedTags,
  priceRange,
  onCategoryChange,
  onTagToggle,
  onPriceRangeChange,
  onReset,
}) => {
  const { t } = useTranslation()

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-8 border border-gray-200 dark:border-gray-700 sticky top-24 transition-all">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-400"
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
          {t('filters.title')}
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
        >
          {t('filters.clear_all')}
        </button>
      </div>

      {/* Categorías */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          {t('filters.category')}
          <span className="text-xs font-normal text-gray-500">({categories.length + 1})</span>
        </h4>
        <div className="space-y-2">
          <label className="flex items-center group cursor-pointer">
            <div className="relative flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === null}
                onChange={() => onCategoryChange(null)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:border-blue-600 peer-checked:border-[6px] transition-all bg-white dark:bg-gray-800 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-gray-800"></div>
            </div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
              {t('filters.all')}
            </span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full peer-checked:border-blue-600 peer-checked:border-[6px] transition-all bg-white dark:bg-gray-800 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-gray-800"></div>
              </div>
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 capitalize group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                {t(`categories.${category.toLowerCase()}`, category)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            {t('filters.tags')}
            <span className="text-xs font-normal text-gray-500">({uniqueTags.length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {uniqueTags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <label
                  key={tag}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800
                    ${isSelected 
                      ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onTagToggle(tag)}
                    className="sr-only"
                  />
                  {tag}
                </label>
              )
            })}
          </div>
        </div>
      )}

      {uniqueTags.length > 0 && <div className="h-px bg-gray-200 dark:bg-gray-700"></div>}

      {/* Rango de Precio */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {t('filters.max_price')}
          </h4>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <div className="space-y-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
