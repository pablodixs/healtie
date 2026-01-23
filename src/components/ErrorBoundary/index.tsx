'use client'

import React from 'react'
import { css } from '../../../styled-system/css'

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

/**
 * ErrorBoundary component to catch and handle React errors gracefully
 * Prevents the entire application from crashing when a component error occurs
 */
export class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to monitoring service in production
        // For now, we just store it in state
        if (process.env.NODE_ENV === 'development') {
            // In development, log to console
            console.error('ErrorBoundary caught an error:', error, errorInfo)
        }
    }

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default error UI
            return (
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '400px',
                        padding: '2rem',
                        textAlign: 'center',
                    })}
                >
                    <h2
                        className={css({
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            color: 'red.600',
                        })}
                    >
                        Algo deu errado
                    </h2>
                    <p
                        className={css({
                            fontSize: '1rem',
                            color: 'gray.600',
                            marginBottom: '1.5rem',
                        })}
                    >
                        Ocorreu um erro inesperado. Por favor, recarregue a
                        página.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className={css({
                            padding: '0.75rem 1.5rem',
                            backgroundColor: 'blue.600',
                            color: 'white',
                            borderRadius: '0.375rem',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: 'blue.700',
                            },
                        })}
                    >
                        Recarregar página
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
