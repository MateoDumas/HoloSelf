import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './styles/globals.css'
import './i18n'

// Inicializar tema al cargar
const savedTheme = localStorage.getItem('holoself-theme')
if (savedTheme) {
  try {
    const theme = JSON.parse(savedTheme).state?.theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  } catch (e) {
    // Ignorar errores de parsing
  }
}

// Registrar Service Worker para PWA
// Solo en producción y si el archivo existe
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        // Silenciar errores de SW en desarrollo o si no existe
        if (import.meta.env.DEV) {
          console.log('SW registration skipped in development')
        } else {
          console.warn('SW registration failed: ', registrationError)
        }
      })
  })
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
