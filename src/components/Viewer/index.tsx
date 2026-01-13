import React from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import ModelInstance from './ModelInstance'
import ErrorBoundary from './ErrorBoundary'

export interface ViewerProps {
  modelUrl: string
  autoRotate?: boolean
  enableAR?: boolean
  className?: string
  onModelUrlChange?: (url: string) => void
}

const Viewer: React.FC<ViewerProps> = ({
  modelUrl,
  autoRotate = false,
  enableAR = false,
  className = '',
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ErrorBoundary>
          <Scene autoRotate={autoRotate} enableAR={enableAR}>
            <ModelInstance url={modelUrl} />
          </Scene>
        </ErrorBoundary>
      </Canvas>
    </div>
  )
}

export default Viewer
