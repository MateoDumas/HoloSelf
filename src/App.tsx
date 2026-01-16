import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, Suspense, lazy, useState } from 'react'
import { useThemeStore } from './store/useThemeStore'
import { useTranslation } from 'react-i18next'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/Product/ProductPage'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Cart = lazy(() => import('./pages/Cart'))
const History = lazy(() => import('./pages/History'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const License = lazy(() => import('./pages/License'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Base path para GitHub Pages (debe coincidir con el nombre del repositorio)
// En Vercel, BASE_URL será '/' automáticamente
const basePath = import.meta.env.BASE_URL || '/'

function App() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (isBooting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/40">
            <span className="text-2xl font-black tracking-tight">HS</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-400">{t('splash.loading')}</p>
            <p className="text-2xl font-bold">HoloSelf</p>
          </div>
        </div>
        <LoadingSpinner size="lg" className="text-blue-400" />
      </div>
    )
  }

  return (
    <BrowserRouter basename={basePath}>
      <Layout>
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<History />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/license" element={<License />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
