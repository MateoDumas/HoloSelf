import React, { useEffect } from 'react'

interface SkipToContentProps {
    targetId?: string
}

const SkipToContent: React.FC<SkipToContentProps> = ({ targetId = 'main-content' }) => {
    useEffect(() => {
        // Add keyboard navigation helpers
        const handleKeyPress = (e: KeyboardEvent) => {
            // Alt + H for Home
            if (e.altKey && e.key === 'h') {
                window.location.href = '/'
            }
            // Alt + F for Favorites
            if (e.altKey && e.key === 'f') {
                window.location.href = '/favorites'
            }
            // Alt + C for Cart
            if (e.altKey && e.key === 'c') {
                window.location.href = '/cart'
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    const handleSkip = () => {
        const target = document.getElementById(targetId)
        if (target) {
            target.focus()
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <a
            href={`#${targetId}`}
            onClick={handleSkip}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
        >
            Saltar al contenido principal
        </a>
    )
}

export default SkipToContent
