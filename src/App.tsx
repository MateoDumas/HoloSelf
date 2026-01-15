import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { useThemeStore } from './store/useThemeStore'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/Product/ProductPage'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Cart = lazy(() => import('./pages/Cart'))
const History = lazy(() => import('./pages/History'))

// Base path para GitHub Pages (debe coincidir con el nombre del repositorio)
// En Vercel, BASE_URL será '/' automáticamente
const basePath = import.meta.env.BASE_URL || '/'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

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
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
