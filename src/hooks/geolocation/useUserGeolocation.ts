'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type GeoStatus =
    | 'idle' // Hook mounted but not requesting yet
    | 'unavailable' // Geolocation API not supported
    | 'prompt' // Permission is prompt, awaiting user action
    | 'requesting' // Request in-flight
    | 'granted' // We have at least one position and permission is granted
    | 'denied' // Permission denied by the user or browser
    | 'error' // Other errors (timeout, position unavailable, etc.)

export type UseUserGeolocationOptions = {
    // If true, continuously watch position changes, otherwise single read
    watch?: boolean
    // Request high-accuracy positioning where possible
    highAccuracy?: boolean
    // Maximum age of a cached position that is acceptable
    maximumAge?: number
    // Maximum time (ms) allowed to attempt obtaining position
    timeout?: number
    // If false, do not automatically request on mount; call requestLocation/startWatching manually
    immediate?: boolean
}

export type UseUserGeolocationReturn = {
    // Latest GeolocationPosition
    userCurrentPosition: GeolocationPosition | null
    // Convenience alias for position?.coords
    coords: GeolocationCoordinates | null
    // Overall status
    status: GeoStatus
    // Permission state when detectable
    permission: PermissionState | 'unknown'
    // Whether the API is available in this browser
    isSupported: boolean
    // Last error encountered (if any)
    error: GeolocationPositionError | Error | null
    // Manually trigger a one-shot location request
    requestLocation: () => void
    // Start/stop watching position changes (no-op if already in that state)
    startWatching: () => void
    stopWatching: () => void
    // Backwards-compatibility fields
    userDidAllowLocation: boolean | null
    setUserDidAllowLocation: Dispatch<SetStateAction<boolean | null>>
    // Location string (city, state)
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
        highAccuracy = true,
        maximumAge = 0,
        timeout = 15_000,
        immediate = true,
    } = options

    const isBrowser = typeof window !== 'undefined'
    const isSupported = !!(isBrowser && 'geolocation' in navigator)

    const [status, setStatus] = useState<GeoStatus>(
        isSupported ? 'idle' : 'unavailable'
    )
    const [permission, setPermission] = useState<PermissionState | 'unknown'>(
        'unknown'
    )
    const [error, setError] = useState<GeolocationPositionError | Error | null>(
        null
    )
    const [userCurrentPosition, setUserCurrentPosition] =
        useState<GeolocationPosition | null>(null)
    // Back-compat: derived but still keep a state + expose setter
    const [userDidAllowLocation, setUserDidAllowLocation] = useState<
        boolean | null
    >(null)
    const [location, setLocation] = useState<string | null>(null)
    const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false)

    const watchIdRef = useRef<number | null>(null)
    const mountedRef = useRef<boolean>(false)
    const permissionStatusRef = useRef<PermissionStatus | null>(null)

    // Derive coords for convenience
    const coords = useMemo(
        () => userCurrentPosition?.coords ?? null,
        [userCurrentPosition]
    )

    // Keep userDidAllowLocation roughly aligned with status/permission
    useEffect(() => {
        if (!isSupported) {
            setUserDidAllowLocation(false)
            return
        }
        if (permission === 'granted') {
            setUserDidAllowLocation(true)
        } else if (permission === 'denied') {
            setUserDidAllowLocation(false)
        } else if (status === 'denied') {
            setUserDidAllowLocation(false)
        } else if (status === 'granted') {
            setUserDidAllowLocation(true)
        } else if (status === 'prompt' || status === 'requesting') {
            setUserDidAllowLocation(null)
        }
    }, [isSupported, permission, status])

    // Query permission when available and subscribe to changes
    useEffect(() => {
        if (!isSupported || !('permissions' in navigator)) return
        let cancelled = false
        ;(async () => {
            try {
                type NavigatorWithPermissions = Navigator & {
                    permissions: Permissions
                }
                const statusObj = await (
                    navigator as NavigatorWithPermissions
                ).permissions.query({ name: 'geolocation' })
                if (cancelled) return
                permissionStatusRef.current = statusObj
                setPermission(statusObj.state as PermissionState)
                // Reflect status to a friendly label when idle
                if (status === 'idle') {
                    if (statusObj.state === 'prompt') setStatus('prompt')
                    else if (statusObj.state === 'granted') setStatus('granted')
                    else if (statusObj.state === 'denied') setStatus('denied')
                }
                statusObj.onchange = () => {
                    const newState = statusObj.state as PermissionState
                    setPermission(newState)
                    if (newState === 'granted') setStatus('granted')
                    else if (newState === 'denied') setStatus('denied')
                    else setStatus('prompt')
                }
            } catch {
                // Some browsers throw for permissions.query; leave as 'unknown'
            }
        })()
        return () => {
            cancelled = true
            if (permissionStatusRef.current) {
                // Cannot remove onchange listener directly; assign null
                try {
                    permissionStatusRef.current.onchange = null
                } catch {}
                permissionStatusRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupported])

    const clearWatch = useCallback(() => {
        if (!isSupported) return
        if (watchIdRef.current != null) {
            try {
                navigator.geolocation.clearWatch(watchIdRef.current)
            } catch {}
            watchIdRef.current = null
        }
    }, [isSupported])

    const handleSuccess = useCallback((pos: GeolocationPosition) => {
        if (!mountedRef.current) return
        setUserCurrentPosition(pos)
        setError(null)
        setStatus('granted')
    }, [])

    const handleError = useCallback((err: GeolocationPositionError) => {
        if (!mountedRef.current) return
        setError(err)
        // Code 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
        if (err.code === 1) setStatus('denied')
        else setStatus('error')
    }, [])

    const geoOptions = useMemo<PositionOptions>(
        () => ({
            enableHighAccuracy: highAccuracy,
            maximumAge,
            timeout,
        }),
        [highAccuracy, maximumAge, timeout]
    )

    const requestLocation = useCallback(() => {
        if (!isSupported) {
            setStatus('unavailable')
            return
        }
        setStatus((s) => (s === 'granted' ? s : 'requesting'))
        try {
            navigator.geolocation.getCurrentPosition(
                handleSuccess,
                handleError,
                geoOptions
            )
        } catch (e) {
            setError(e as Error)
            setStatus('unavailable')
        }
    }, [geoOptions, handleError, handleSuccess, isSupported])

    const startWatching = useCallback(() => {
        if (!isSupported) {
            setStatus('unavailable')
            return
        }
        if (watchIdRef.current != null) return // already watching
        setStatus((s) => (s === 'granted' ? s : 'requesting'))
        try {
            const id = navigator.geolocation.watchPosition(
                handleSuccess,
                handleError,
                geoOptions
            )
            watchIdRef.current = id
        } catch (e) {
            setError(e as Error)
            setStatus('unavailable')
        }
    }, [geoOptions, handleError, handleSuccess, isSupported])

    const stopWatching = useCallback(() => {
        clearWatch()
    }, [clearWatch])

    // Lifecycle
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
            clearWatch()
        }
    }, [clearWatch])

    // Immediate behavior on mount according to options
    useEffect(() => {
        if (!isSupported) return
        if (!immediate) return
        if (watch) startWatching()
        else requestLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupported, immediate, watch])

    // Reverse geocoding with localStorage cache
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
            } catch (err) {
                console.error('Error fetching location:', err)
            } finally {
                setIsLoadingLocation(false)
            }
        }

        fetchLocation()
    }, [coords, isBrowser])

    return {
        userCurrentPosition,
        coords,
        status,
        permission,
        isSupported,
        error,
        requestLocation,
        startWatching,
        stopWatching,
        // Back-compat
        userDidAllowLocation,
        setUserDidAllowLocation,
        // Location string
        location,
        isLoadingLocation,
    }
}
