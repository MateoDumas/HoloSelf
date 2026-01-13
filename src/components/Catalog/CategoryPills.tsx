import React from 'react'

interface CategoryPillsProps {
    categories: string[]
    selectedCategory: string | null
    onSelectCategory: (category: string | null) => void
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mask-gradient-right">
            <button
                onClick={() => onSelectCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === null
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
            >
                Todas
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category === selectedCategory ? null : category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryPills
