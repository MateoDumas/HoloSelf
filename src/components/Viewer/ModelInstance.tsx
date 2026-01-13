import React, { Suspense } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { centerAndScaleModel } from '@/libs/gltfUtils'
import * as THREE from 'three'

interface ModelInstanceProps {
  url: string
  onLoad?: () => void
}

const ModelInstance: React.FC<ModelInstanceProps> = ({ url, onLoad }) => {
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
