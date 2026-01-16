import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductPage from '@/pages/Product/ProductPage'
import { useModel } from '@/hooks/useModels'

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>(
    'react-i18next',
  )
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  }
})

vi.mock('@/hooks/useModels')
vi.mock('@/components/Recommendations/SimilarProducts', () => ({
  __esModule: true,
  default: () => <div data-testid="similar-products" />,
}))
vi.mock('@/store/useHistoryStore', () => ({
  useHistoryStore: () => ({
    addViewedProduct: vi.fn(),
  }),
}))

vi.mock('@/store/useCartStore', () => ({
  useCartStore: () => ({
    addItem: vi.fn(),
  }),
}))

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
  },
}))

const mockedUseModel = useModel as unknown as vi.Mock

const renderWithRouter = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('ProductPage', () => {
  it('muestra el estado de carga', () => {
    mockedUseModel.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    const { container } = renderWithRouter('1')
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(
      0,
    )
  })

  it('muestra mensaje de error cuando falla la carga', () => {
    mockedUseModel.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Error'),
    })

    renderWithRouter('1')

    expect(screen.getByText('product.error_loading')).toBeInTheDocument()
  })

  it('muestra los datos del producto cuando la carga es correcta', () => {
    mockedUseModel.mockReturnValue({
      data: {
        id: '1',
        title: 'Test Product',
        glb_url: 'model.glb',
        price: 99.99,
        meta: {
          tags: ['tag1', 'tag2'],
        },
      },
      isLoading: false,
      error: null,
    })

    renderWithRouter('1')

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(
      screen.getByText('$99.99'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('product.add_to_cart'),
    ).toBeInTheDocument()
  })
})
