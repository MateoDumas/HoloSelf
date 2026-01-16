import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { History, Heart, Box } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import CartButton from '@/components/Cart/CartButton'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import LanguageSelector from '@/components/UI/LanguageSelector'
import { useTranslation } from 'react-i18next'

const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const { favorites } = useFavoritesStore()
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label={t('accessibility.go_home')}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                HoloSelf
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to="/history"
              className={`relative p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
                isActive('/history')
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
              title={t('nav.history')}
              aria-current={isActive('/history') ? 'page' : undefined}
            >
              <History className="w-5 h-5" />
            </Link>

            <Link
              to="/favorites"
              className={`relative p-1.5 sm:p-2 rounded-xl transition-all duration-200 ${
                isActive('/favorites')
                  ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
              title={t('nav.favorites')}
              aria-current={isActive('/favorites') ? 'page' : undefined}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900">
                  {favorites.length}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1" />

            <LanguageSelector />
            <CartButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
