'use client'

import { useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useUserGeolocationContext } from '@/context/UserGeolocationContext'

type GeoStatus =
    | 'idle'
    | 'unavailable'
    | 'prompt'
    | 'requesting'
    | 'granted'
    | 'denied'
    | 'error'

export type UseUserGeolocationOptions = {
    // If true, continuously watch position changes, otherwise single read
    watch?: boolean
    // Request high-accuracy positioning where possible (NOTE: handled globally by provider)
    highAccuracy?: boolean
    // Maximum age of a cached position that is acceptable (NOTE: handled globally by provider)
    maximumAge?: number
    // Maximum time (ms) allowed to attempt obtaining position (NOTE: handled globally by provider)
    timeout?: number
    // If false, do not automatically request on mount; call requestLocation/startWatching manually
    immediate?: boolean
}

export type UseUserGeolocationReturn = {
    userCurrentPosition: GeolocationPosition | null
    coords: GeolocationCoordinates | null
    status: GeoStatus
    permission: PermissionState | 'unknown'
    isSupported: boolean
    error: GeolocationPositionError | Error | null
    requestLocation: () => void
    startWatching: () => void
    stopWatching: () => void
    userDidAllowLocation: boolean | null
    setUserDidAllowLocation: Dispatch<SetStateAction<boolean | null>>
    location: string | null
    isLoadingLocation: boolean
}

/**
 * useUserGeolocation
 * Enhanced geolocation hook with:
 * - Permission querying + change listener
 * - One-shot getCurrentPosition and optional watchPosition
 * - Configurable options (highAccuracy, timeout, maximumAge, immediate)
 * - Rich status + error reporting
 * - SSR safety and proper cleanup
 *
 * Backwards-compatible return fields: userCurrentPosition, userDidAllowLocation, setUserDidAllowLocation
 */
export function useUserGeolocation(
    options: UseUserGeolocationOptions = {}
): UseUserGeolocationReturn {
    const {
        watch = false,
        immediate = true,
    } = options

    const context = useUserGeolocationContext()
    const { startWatching, stopWatching, requestLocation } = context

    useEffect(() => {
        if (watch) {
            startWatching()
            return () => {
                stopWatching()
            }
        }
    }, [watch, startWatching, stopWatching])

    useEffect(() => {
        const fetchLocation = async () => {
            if (!coords) return

            const { latitude: lat, longitude: lng } = coords
            const cacheKey = `location_${lat.toFixed(4)}_${lng.toFixed(4)}`

            // Check localStorage cache first
            if (isBrowser) {
                try {
                    const cached = localStorage.getItem(cacheKey)
                    if (cached) {
                        const { location: cachedLocation, timestamp } =
                            JSON.parse(cached)
                        // Cache valid for 7 days
                        const isValid =
                            timestamp &&
                            Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000
                        if (isValid) {
                            setLocation(cachedLocation)
                            return
                        }
                        localStorage.removeItem(cacheKey)
                    }
                } catch {
                    // Ignore localStorage errors
                }
            }

            // Fetch from API if not cached
            setIsLoadingLocation(true)
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
                )
                const data = await res.json()
                const city =
                    data.address.city ||
                    data.address.town ||
                    data.address.village
                const state = data.address.state
                const locationString = `${city}, ${state}`

                setLocation(locationString)

                // Save to localStorage
                if (isBrowser) {
                    try {
                        localStorage.setItem(
                            cacheKey,
                            JSON.stringify({
                                location: locationString,
                                timestamp: Date.now(),
                            })
                        )
                    } catch {
                        // Ignore localStorage errors
                    }
                }
    } catch {
        // Silently handle reverse geocoding errors
        // The location string will remain null
    } finally {
                setIsLoadingLocation(false)
            }
        }
    }, [immediate, watch, requestLocation])

    return context
}
