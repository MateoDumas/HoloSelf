import React from 'react'
import CatalogList from '@/components/Catalog/CatalogList'
import Hero from '@/components/Home/Hero'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Hero />
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t('home.full_catalog')}
          </h2>
        </div>
        <CatalogList />
      </div>
    </>
  )
}

export default Home
