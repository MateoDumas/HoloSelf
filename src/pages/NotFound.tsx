import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold text-blue-600 mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {t('not_found.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('not_found.description')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
        >
          {t('not_found.back_home')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound

