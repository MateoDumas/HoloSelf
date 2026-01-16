import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface CartDropdownProps {
  onClose: () => void
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="absolute right-2 left-2 sm:left-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 p-4"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {t('cart.empty_title')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('cart.empty_desc')}
            </p>
          </div>
          <Link
            to="/"
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-md shadow-blue-500/30"
          >
            {t('cart.go_to_catalog')}
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      id="cart-dropdown"
      role="menu"
      aria-label={t('accessibility.cart')}
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="absolute right-2 left-2 sm:left-auto sm:right-0 mt-2 w-auto sm:w-80 max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {t('cart.title')} ({items.length})
        </h3>
        <button
          type="button"
          onClick={() => {
            clearCart()
            toast.success(t('cart.cleared'))
          }}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          {t('cart.clear')}
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
                loading="lazy"
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
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  aria-label={t('cart.decrease_quantity')}
                >
                  -
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  aria-label={t('cart.increase_quantity')}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="ml-auto text-red-600 dark:text-red-400 text-sm hover:underline"
                  aria-label={t('cart.remove')}
                >
                  {t('cart.remove')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {t('cart.total')}
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
          {t('cart.view_cart')}
        </Link>
      </div>
    </motion.div>
  )
}

export default CartDropdown
