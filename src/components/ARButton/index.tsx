import React, { useState } from 'react'
import { useXR } from '@/hooks/useXR'
import {
  getARQuickLookURL,
  getSceneViewerURL,
  isIOSARAvailable,
  isAndroidARAvailable,
} from '@/libs/arHelpers'

interface ARButtonProps {
  modelUrl: string
  modelTitle?: string
  className?: string
}

const ARButton: React.FC<ARButtonProps> = ({
  modelUrl,
  modelTitle,
  className = '',
}) => {
  const { arMethod, isSupported, startARSession } = useXR()
  const [isLoading, setIsLoading] = useState(false)

  const handleARClick = async () => {
    if (!isSupported) {
      alert('AR no está disponible en este dispositivo')
      return
    }

    setIsLoading(true)

    try {
      if (arMethod === 'webxr') {
        const session = await startARSession()
        if (!session) {
          // Si WebXR no está disponible, intentar con model-viewer como fallback
          if (isIOSARAvailable()) {
            window.location.href = getARQuickLookURL(modelUrl)
          } else if (isAndroidARAvailable()) {
            window.location.href = getSceneViewerURL(modelUrl, modelTitle)
          } else {
            alert('AR no está disponible en este dispositivo. Prueba en un dispositivo móvil con soporte AR.')
          }
        }
      } else if (arMethod === 'ios-ar' || isIOSARAvailable()) {
        // iOS AR Quick Look
        window.location.href = getARQuickLookURL(modelUrl)
      } else if (arMethod === 'android-ar' || isAndroidARAvailable()) {
        // Android Scene Viewer
        window.location.href = getSceneViewerURL(modelUrl, modelTitle)
      } else if (arMethod === 'model-viewer') {
        // Fallback a model-viewer
        const modelViewer = document.querySelector('model-viewer')
        if (modelViewer) {
          ;(modelViewer as any).activateAR()
        }
      }
    } catch (error: any) {
      // Solo mostrar error si no es un error esperado
      if (error?.name !== 'NotSupportedError') {
        console.warn('Error iniciando AR:', error)
      }
      alert('No se pudo iniciar la experiencia AR. Prueba en un dispositivo móvil con soporte AR.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <button
      onClick={handleARClick}
      disabled={isLoading}
      className={`btn-primary flex items-center gap-2 ${className}`}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Iniciando AR...
        </>
      ) : (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Ver en AR
        </>
      )}
    </button>
  )
}

export default ARButton
