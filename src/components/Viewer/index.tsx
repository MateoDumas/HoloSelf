import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import ModelInstance from './ModelInstance'
import ErrorBoundary from './ErrorBoundary'
import CameraControls from './CameraControls'

export interface ViewerProps {
  modelUrl: string
  thumbnail?: string
  autoRotate?: boolean
  enableAR?: boolean
  className?: string
  availableColors?: string[]
  onModelUrlChange?: (url: string) => void
}

// ... existing code ...

const Viewer: React.FC<ViewerProps> = ({
  modelUrl,
  thumbnail,
  autoRotate = false,
  enableAR = false,
  className = '',
  availableColors = ['#ffffff', '#3b82f6', '#ef4444', '#22c55e', '#eab308', '#171717'],
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cameraView, setCameraView] = useState<'front' | 'back' | 'left' | 'right' | 'top'>('front')
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)

  useEffect(() => {
    setIsLoading(true)
    setSelectedColor(undefined)
  }, [modelUrl])

  // Logic to update camera position based on view
  // This requires Scene component to accept camera position props or similar
  // For now we will just render the controls as requested in task.md

  return (
    <div className={`w-full h-full relative ${className}`}>
      {/* Camera Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-4">
        <CameraControls onViewChange={setCameraView} />

        {/* Color Picker */}
        {availableColors && availableColors.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 flex-wrap max-w-[150px]">
              {availableColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color
                      ? 'border-primary-500 scale-110'
                      : 'border-transparent hover:border-gray-300'
                    }`}
                  style={{ backgroundColor: color }}
                  title={`Color ${color}`}
                  aria-label={`Cambiar color a ${color}`}
                />
              ))}
              {selectedColor && (
                <button
                  onClick={() => setSelectedColor(undefined)}
                  className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Restaurar original"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay with Thumbnail */}
      {thumbnail && (
        <div
          className={`absolute inset-0 z-10 bg-gray-50 dark:bg-gray-800 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={thumbnail}
            alt="Cargando modelo 3D"
            className="w-full h-full object-contain p-4 opacity-50 blur-sm scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Cargando 3D...
              </span>
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ErrorBoundary>
          <Scene autoRotate={autoRotate} enableAR={enableAR}>
            <ModelInstance
              url={modelUrl}
              color={selectedColor}
              onLoad={() => setIsLoading(false)}
            />
          </Scene>
        </ErrorBoundary>
      </Canvas>
    </div>
  )
}

export default Viewer
