import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useModel } from '@/hooks/useModels'
import Viewer from '@/components/Viewer'
import ARButton from '@/components/ARButton'
import FavoriteButton from '@/components/Favorites/FavoriteButton'
import VariantSelector from '@/components/Viewer/VariantSelector'
import SimilarProducts from '@/components/Recommendations/SimilarProducts'
import { useHistoryStore } from '@/store/useHistoryStore'
import { useCartStore } from '@/store/useCartStore'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: model, isLoading, error } = useModel(id || '')
  const [autoRotate, setAutoRotate] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>()
  const [currentModelUrl, setCurrentModelUrl] = useState<string>('')
  const { addViewedProduct } = useHistoryStore()
  const { addItem } = useCartStore()

  useEffect(() => {
    if (id) {
      addViewedProduct(id)
    }
  }, [id, addViewedProduct])

  useEffect(() => {
    if (model) {
      setCurrentModelUrl(model.glb_url)
    }
  }, [model])

  const handleVariantChange = (variantId: string, glbUrl: string) => {
    setSelectedVariant(variantId)
    setCurrentModelUrl(glbUrl)
  }

  const handleAddToCart = () => {
    if (model) {
      addItem({
        id: model.id,
        title: model.title,
        price: model.price,
        glb_url: model.glb_url,
        thumbnail: model.thumbnail,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error al cargar el producto</p>
          <Link to="/" className="btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-2"
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Viewer 3D */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton productId={model.id} />
            </div>
            <div className="aspect-square relative">
              <Viewer
                modelUrl={currentModelUrl || model.glb_url}
                autoRotate={autoRotate}
                enableAR={true}
                className="w-full h-full"
              />
            </div>
            
            {/* Controles del viewer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex gap-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`btn-secondary flex-1 ${
                    autoRotate ? 'bg-primary-100 text-primary-700' : ''
                  }`}
                >
                  {autoRotate ? '⏸ Detener rotación' : '▶ Rotar automático'}
                </button>
                <ARButton
                  modelUrl={model.glb_url}
                  modelTitle={model.title}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {model.title}
            </h1>

            {model.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Descripción
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{model.description}</p>
              </div>
            )}

            {model.price && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Precio
                </h2>
                <p className="text-3xl font-bold text-primary-600">
                  ${model.price.toLocaleString()}
                </p>
              </div>
            )}

            {model.meta?.dimensions && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Dimensiones
                </h2>
                <p className="text-gray-600">
                  {model.meta.dimensions.width} × {model.meta.dimensions.height} ×{' '}
                  {model.meta.dimensions.depth} cm
                </p>
              </div>
            )}

            <VariantSelector
              model={model}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {model.price && (
                <button
                  onClick={handleAddToCart}
                  className="btn-primary w-full"
                >
                  Agregar al Carrito - ${model.price.toLocaleString()}
                </button>
              )}
              <ARButton
                modelUrl={currentModelUrl || model.glb_url}
                modelTitle={model.title}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Productos similares */}
        <SimilarProducts currentModel={model} />
      </main>
    </div>
  )
}

export default ProductPage
