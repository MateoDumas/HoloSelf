import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import ProductPage from './pages/Product/ProductPage'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import History from './pages/History'
import { useThemeStore } from './store/useThemeStore'

// Base path para GitHub Pages (debe coincidir con el nombre del repositorio)
const basePath = import.meta.env.BASE_URL || '/'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
