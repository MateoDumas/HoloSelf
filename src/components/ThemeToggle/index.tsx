import React from 'react'
import { useThemeStore } from '@/store/useThemeStore'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { t } = useTranslation()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={t('accessibility.theme_toggle')}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
} 

export default ThemeToggle
