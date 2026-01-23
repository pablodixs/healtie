'use client'

import { useCallback, useEffect, useState } from 'react'

export type CookiePreference = 'accepted' | 'rejected' | null

const STORAGE_KEY = 'cookies_preferences'

function readPreference(): CookiePreference {
    if (typeof window === 'undefined') return null
    try {
        const value = localStorage.getItem(STORAGE_KEY)
        return value === 'accepted' || value === 'rejected' ? value : null
    } catch {
        // Silently handle localStorage errors
        return null
    }
}

function writePreference(accepted: boolean) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, accepted ? 'accepted' : 'rejected')
    } catch {
        // Silently handle localStorage errors (quota exceeded, etc.)
    }
}

export function useCookiesPreferences() {
    const [preference, setPreference] = useState<CookiePreference>(null)
    const [isPreferenceReady, setIsPreferenceReady] = useState(false)

    useEffect(() => {
        setPreference(readPreference())
        setIsPreferenceReady(true)

        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY) {
                const next =
                    e.newValue === 'accepted' || e.newValue === 'rejected'
                        ? (e.newValue as 'accepted' | 'rejected')
                        : null
                setPreference(next)
            }
        }

        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const allowCookies = useCallback((accepted: boolean) => {
        writePreference(accepted)
        setPreference(accepted ? 'accepted' : 'rejected')
    }, [])

    return {
        allowCookies,
        cookiePreference: preference,
        hasSetPreference: preference !== null,
        isPreferenceReady,
    }
}
