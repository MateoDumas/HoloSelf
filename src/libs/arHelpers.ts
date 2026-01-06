/**
 * Detecta si WebXR está disponible en el navegador
 */
export function isWebXRAvailable(): boolean {
  if (typeof navigator === 'undefined') return false
  return 'xr' in navigator
}

/**
 * Detecta si el dispositivo es móvil
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Detecta si iOS AR Quick Look está disponible
 */
export function isIOSARAvailable(): boolean {
  if (typeof window === 'undefined') return false
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  return isIOS && isSafari
}

/**
 * Detecta si Android Scene Viewer está disponible
 */
export function isAndroidARAvailable(): boolean {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

/**
 * Obtiene el mejor método AR disponible para el dispositivo actual
 */
export type ARMethod = 'webxr' | 'ios-ar' | 'android-ar' | 'model-viewer' | 'none'

export function getAvailableARMethod(): ARMethod {
  if (isWebXRAvailable()) {
    return 'webxr'
  }
  if (isIOSARAvailable()) {
    return 'ios-ar'
  }
  if (isAndroidARAvailable()) {
    return 'android-ar'
  }
  if (typeof document !== 'undefined' && 'customElements' in window) {
    return 'model-viewer'
  }
  return 'none'
}

/**
 * Solicita permisos para WebXR
 */
export async function requestWebXRSession(
  mode: 'immersive-ar' | 'immersive-vr' = 'immersive-ar'
): Promise<XRSession | null> {
  if (!isWebXRAvailable()) {
    return null
  }

  try {
    const session = await (navigator as any).xr?.requestSession(mode, {
      requiredFeatures: ['local-floor'],
      optionalFeatures: ['bounded-floor', 'hand-tracking'],
    })
    return session
  } catch (error: any) {
    // Solo mostrar error si no es un error de "no soportado" (esperado en muchos dispositivos)
    if (error?.name !== 'NotSupportedError' && error?.name !== 'SecurityError') {
      console.warn('Error solicitando sesión WebXR:', error)
    }
    return null
  }
}

/**
 * Genera URL para AR Quick Look (iOS)
 */
export function getARQuickLookURL(modelUrl: string): string {
  return modelUrl
}

/**
 * Genera URL para Scene Viewer (Android)
 */
export function getSceneViewerURL(
  modelUrl: string,
  title?: string
): string {
  const baseUrl = 'https://arvr.google.com/scene-viewer/1.0'
  const params = new URLSearchParams({
    file: modelUrl,
    mode: 'ar_only',
  })
  if (title) {
    params.append('title', title)
  }
  return `${baseUrl}?${params.toString()}`
}
