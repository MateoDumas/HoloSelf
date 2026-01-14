import React from 'react'
import CatalogList from '@/components/Catalog/CatalogList'
import Hero from '@/components/Home/Hero'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Catálogo Completo
          </h2>
        </div>
        <CatalogList />
      </div>
    </>
  )
}

export default Home
