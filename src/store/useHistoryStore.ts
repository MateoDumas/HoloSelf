import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HistoryStore {
  viewedProducts: string[]
  addViewedProduct: (id: string) => void
  clearHistory: () => void
  getRecentProducts: (limit?: number) => string[]
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      viewedProducts: [],
      addViewedProduct: (id) =>
        set((state) => {
          const filtered = state.viewedProducts.filter((p) => p !== id)
          return {
            viewedProducts: [id, ...filtered].slice(0, 50), // Máximo 50 productos
          }
        }),
      clearHistory: () => set({ viewedProducts: [] }),
      getRecentProducts: (limit = 10) =>
        get().viewedProducts.slice(0, limit),
    }),
    {
      name: 'holoself-history',
    }
  )
)
