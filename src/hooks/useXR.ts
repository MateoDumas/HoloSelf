import { useState, useEffect } from 'react'
import {
  getAvailableARMethod,
  requestWebXRSession,
  type ARMethod,
} from '@/libs/arHelpers'

export function useXR() {
  const [arMethod, setArMethod] = useState<ARMethod>('none')
  const [isSupported, setIsSupported] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(false)

  useEffect(() => {
    const method = getAvailableARMethod()
    setArMethod(method)
    setIsSupported(method !== 'none')
  }, [])

  const startARSession = async () => {
    if (arMethod === 'webxr') {
      const session = await requestWebXRSession('immersive-ar')
      if (session) {
        setIsSessionActive(true)
        session.addEventListener('end', () => {
          setIsSessionActive(false)
        })
        return session
      }
    }
    return null
  }

  return {
    arMethod,
    isSupported,
    isSessionActive,
    startARSession,
  }
}
