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
        if (immediate && !watch) {
            requestLocation()
        }
    }, [immediate, watch, requestLocation])

    return context
}
