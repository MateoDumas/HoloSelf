import React from 'react'
import { ModelMetadata } from '@/hooks/useModels'
import { useModels } from '@/hooks/useModels'
import ModelCard from '@/components/Catalog/ModelCard'

interface SimilarProductsProps {
  currentModel: ModelMetadata
  limit?: number
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentModel,
  limit = 4,
}) => {
  const { data: allModels } = useModels(1, 100)

  if (!allModels) return null

  // Encontrar productos similares por categoría o tags
  const similarProducts = allModels.models
    .filter((model) => {
      if (model.id === currentModel.id) return false
      
      // Misma categoría
      if (
        model.meta?.category &&
        currentModel.meta?.category &&
        model.meta.category === currentModel.meta.category
      ) {
        return true
      }

      // Tags compartidos
      const currentTags = currentModel.meta?.tags || []
      const modelTags = model.meta?.tags || []
      const sharedTags = currentTags.filter((tag) => modelTags.includes(tag))
      
      return sharedTags.length > 0
    })
    .slice(0, limit)

  if (similarProducts.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Productos Similares
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}

export default SimilarProducts
