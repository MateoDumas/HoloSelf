import React, { ReactNode } from 'react'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

interface SceneProps {
  children: ReactNode
  autoRotate?: boolean
  enableAR?: boolean
}

const Scene: React.FC<SceneProps> = ({ children, autoRotate = false, enableAR = false }) => {
  const { gl } = useThree()

  // Configurar WebXR si está disponible
  React.useEffect(() => {
    if (enableAR && 'xr' in navigator) {
      gl.xr.enabled = true
    }
  }, [enableAR, gl])

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 3]} />
      
      {/* Iluminación */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={1} />
      <directionalLight position={[-5, -10, -7]} intensity={0.3} />
      
      {/* Ambiente */}
      <Environment preset="studio" />
      
      {/* Controles de cámara */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={1}
        minDistance={1}
        maxDistance={10}
      />
      
      {/* Modelo */}
      {children}
    </>
  )
}

export default Scene
