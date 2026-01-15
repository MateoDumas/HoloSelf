import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import SkipToContent from '@/components/UI/SkipToContent'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      <SkipToContent targetId="main-content" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          className: 'dark:bg-gray-800 dark:text-white',
        }}
      />
    </div>
  )
}

export default Layout
