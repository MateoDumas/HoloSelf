import React, { Suspense, useState, useEffect } from 'react'
import { useGLTF, Html, useProgress } from '@react-three/drei'
import { centerAndScaleModel } from '@/libs/gltfUtils'
import * as THREE from 'three'

interface ModelInstanceProps {
  url: string
}

// Componente interno que maneja la carga del modelo
const ModelLoader: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url) as any

  React.useEffect(() => {
    if (scene) {
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
  }, [scene])

  return <primitive object={scene} dispose={null} />
}

const ModelInstance: React.FC<ModelInstanceProps> = ({ url }) => {
  const { progress } = useProgress()
  const [error, setError] = useState<Error | null>(null)

  // Validar URL antes de intentar cargar
  useEffect(() => {
    if (!url || url.trim() === '') {
      setError(new Error('URL del modelo no proporcionada'))
      return
    }

    // Verificar si la URL es válida
    try {
      new URL(url)
    } catch {
      setError(new Error('URL del modelo inválida'))
    }
  }, [url])

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <Html center>
        <div className="text-white bg-red-900/80 px-4 py-3 rounded max-w-xs text-center">
          <p className="font-semibold mb-1">Error al cargar el modelo</p>
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
            {progress > 0 ? `Cargando modelo... ${Math.round(progress)}%` : 'Cargando modelo...'}
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

  useEffect(() => {
    // Intentar cargar el modelo para verificar si está disponible
    const checkModel = async () => {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        if (!response.ok) {
          setHasError(true)
          if (response.status === 404) {
            setErrorMessage('El archivo del modelo no se encontró en el servidor (404)')
          } else {
            setErrorMessage(`Error al acceder al modelo: ${response.status}`)
          }
        }
      } catch (err: any) {
        // Si falla el fetch, aún intentar cargar con useGLTF
        // ya que algunos servidores no permiten HEAD
        console.warn('No se pudo verificar el modelo:', err)
      }
    }

    checkModel()
  }, [url])

  if (hasError) {
    return (
      <Html center>
        <div className="text-white bg-red-900/80 px-4 py-3 rounded max-w-xs text-center">
          <p className="font-semibold mb-1">Error al cargar el modelo</p>
          <p className="text-sm opacity-90">{errorMessage}</p>
        </div>
      </Html>
    )
  }

  return <>{children}</>
}

export default ModelInstance