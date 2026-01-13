import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'

interface CartDropdownProps {
  onClose: () => void
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4">
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Tu carrito está vacío
        </p>
      </div>
    )
  }

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Carrito ({items.length})
        </h3>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Vaciar
        </button>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
          >
            {item.thumbnail && (
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {item.title}
              </h4>
              {item.price && (
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  ${item.price.toLocaleString()}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                >
                  -
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-auto text-red-600 dark:text-red-400 text-sm hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Total:
          </span>
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ${getTotal().toLocaleString()}
          </span>
        </div>
        <Link
          to="/cart"
          onClick={onClose}
          className="block w-full btn-primary text-center"
        >
          Ver Carrito
        </Link>
      </div>
    </div>
  )
}

export default CartDropdown
