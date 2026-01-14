import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Carrito de Compras
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
          >
            Vaciar carrito
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Parece que aún no has añadido ningún producto. Explora nuestro catálogo y encuentra algo que te guste.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            Ir al catálogo
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          <Link to={`/product/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {item.id}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 text-gray-900 dark:text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Resumen del pedido
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                  <p>Subtotal</p>
                  <p>${getTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                  <p>Envío</p>
                  <p className="text-green-600 dark:text-green-400 font-medium">Gratis</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Total</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${getTotal().toFixed(2)}
                  </p>
                </div>
              </div>

              <button className="w-full mt-8 bg-blue-600 border border-transparent rounded-xl py-4 px-4 text-white text-lg font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]">
                Proceder al pago
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Transacción segura y encriptada
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
