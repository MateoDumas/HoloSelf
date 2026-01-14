import { ModelMetadata } from '@/hooks/useModels'

const chairUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb'
const boxUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb'
const lanternUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb'
const boxAnimatedUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb'

export const mockModels: ModelMetadata[] = [
  {
    id: '1',
    title: 'Silla Moderna',
    description: 'Silla ergonómica de diseño moderno con soporte lumbar ajustable.',
    glb_url: chairUrl,
    thumbnail: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&auto=format&fit=crop',
    price: 299.99,
    meta: {
      category: 'sillas',
      tags: ['ergonómica', 'moderna', 'oficina'],
      dimensions: {
        width: 50,
        height: 100,
        depth: 50,
      },
      variants: [
        { id: 'v1', name: 'Negro', glb_url: chairUrl },
        { id: 'v2', name: 'Blanco', glb_url: chairUrl },
      ],
    },
  },
  {
    id: '2',
    title: 'Mesa de Centro',
    description: 'Mesa de centro de madera maciza con acabado natural.',
    glb_url: boxUrl,
    thumbnail: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&auto=format&fit=crop',
    price: 449.99,
    meta: {
      category: 'mesas',
      tags: ['madera', 'centro', 'sala'],
      dimensions: {
        width: 120,
        height: 45,
        depth: 60,
      },
    },
  },
  {
    id: '3',
    title: 'Lámpara de Pie',
    description: 'Lámpara de pie con diseño minimalista y luz LED regulable.',
    glb_url: lanternUrl,
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&auto=format&fit=crop',
    price: 179.99,
    meta: {
      category: 'iluminación',
      tags: ['LED', 'minimalista', 'moderna'],
      dimensions: {
        width: 30,
        height: 160,
        depth: 30,
      },
    },
  },
  {
    id: '4',
    title: 'Sofá Modular',
    description: 'Sofá modular de 3 plazas con tapizado en tela premium.',
    glb_url: boxAnimatedUrl,
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop',
    price: 1299.99,
    meta: {
      category: 'sofás',
      tags: ['modular', 'premium', 'sala'],
      dimensions: {
        width: 240,
        height: 85,
        depth: 95,
      },
      variants: [
        {
          id: 'v1',
          name: 'Gris',
          glb_url: boxAnimatedUrl,
        },
        {
          id: 'v2',
          name: 'Beige',
          glb_url: boxAnimatedUrl,
        },
      ],
    },
  },
  {
    id: '5',
    title: 'Estantería Flotante',
    description: 'Estantería flotante de diseño escandinavo con 4 niveles.',
    glb_url: boxUrl,
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop',
    price: 349.99,
    meta: {
      category: 'estanterías',
      tags: ['flotante', 'escandinavo', 'madera'],
      dimensions: {
        width: 100,
        height: 180,
        depth: 30,
      },
    },
  },
  {
    id: '6',
    title: 'Escritorio Ejecutivo',
    description: 'Escritorio ejecutivo de roble con cajones laterales.',
    glb_url: boxUrl,
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop',
    price: 899.99,
    meta: {
      category: 'escritorios',
      tags: ['ejecutivo', 'roble', 'oficina'],
      dimensions: {
        width: 160,
        height: 75,
        depth: 70,
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
