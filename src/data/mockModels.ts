import { ModelMetadata } from '@/hooks/useModels'

export const mockModels: ModelMetadata[] = [
  {
    id: '1',
    title: 'products.chair.title',
    description: 'products.chair.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChairDamaskPurplegold/glTF-Binary/ChairDamaskPurplegold.glb',
    thumbnail: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    price: 299.99,
    meta: {
      category: 'sillas',
      tags: ['clásica', 'lujo', 'interior'],
      dimensions: {
        width: 50,
        height: 100,
        depth: 50,
      },
      variants: [
        { id: 'v1', name: 'Original', glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChairDamaskPurplegold/glTF-Binary/ChairDamaskPurplegold.glb' },
      ],
    },
  },
  {
    id: '2',
    title: 'products.box.title',
    description: 'products.box.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Box/glTF-Binary/Box.glb',
    thumbnail: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&w=800&q=80',
    price: 49.99,
    meta: {
      category: 'accesorios',
      tags: ['madera', 'básico', 'almacenaje'],
      dimensions: {
        width: 45,
        height: 45,
        depth: 45,
      },
    },
  },
  {
    id: '3',
    title: 'products.duck.title',
    description: 'products.duck.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb',
    thumbnail: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=800&q=80',
    price: 19.99,
    meta: {
      category: 'juguetes',
      tags: ['pato', 'baño', 'plástico'],
      dimensions: {
        width: 10,
        height: 10,
        depth: 15,
      },
    },
  },
  {
    id: '4',
    title: 'products.box_animated.title',
    description: 'products.box_animated.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoxAnimated/glTF-Binary/BoxAnimated.glb',
    thumbnail: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=800&q=80',
    price: 129.99,
    meta: {
      category: 'demo',
      tags: ['animado', 'básico'],
      dimensions: {
        width: 50,
        height: 50,
        depth: 50,
      },
      variants: [
        {
          id: 'v1',
          name: 'Standard',
          glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoxAnimated/glTF-Binary/BoxAnimated.glb',
        },
      ],
    },
  },
  {
    id: '5',
    title: 'products.corset.title',
    description: 'products.corset.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Corset/glTF-Binary/Corset.glb',
    thumbnail: 'https://images.unsplash.com/photo-1620116886241-11c79cbbf24b?auto=format&fit=crop&w=800&q=80',
    price: 149.99,
    meta: {
      category: 'moda',
      tags: ['histórico', 'ropa'],
      dimensions: {
        width: 30,
        height: 40,
        depth: 20,
      },
    },
  },
  {
    id: '6',
    title: 'products.boombox.title',
    description: 'products.boombox.desc',
    glb_url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb',
    thumbnail: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    price: 199.99,
    meta: {
      category: 'electrónica',
      tags: ['retro', 'música', 'radio'],
      dimensions: {
        width: 40,
        height: 25,
        depth: 15,
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
