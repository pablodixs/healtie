'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'selected_city'

function readCity(): string | null {
    if (typeof window === 'undefined') return null
    try {
        const value = localStorage.getItem(STORAGE_KEY)
        return value
    } catch (error) {
        console.error('Error retrieving selected city:', error)
        return null
    }
}

function writeCity(city: string | null) {
    if (typeof window === 'undefined') return
    try {
        if (city) {
            localStorage.setItem(STORAGE_KEY, city)
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    } catch (error) {
        console.error('Error saving selected city:', error)
    }
}

export function useSelectedCity() {
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        setSelectedCity(readCity())
        setIsReady(true)

        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                setSelectedCity(e.newValue)
            }
        }

        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const setCity = useCallback((city: string | null) => {
        writeCity(city)
        setSelectedCity(city)
    }, [])

    const clearCity = useCallback(() => {
        writeCity(null)
        setSelectedCity(null)
    }, [])

    return {
        selectedCity,
        setCity,
        clearCity,
        isReady,
        hasSelectedCity: selectedCity !== null,
    }
}
