import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Smartphone } from 'lucide-react'

const Hero: React.FC = () => {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog')
    catalog?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              Nueva Colección 2026
            </span>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
              Visualiza el futuro en <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Tu Propio Espacio
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Descubre nuestra colección exclusiva de muebles y decoración. 
              Usa la Realidad Aumentada para ver cómo quedan en tu hogar antes de comprar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 dark:border-gray-700 text-lg font-medium rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-all"
              >
                <Smartphone className="mr-2 w-5 h-5" />
                Demo AR
              </button>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {[
              {
                icon: <Box className="w-6 h-6 text-blue-600" />,
                title: "Modelos 3D Detallados",
                desc: "Visualiza cada textura y detalle con nuestros modelos de alta fidelidad."
              },
              {
                icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
                title: "Realidad Aumentada",
                desc: "Proyecta los productos en tu sala usando la cámara de tu móvil."
              },
              {
                icon: <ArrowRight className="w-6 h-6 text-purple-600" />,
                title: "Compra Segura",
                desc: "Proceso de compra simplificado y entregas garantizadas."
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
