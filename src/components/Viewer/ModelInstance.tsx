import React, { Suspense } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { centerAndScaleModel } from '@/libs/gltfUtils'
import * as THREE from 'three'

interface ModelInstanceProps {
  url: string
  color?: string
  onLoad?: () => void
}

const ModelInstance: React.FC<ModelInstanceProps> = ({ url, color, onLoad }) => {
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

      // Notificar que se cargó
      onLoad?.()
    }
  }, [scene, onLoad])

  // Efecto para cambios de color en tiempo real
  React.useEffect(() => {
    if (scene && color) {
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          const applyColor = (material: any) => {
            if (material && material.color) {
              // Clonamos el material para no afectar otros modelos si se usa cache
              // Aunque en este caso simple, podríamos modificarlo directo.
              // Para asegurar reactividad visual correcta:
              material.color.set(color)
            }
          }

          if (Array.isArray(child.material)) {
            child.material.forEach(applyColor)
          } else {
            applyColor(child.material)
          }
        }
      })
    }
  }, [scene, color])

  return (
    <Suspense
      fallback={
        <Html center>
          <div className="text-white bg-black/50 px-4 py-2 rounded">
            Cargando modelo...
          </div>
        </Html>
      }
    >
      <primitive object={scene} dispose={null} />
    </Suspense>
  )
}

export default ModelInstance
