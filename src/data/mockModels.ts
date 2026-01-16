import { ModelMetadata } from '@/hooks/useModels'

// Modelos 3D de Khronos Sample Assets (Stable URLs)
const chairUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb'
const lampUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AnisotropyBarnLamp/glTF-Binary/AnisotropyBarnLamp.glb'
const cameraUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb'
const radioUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb'
const candleUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlassHurricaneCandleHolder/glTF-Binary/GlassHurricaneCandleHolder.glb'
const carUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb'

export const mockModels: ModelMetadata[] = [
  {
    id: '1',
    title: 'Sheen Premium Chair',
    description:
      'Designer chair with soft velvet upholstery and golden legs. Perfect for adding an elegant touch to any room.',
    glb_url: chairUrl,
    thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&auto=format&fit=crop',
    price: 299.99,
    meta: {
      category: 'furniture',
      tags: ['premium', 'velvet', 'design'],
      dimensions: {
        width: 50,
        height: 100,
        depth: 50,
      },
      variants: [
        { id: 'v1', name: 'Mango', glb_url: chairUrl },
      ],
    },
  },
  {
    id: '2',
    title: 'Industrial Lamp',
    description:
      'Industrial-style pendant lamp with distressed metal finish. Ideal for modern kitchens and dining rooms.',
    glb_url: lampUrl,
    thumbnail: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&auto=format&fit=crop',
    price: 129.99,
    meta: {
      category: 'lighting',
      tags: ['industrial', 'metal', 'pendant'],
      dimensions: {
        width: 30,
        height: 40,
        depth: 30,
      },
    },
  },
  {
    id: '3',
    title: 'Vintage Camera',
    description:
      'Antique collectible camera with wooden tripod. A unique piece for photography lovers.',
    glb_url: cameraUrl,
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop',
    price: 599.99,
    meta: {
      category: 'decor',
      tags: ['vintage', 'collectible', 'photography'],
      dimensions: {
        width: 40,
        height: 30,
        depth: 30,
      },
    },
  },
  {
    id: '4',
    title: 'Retro Boombox Radio',
    description:
      'Portable 80s-style radio with high-fidelity speakers. Combines retro design with modern audio technology.',
    glb_url: radioUrl,
    thumbnail: 'https://images.pexels.com/photos/18611257/pexels-photo-18611257.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 199.99,
    meta: {
      category: 'electronics',
      tags: ['retro', 'audio', '80s'],
      dimensions: {
        width: 60,
        height: 35,
        depth: 20,
      },
    },
  },
  {
    id: '5',
    title: 'Glass Candle Holder',
    description:
      'Decorative blown-glass candle holder for large candles. Creates a warm and cozy atmosphere.',
    glb_url: candleUrl,
    thumbnail: 'https://images.pexels.com/photos/698921/pexels-photo-698921.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 49.99,
    meta: {
      category: 'decor',
      tags: ['glass', 'candle', 'home'],
      dimensions: {
        width: 15,
        height: 25,
        depth: 15,
      },
    },
  },
  {
    id: '6',
    title: 'Classic Toy Car',
    description:
      'Scale model of a classic car crafted with great detail. Perfect for collectors and kids.',
    glb_url: carUrl,
    thumbnail: 'https://images.pexels.com/photos/11292464/pexels-photo-11292464.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 89.99,
    meta: {
      category: 'toys',
      tags: ['classic', 'collectible', 'kids'],
      dimensions: {
        width: 10,
        height: 8,
        depth: 20,
      },
    },
  },
]

export const getMockModels = (page: number = 1, pageSize: number = 20) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const models = mockModels.slice(start, end)
  
  return {
    models,
    total: mockModels.length,
    page,
    pageSize,
  }
}

export const getMockModel = (id: string) => {
  return mockModels.find((model) => model.id === id) || null
}
