import React, { useState, useRef, useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import CartDropdown from './CartDropdown'
import { ShoppingBag } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

const CartButton: React.FC = () => {
  const { getItemCount } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const itemCount = getItemCount()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-xl transition-all duration-200 ${
          isOpen 
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
        aria-label="Carrito de compras"
        aria-expanded={isOpen}
        aria-controls="cart-dropdown"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
            {itemCount}
          </span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && <CartDropdown onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default CartButton
