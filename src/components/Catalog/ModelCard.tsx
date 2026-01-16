import React from 'react'
import { Link } from 'react-router-dom'
import { ModelMetadata, fetchModelById } from '@/hooks/useModels'
import ARButton from '@/components/ARButton'
import FavoriteButton from '@/components/Favorites/FavoriteButton'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'react-hot-toast'
import { ShoppingCart, Box } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

interface ModelCardProps {
  model: ModelMetadata
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const { addItem } = useCartStore()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const prefetchModel = () => {
    queryClient.prefetchQuery({
      queryKey: ['model', model.id],
      queryFn: () => fetchModelById(model.id),
      staleTime: 10 * 60 * 1000,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: model.id,
      title: model.title,
      price: model.price,
      glb_url: model.glb_url,
      thumbnail: model.thumbnail,
    })
    toast.success(t('product_card.added_to_cart'))
  }

  return (
    <div className="card group hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900">
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <FavoriteButton productId={model.id} />
        </div>
        
        {model.glb_url && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/60 text-xs font-bold text-gray-900 dark:text-white backdrop-blur-md shadow-sm border border-white/20">
              <Box className="w-3 h-3" />
              AR
            </span>
          </div>
        )}

        <Link
          to={`/product/${model.id}`}
          className="block w-full h-full"
          onMouseEnter={prefetchModel}
          onFocus={prefetchModel}
        >
          {model.thumbnail ? (
            <img
              src={model.thumbnail}
              alt={model.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Box className="w-16 h-16 opacity-20" />
            </div>
          )}
          
          {/* Overlay gradiente para mejorar legibilidad en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link
            to={`/product/${model.id}`}
            className="group/title"
            onMouseEnter={prefetchModel}
            onFocus={prefetchModel}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors">
              {model.title}
            </h3>
          </Link>
          
          {model.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
              {model.description}
            </p>
          )}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            {model.price ? (
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                ${model.price.toLocaleString()}
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-500">
                {t('product_card.contact_price')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {model.price && (
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                {t('product_card.add_to_cart')}
              </button>
            )}
            
            {model.glb_url && (
              <ARButton
                modelUrl={model.glb_url}
                modelTitle={model.title}
                className="btn-secondary !p-2.5 rounded-xl flex-none hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              >
                <Box className="w-5 h-5" />
                <span className="sr-only">{t('product_card.view_ar')}</span>
              </ARButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModelCard)
