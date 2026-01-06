import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import ThemeToggle from '@/components/ThemeToggle'

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link
                to="/"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-2 mb-2"
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Carrito de Compras
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-24 h-24 text-gray-400 dark:text-gray-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              Tu carrito está vacío
            </p>
            <Link to="/" className="btn-primary inline-block">
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex gap-4"
                >
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {item.title}
                    </Link>
                    {item.price && (
                      <p className="text-primary-600 dark:text-primary-400 font-semibold mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="text-gray-900 dark:text-gray-100 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-600 dark:text-red-400 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="text-red-600 dark:text-red-400 hover:underline"
              >
                Vaciar carrito
              </button>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Resumen
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal:</span>
                    <span>${getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Envío:</span>
                    <span>Calculado al finalizar</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
                      <span>Total:</span>
                      <span className="text-primary-600 dark:text-primary-400">
                        ${getTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary w-full mb-2">
                  Proceder al Pago
                </button>
                <Link to="/" className="btn-secondary w-full block text-center">
                  Seguir Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Cart
