import React from 'react'
import { ModelMetadata } from '@/hooks/useModels'

interface VariantSelectorProps {
  model: ModelMetadata
  selectedVariant?: string
  onVariantChange: (variantId: string, glbUrl: string) => void
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  model,
  selectedVariant,
  onVariantChange,
}) => {
  if (!model.meta?.variants || model.meta.variants.length === 0) {
    return null
  }

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Variantes
      </h3>
      <div className="flex flex-wrap gap-2">
        {model.meta.variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantChange(variant.id, variant.glb_url)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedVariant === variant.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-400 dark:hover:border-primary-500'
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default VariantSelector
