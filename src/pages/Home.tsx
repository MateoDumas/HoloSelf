import React from 'react'
import CatalogList from '@/components/Catalog/CatalogList'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">HoloSelf</h1>
          <p className="text-gray-600 mt-1">
            Catálogo 3D/AR de productos
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogList />
      </main>
      
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2024 HoloSelf. Catálogo 3D/AR.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
