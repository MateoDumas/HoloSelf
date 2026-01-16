import React, { useState } from 'react'
import { ModelMetadata } from '@/hooks/useModels'
import ModelComparator from './ModelComparator'
import { useFavoritesStore } from '@/store/useFavoritesStore'
import { useTranslation } from 'react-i18next'

interface CompareButtonProps {
  models: ModelMetadata[]
}

const CompareButton: React.FC<CompareButtonProps> = ({ models }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { favorites } = useFavoritesStore()
  const { t } = useTranslation()

  const favoriteModels = models.filter((m) => favorites.includes(m.id))

  if (favoriteModels.length < 2) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-secondary flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        {t('compare.button_label')}
      </button>
      {isOpen && (
        <ModelComparator
          models={favoriteModels}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default CompareButton
