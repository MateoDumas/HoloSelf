import React, { useState } from 'react'
import { ModelMetadata } from '@/hooks/useModels'
import Viewer from '@/components/Viewer'
import { X as XIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ModelComparatorProps {
  models: ModelMetadata[]
  onClose: () => void
}

const ModelComparator: React.FC<ModelComparatorProps> = ({ models, onClose }) => {
  const [selectedModels, setSelectedModels] = useState<ModelMetadata[]>(models.slice(0, 2))
  const { t } = useTranslation()

  const addModel = (model: ModelMetadata) => {
    if (selectedModels.length < 2 && !selectedModels.find((m) => m.id === model.id)) {
      setSelectedModels([...selectedModels, model])
    }
  }

  const removeModel = (id: string) => {
    setSelectedModels(selectedModels.filter((m) => m.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t('compare.modal_title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {selectedModels.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('compare.empty_hint')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedModels.map((model) => (
                <div key={model.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {model.title}
                    </h3>
                    <button
                      onClick={() => removeModel(model.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="aspect-square mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <Viewer
                      modelUrl={model.glb_url}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="space-y-2">
                    {model.price && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t('product.price')}:
                        </span>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          ${model.price.toLocaleString()}
                        </span>
                      </div>
                    )}
                    {model.meta?.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t('product.dimensions')}:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {model.meta.dimensions.width} × {model.meta.dimensions.height} × {model.meta.dimensions.depth} cm
                        </span>
                      </div>
                    )}
                    {model.meta?.category && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t('product.category')}:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 capitalize">
                          {model.meta.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedModels.length < 2 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('compare.add_product_title')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {models
                  .filter((m) => !selectedModels.find((sm) => sm.id === m.id))
                  .slice(0, 8)
                  .map((model) => (
                    <button
                      key={model.id}
                      onClick={() => addModel(model)}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-primary-500 dark:hover:border-primary-400 transition-colors text-left"
                    >
                      {model.thumbnail && (
                        <img
                          src={model.thumbnail}
                          alt={model.title}
                          className="w-full h-24 object-cover rounded mb-2"
                        />
                      )}
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                        {model.title}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModelComparator
