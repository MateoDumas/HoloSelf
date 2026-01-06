import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/Product/ProductPage'

// Base path para GitHub Pages (debe coincidir con el nombre del repositorio)
const basePath = import.meta.env.BASE_URL || '/'

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
