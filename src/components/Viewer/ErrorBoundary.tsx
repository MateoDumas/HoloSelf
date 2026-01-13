import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error in 3D Viewer:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg p-6 text-center">
                    <svg
                        className="w-12 h-12 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <h3 className="text-lg font-medium mb-1">Error al cargar el modelo 3D</h3>
                    <p className="text-sm mb-3">Hubo un problema al visualizar este producto.</p>
                    {this.state.error && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {this.state.error.message?.includes('404')
                                ? 'El archivo del modelo no se encontró en el servidor'
                                : this.state.error.message || 'Error desconocido'}
                        </p>
                    )}
                    {(import.meta.env.DEV || import.meta.env.MODE === 'development') && this.state.error && (
                        <details className="mt-4 text-xs text-left max-w-full">
                            <summary className="cursor-pointer text-gray-600 dark:text-gray-400 mb-2">
                                Detalles técnicos
                            </summary>
                            <pre className="p-2 bg-gray-200 dark:bg-gray-900 rounded text-xs overflow-auto max-w-full">
                                {this.state.error.stack || this.state.error.message}
                            </pre>
                        </details>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
