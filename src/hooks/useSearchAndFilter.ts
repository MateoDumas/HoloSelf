import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { ModelMetadata } from './useModels'

interface UseSearchAndFilterProps {
  models: ModelMetadata[]
}

export function useSearchAndFilter({ models }: UseSearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name')

  // Configurar Fuse.js para búsqueda
  const fuse = useMemo(
    () =>
      new Fuse(models, {
        keys: ['title', 'description', 'meta.tags'],
        threshold: 0.3,
      }),
    [models]
  )

  // Filtrar y buscar
  const filteredModels = useMemo(() => {
    let result = models

    // Búsqueda
    if (searchQuery) {
      const searchResults = fuse.search(searchQuery)
      result = searchResults.map((r) => r.item)
    }

    // Filtro por categoría
    if (selectedCategory) {
      result = result.filter((m) => m.meta?.category === selectedCategory)
    }

    // Filtro por tags
    if (selectedTags.length > 0) {
      result = result.filter((m) =>
        selectedTags.every((tag) => m.meta?.tags?.includes(tag))
      )
    }

    // Filtro por precio
    result = result.filter((m) => {
      const price = m.price || 0
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Ordenar
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0)
        case 'price-desc':
          return (b.price || 0) - (a.price || 0)
        case 'name':
        default:
          return a.title.localeCompare(b.title)
      }
    })

    return result
  }, [models, searchQuery, selectedCategory, selectedTags, priceRange, sortBy, fuse])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTags([])
    setPriceRange([0, 2000])
    setSortBy('name')
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    filteredModels,
    resetFilters,
  }
}
