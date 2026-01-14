import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getMockModels, getMockModel } from '@/data/mockModels'

export interface ModelMetadata {
  id: string
  title: string
  description?: string
  glb_url: string
  thumbnail?: string
  price?: number
  meta?: {
    category?: string
    tags?: string[]
    dimensions?: {
      width: number
      height: number
      depth: number
    }
    variants?: Array<{
      id: string
      name: string
      glb_url: string
    }>
    [key: string]: any
  }
}

export interface ModelsResponse {
  models: ModelMetadata[]
  total: number
  page: number
  pageSize: number
}

const API_URL = import.meta.env.VITE_API_URL || 'https://api.nucamp.co'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * Hook para obtener la lista de modelos
 */
export function useModels(page: number = 1, pageSize: number = 20) {
  return useQuery<ModelsResponse>({
    queryKey: ['models', page, pageSize],
    queryFn: async () => {
      // Usar datos mock si está explícitamente configurado
      if (USE_MOCK_DATA) {
        console.log('📊 Using mock data for models list (VITE_USE_MOCK=true)')
        await new Promise((resolve) => setTimeout(resolve, 500))
        return getMockModels(page, pageSize)
      }

      // Intentar conectar con la API
      try {
        console.log('🌐 Attempting to fetch models from API:', `${API_URL}/models`)
        const response = await axios.get<ModelsResponse>(
          `${API_URL}/models`,
          {
            params: { page, pageSize },
            timeout: 5000, // 5 segundos de timeout
          }
        )
        console.log('✅ API fetch successful for models')
        return response.data
      } catch (error) {
        console.log('⚠️ API fetch failed, falling back to mock data:', String(error))
        // Fallback automático a datos mock si la API falla
        console.warn('⚠️ No se pudo conectar con la API, usando datos de demostración:', error)
        await new Promise((resolve) => setTimeout(resolve, 500))
        return getMockModels(page, pageSize)
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para obtener un modelo específico por ID
 */
export function useModel(id: string) {
  return useQuery<ModelMetadata>({
    queryKey: ['model', id],
    queryFn: async () => {
      // Usar datos mock si está explícitamente configurado
      if (USE_MOCK_DATA) {
        console.log('📊 Using mock data for model', id, '(VITE_USE_MOCK=true)')
        await new Promise((resolve) => setTimeout(resolve, 300))
        const model = getMockModel(id)
        if (!model) {
          throw new Error('Modelo no encontrado')
        }
        return model
      }

      // Intentar conectar con la API
      try {
        console.log('🌐 Attempting to fetch model from API:', `${API_URL}/models/${id}`)
        const response = await axios.get<ModelMetadata>(
          `${API_URL}/models/${id}`,
          {
            timeout: 5000, // 5 segundos de timeout
          }
        )
        console.log('✅ API fetch successful for model', id)
        return response.data
      } catch (error) {
        console.log('⚠️ API fetch failed for model', id, ', falling back to mock:', String(error))
        // Fallback automático a datos mock si la API falla
        console.warn('⚠️ No se pudo conectar con la API, usando datos de demostración:', error)
        await new Promise((resolve) => setTimeout(resolve, 300))
        const model = getMockModel(id)
        if (!model) {
          throw new Error('Modelo no encontrado')
        }
        return model
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}
