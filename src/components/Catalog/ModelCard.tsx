import React from 'react'
import { Link } from 'react-router-dom'
import { ModelMetadata } from '@/hooks/useModels'
import ARButton from '@/components/ARButton'
import FavoriteButton from '@/components/Favorites/FavoriteButton'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'react-hot-toast'

interface ModelCardProps {
  model: ModelMetadata
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const { addItem } = useCartStore()

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
    toast.success('Añadido al carrito')
  }

  return (
    <div className="card relative group hover:scale-105 transition-transform duration-300">
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <FavoriteButton productId={model.id} />
      </div>
      <Link to={`/product/${model.id}`}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
          {model.glb_url && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
                AR
              </span>
            </div>
          )}
          {model.thumbnail ? (
            <img
              src={model.thumbnail}
              alt={model.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${model.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary-600 transition-colors">
            {model.title}
          </h3>
        </Link>
        
        {model.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {model.description}
          </p>
        )}
        
        {model.price && (
          <p className="text-xl font-bold text-primary-600 mb-3">
            ${model.price.toLocaleString()}
          </p>
        )}
        
        <div className="flex gap-2">
          <Link
            to={`/product/${model.id}`}
            className="btn-secondary flex-1 text-center"
          >
            Ver detalles
          </Link>
          {model.price && (
            <button
              onClick={handleAddToCart}
              className="btn-primary flex-1"
            >
              Agregar
            </button>
          )}
          <ARButton
            modelUrl={model.glb_url}
            modelTitle={model.title}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  )
}

export default ModelCard
