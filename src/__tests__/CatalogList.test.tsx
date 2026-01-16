import React from 'react'
import { render, screen } from '@testing-library/react'
import CatalogList from '@/components/Catalog/CatalogList'
import { useModels } from '@/hooks/useModels'

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>(
    'react-i18next',
  )
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string, options?: Record<string, unknown>) => {
        if (options && 'count' in options) {
          return `${key}(${options.count})`
        }
        return key
      },
    }),
  }
})

vi.mock('@/hooks/useModels')
vi.mock('@/components/Catalog/ModelCard', () => ({
  __esModule: true,
  default: ({ model }: { model: { id: string; title: string } }) => (
    <div data-testid={`model-card-${model.id}`}>{model.title}</div>
  ),
}))
vi.mock('@/hooks/useSearchAndFilter', () => ({
  useSearchAndFilter: ({ models }: { models: any[] }) => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
    selectedCategory: null,
    setSelectedCategory: vi.fn(),
    selectedTags: [],
    toggleTag: vi.fn(),
    priceRange: [0, 2000],
    setPriceRange: vi.fn(),
    sortBy: 'name',
    setSortBy: vi.fn(),
    filteredModels: models,
    resetFilters: vi.fn(),
  }),
}))

const mockedUseModels = useModels as unknown as vi.Mock

describe('CatalogList', () => {
  it('muestra el estado de carga', () => {
    mockedUseModels.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    const { container } = render(<CatalogList />)
    expect(container.querySelectorAll('.card.animate-pulse').length).toBe(8)
  })

  it('muestra el título del catálogo y la cantidad de modelos', () => {
    mockedUseModels.mockReturnValue({
      data: {
        models: [
          { id: '1', title: 'Model 1', glb_url: 'url1' },
          { id: '2', title: 'Model 2', glb_url: 'url2' },
        ],
        total: 2,
        page: 1,
        pageSize: 20,
      },
      isLoading: false,
      error: null,
    })

    render(<CatalogList />)

    expect(screen.getByText('catalog_page.title')).toBeInTheDocument()
    expect(
      screen.getByText('catalog_page.count_other(2)'),
    ).toBeInTheDocument()
  })
})
