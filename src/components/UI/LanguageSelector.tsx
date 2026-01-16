import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector: React.FC = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
                onClick={() => changeLanguage('es')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${i18n.language.startsWith('es')
                        ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                aria-label={t('language.switch_es')}
            >
                ES
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${i18n.language.startsWith('en')
                        ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                aria-label={t('language.switch_en')}
            >
                EN
            </button>
        </div>
    )
}

export default LanguageSelector
