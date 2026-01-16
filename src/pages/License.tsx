import React from 'react'
import { useTranslation } from 'react-i18next'

const License: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {t('legal_pages.license.title')}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {t('legal_pages.license.intro')}
      </p>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {t('legal_pages.license.ownership_title')}
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        {t('legal_pages.license.ownership_text')}
      </p>
    </div>
  )
}

export default License

