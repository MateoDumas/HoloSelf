import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as THREE from 'three'

let dracoLoader: DRACOLoader | null = null

/**
 * Inicializa el loader de Draco para compresión de modelos
 */
export function initDracoLoader(): DRACOLoader {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    dracoLoader.setDecoderConfig({ type: 'js' })
  }
  return dracoLoader
}

/**
 * Carga un modelo GLTF/GLB con soporte para Draco
 */
export async function loadGLTF(url: string): Promise<THREE.Group> {
  const loader = new GLTFLoader()
  const draco = initDracoLoader()
  loader.setDRACOLoader(draco)

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        resolve(gltf.scene)
      },
      (progress) => {
        // Opcional: callback de progreso
        if (progress.lengthComputable) {
          const percentComplete = (progress.loaded / progress.total) * 100
          console.log(`Cargando modelo: ${percentComplete.toFixed(0)}%`)
        }
      },
      (error) => {
        console.error('Error cargando modelo:', error)
        reject(error)
      }
    )
  })
}

/**
 * Optimiza un modelo para móviles (decimación básica)
 */
export function optimizeModelForMobile(scene: THREE.Group): THREE.Group {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Reducir calidad de sombras en móviles
      child.castShadow = false
      child.receiveShadow = false
      
      // Simplificar materiales si es necesario
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.roughness = 0.8
        child.material.metalness = 0.2
      }
    }
  })
  return scene
}

/**
 * Calcula el bounding box de un modelo para centrarlo
 */
export function getModelBounds(scene: THREE.Group): THREE.Box3 {
  const box = new THREE.Box3().setFromObject(scene)
  return box
}

/**
 * Centra y escala un modelo para que quepa en la escena
 */
export function centerAndScaleModel(
  scene: THREE.Group,
  maxSize: number = 2
): void {
  const box = getModelBounds(scene)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDimension = Math.max(size.x, size.y, size.z)
  const scale = maxSize / maxDimension

  scene.scale.multiplyScalar(scale)
  scene.position.sub(center.multiplyScalar(scale))
}
