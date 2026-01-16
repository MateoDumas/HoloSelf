import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useModel } from '@/hooks/useModels'
import Viewer from '@/components/Viewer'
import ARButton from '@/components/ARButton'
import FavoriteButton from '@/components/Favorites/FavoriteButton'
import SimilarProducts from '@/components/Recommendations/SimilarProducts'
import { useHistoryStore } from '@/store/useHistoryStore'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import SkeletonLoader from '@/components/UI/SkeletonLoader'
import { useTranslation } from 'react-i18next'

const ProductPage: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { data: model, isLoading, error } = useModel(id || '')
  const [autoRotate, setAutoRotate] = useState(false)
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

  const handleAddToCart = () => {
    if (model) {
      addItem({
        id: model.id,
        title: model.title,
        price: model.price || 0,
        glb_url: model.glb_url,
        thumbnail: model.thumbnail,
      })
      toast.success(t('cart.add_success'), {
        icon: '🛍️',
        duration: 3000,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link Skeleton */}
        <div className="mb-6 w-32">
          <SkeletonLoader type="text" className="h-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Viewer Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden aspect-square">
            <SkeletonLoader type="image" className="w-full h-full" />
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <SkeletonLoader type="text" className="w-20 h-5" /> {/* Category */}
              <SkeletonLoader type="text" className="w-3/4 h-10" /> {/* Title */}
              <div className="flex gap-4">
                <SkeletonLoader type="text" className="w-24 h-6" /> {/* Rating */}
              </div>
            </div>

            <SkeletonLoader type="text" className="w-32 h-10" /> {/* Price */}

            <div className="space-y-2">
              <SkeletonLoader type="text" className="w-full" />
              <SkeletonLoader type="text" className="w-full" />
              <SkeletonLoader type="text" className="w-2/3" />
            </div>

            <div className="flex gap-4 pt-6">
              <SkeletonLoader type="button" className="flex-1 h-12" />
              <SkeletonLoader type="button" className="flex-1 h-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('product.error_loading')}</p>
          <Link to="/" className="text-blue-600 hover:underline">
            {t('product.back_to_catalog')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
        {t('product.back_to_catalog')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Viewer 3D */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton productId={model.id} />
          </div>
          <div className="aspect-square relative bg-gray-50 dark:bg-gray-900/50">
            <Viewer
              modelUrl={currentModelUrl || model.glb_url}
              autoRotate={autoRotate}
              enableAR={true}
              className="w-full h-full"
            />
          </div>
          
          {/* Viewer Controls */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                  autoRotate 
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {autoRotate ? t('product.stop_rotation') : t('product.auto_rotate')}
              </button>
              <ARButton
                modelUrl={currentModelUrl || model.glb_url}
                modelTitle={model.title}
                className="flex-1 py-2 px-4 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
            <div className="space-y-6 sm:space-y-8">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {model.title}
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  ${(model.price || 0).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                {model.meta?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {model.description}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t('product.add_to_cart')}
          </button>

          {/* Dimensions */}
          {model.meta?.dimensions && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('product.dimensions')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="block text-xs text-gray-500 uppercase tracking-wide">{t('product.height')}</span>
                  <span className="block text-lg font-medium text-gray-900 dark:text-white">{model.meta.dimensions.height} cm</span>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="block text-xs text-gray-500 uppercase tracking-wide">{t('product.width')}</span>
                  <span className="block text-lg font-medium text-gray-900 dark:text-white">{model.meta.dimensions.width} cm</span>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <span className="block text-xs text-gray-500 uppercase tracking-wide">{t('product.depth')}</span>
                  <span className="block text-lg font-medium text-gray-900 dark:text-white">{model.meta.dimensions.depth} cm</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <SimilarProducts currentModel={model} />
      </div>
    </div>
  )
}

export default ProductPage
