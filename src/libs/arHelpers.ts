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
 * iOS AR Quick Look requiere que el archivo esté en HTTPS y sea accesible públicamente
 * También puede usar un elemento <a> con rel="ar" o model-viewer
 */
export function getARQuickLookURL(modelUrl: string): string {
  // Asegurar que la URL sea absoluta y use HTTPS
  try {
    const url = new URL(modelUrl)
    // Si ya es una URL válida, retornarla
    return url.href
  } catch {
    // Si es una URL relativa, intentar construirla
    if (modelUrl.startsWith('http://') || modelUrl.startsWith('https://')) {
      return modelUrl
    }
    // Si es relativa, necesitamos la URL base
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}${modelUrl.startsWith('/') ? '' : '/'}${modelUrl}`
  }
}

/**
 * Activa AR Quick Look en iOS usando un elemento <a> temporal
 * iOS AR Quick Look requiere:
 * 1. URL HTTPS accesible públicamente
 * 2. Elemento <a> con rel="ar"
 * 3. El archivo debe ser .usdz o .glb/.gltf
 * 4. El servidor debe servir el archivo con Content-Type correcto
 * 
 * NOTA: raw.githubusercontent.com no sirve archivos con los headers correctos
 * para AR Quick Look. Se recomienda usar model-viewer o un proxy/CDN.
 */
export function activateARQuickLook(modelUrl: string): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  const url = getARQuickLookURL(modelUrl)
  
  // Verificar que la URL sea HTTPS (requerido por iOS)
  if (!url.startsWith('https://')) {
    console.error('AR Quick Look requiere HTTPS. URL proporcionada:', url)
    alert('El modelo debe estar disponible a través de HTTPS para usar AR en iOS.')
    return
  }

  // Si la URL es de raw.githubusercontent.com, advertir que puede no funcionar
  if (url.includes('raw.githubusercontent.com')) {
    console.warn(
      'raw.githubusercontent.com puede no servir archivos GLB con los headers correctos para AR Quick Look. ' +
      'Considera usar un CDN o servicio de hosting que soporte AR.'
    )
  }

  // Crear un elemento <a> temporal con rel="ar"
  // Este es el método correcto para iOS AR Quick Look
  const link = document.createElement('a')
  link.href = url
  link.rel = 'ar'
  link.setAttribute('data-ar', 'true')
  
  // Agregar atributos adicionales para mejor compatibilidad
  link.setAttribute('target', '_blank')
  
  // Agregar al DOM temporalmente
  link.style.position = 'fixed'
  link.style.top = '-9999px'
  link.style.left = '-9999px'
  link.style.opacity = '0'
  link.style.pointerEvents = 'none'
  document.body.appendChild(link)
  
  // Hacer click programáticamente
  // Nota: En iOS, esto debe ser iniciado por una acción del usuario
  try {
    link.click()
  } catch (error) {
    console.error('Error al activar AR Quick Look:', error)
    // Fallback: intentar abrir directamente (puede no funcionar en iOS)
    try {
      window.open(url, '_blank')
    } catch (e) {
      console.error('No se pudo abrir AR:', e)
      alert('No se pudo iniciar AR. Asegúrate de que el archivo esté disponible públicamente con HTTPS.')
    }
  }
  
  // Remover después de un breve delay
  setTimeout(() => {
    if (link.parentNode) {
      document.body.removeChild(link)
    }
  }, 1000)
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
