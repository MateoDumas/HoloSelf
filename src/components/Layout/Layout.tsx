import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import SkipToContent from '@/components/UI/SkipToContent'
import Onboarding from '@/components/Onboarding'

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
      <Onboarding />
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          className: '!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !shadow-lg !rounded-xl border border-gray-100 dark:border-gray-700',
          style: {},
          success: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#eff6ff',
            },
            className: '!border-l-4 !border-l-blue-600',
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
            className: '!border-l-4 !border-l-red-500',
          },
        }}
      />
    </div>
  )
}

export default Layout
