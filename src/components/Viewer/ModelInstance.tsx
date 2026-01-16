import React, { Suspense, useState, useEffect } from 'react'
import { useGLTF, Html, useProgress } from '@react-three/drei'
import { centerAndScaleModel } from '@/libs/gltfUtils'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'

interface ModelInstanceProps {
  url: string
}

// Componente interno que maneja la carga del modelo
const ModelLoader: React.FC<{ url: string }> = ({ url }) => {
  console.log('🔄 Iniciando carga del modelo desde:', url)
  const { scene, error } = useGLTF(url) as any

  React.useEffect(() => {
    if (scene) {
      console.log('✅ Modelo cargado exitosamente:', url)
      // Centrar y escalar el modelo
      centerAndScaleModel(scene, 2)

      // Configurar sombras
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene, url])

  React.useEffect(() => {
    if (error) {
      console.error('❌ Error al cargar modelo con useGLTF:', url, error)
    }
  }, [error, url])

  return <primitive object={scene} dispose={null} />
}

const ModelInstance: React.FC<ModelInstanceProps> = ({ url }) => {
  const { progress } = useProgress()
  const [error, setError] = useState<Error | null>(null)
  const { t } = useTranslation()

  // Validar URL antes de intentar cargar
  useEffect(() => {
    if (!url || url.trim() === '') {
      setError(new Error(t('viewer.url_not_provided')))
      return
    }

    // Verificar si la URL es válida
    try {
      new URL(url)
    } catch {
      setError(new Error(t('viewer.url_invalid')))
    }
  }, [url, t])

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <Html center>
        <div className="text-white bg-red-900/80 px-4 py-3 rounded max-w-xs text-center">
          <p className="font-semibold mb-1">
            {t('viewer.inline_error_title')}
          </p>
          <p className="text-sm opacity-90">{error.message}</p>
        </div>
      </Html>
    )
  }

  return (
    <Suspense
      fallback={
        <Html center>
          <div className="text-white bg-black/50 px-4 py-2 rounded">
            {progress > 0
              ? `${t('viewer.loading')} ${Math.round(progress)}%`
              : t('viewer.loading')}
          </div>
        </Html>
      }
    >
      <ErrorCatcher url={url}>
        <ModelLoader url={url} />
      </ErrorCatcher>
    </Suspense>
  )
}

// Componente para capturar errores durante la carga
const ErrorCatcher: React.FC<{ children: React.ReactNode; url: string }> = ({ children, url }) => {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    // Intentar cargar el modelo para verificar si está disponible
    const checkModel = async () => {
      try {
        console.log('🔍 Checking model availability:', url)
        const response = await fetch(url, { method: 'HEAD' })
        console.log('🔍 Model check response:', response.status, response.statusText)
        if (!response.ok) {
          console.error('❌ Model not available:', url, response.status)
          setHasError(true)
          if (response.status === 404) {
            setErrorMessage(t('viewer.not_found_404'))
          } else {
            setErrorMessage(
              t('viewer.access_error', { status: response.status }),
            )
          }
        } else {
          console.log('✅ Model available:', url)
        }
      } catch (err: any) {
        console.warn('⚠️ Could not verify model:', url, err.message)
      }
    }

    checkModel()
  }, [url, t])

  if (hasError) {
    return (
      <Html center>
        <div className="text-white bg-red-900/80 px-4 py-3 rounded max-w-xs text-center">
          <p className="font-semibold mb-1">
            {t('viewer.inline_error_title')}
          </p>
          <p className="text-sm opacity-90">{errorMessage}</p>
        </div>
      </Html>
    )
  }

  return <>{children}</>
}

export default ModelInstance
