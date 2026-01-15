import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

interface CartDropdownProps {
  onClose: () => void
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="absolute right-2 left-2 sm:left-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 p-4">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Tu carrito está vacío
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Añade productos desde el catálogo para verlos aquí.
            </p>
          </div>
          <Link
            to="/"
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-500/30"
          >
            Ir al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      id="cart-dropdown"
      role="menu"
      aria-label="Carrito"
      className="absolute right-2 left-2 sm:left-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
    >
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
