import React, { useEffect, useRef } from 'react'

interface ModelViewerARProps {
  modelUrl: string
  modelTitle?: string
  onActivate?: () => void
}

/**
 * Componente oculto de model-viewer para AR en iOS
 * Se usa como fallback cuando el método de rel="ar" no funciona
 */
const ModelViewerAR: React.FC<ModelViewerARProps> = ({
  modelUrl,
  modelTitle,
  onActivate,
}) => {
  const modelViewerRef = useRef<any>(null)

  useEffect(() => {
    if (modelViewerRef.current && onActivate) {
      // Intentar activar AR cuando el componente esté listo
      const timer = setTimeout(() => {
        try {
          if (modelViewerRef.current && typeof (modelViewerRef.current as any).activateAR === 'function') {
            (modelViewerRef.current as any).activateAR()
            onActivate()
          }
        } catch (error) {
          console.warn('Error activando model-viewer AR:', error)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [modelUrl, onActivate])

  return (
    <model-viewer
      ref={modelViewerRef}
      src={modelUrl}
      alt={modelTitle || 'Modelo 3D'}
      ar
      ar-modes="quick-look scene-viewer webxr"
      camera-controls
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ModelViewerAR
