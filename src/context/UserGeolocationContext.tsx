'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

type GeoStatus =
    | 'idle'
    | 'unavailable'
    | 'prompt'
    | 'requesting'
    | 'granted'
    | 'denied'
    | 'error'

export type UserGeolocationContextValue = {
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

const UserGeolocationContext = createContext<UserGeolocationContextValue | null>(
    null
)

export function useUserGeolocationContext() {
    const context = useContext(UserGeolocationContext)
    if (!context) {
        throw new Error(
            'useUserGeolocationContext must be used within UserGeolocationProvider'
        )
    }
    return context
}

export function UserGeolocationProvider({ children }: { children: ReactNode }) {
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
    const [userDidAllowLocation, setUserDidAllowLocation] = useState<
        boolean | null
    >(null)
    const [location, setLocation] = useState<string | null>(null)
    const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false)

    const watchIdRef = useRef<number | null>(null)
    const permissionStatusRef = useRef<PermissionStatus | null>(null)
    const watchersCountRef = useRef<number>(0)
    // To safely update state only when mounted
    const mountedRef = useRef<boolean>(false)

    const coords = useMemo(
        () => userCurrentPosition?.coords ?? null,
        [userCurrentPosition]
    )

    // Standard options for the provider
    const highAccuracy = true
    const maximumAge = 0
    const timeout = 15_000

    const geoOptions = useMemo<PositionOptions>(
        () => ({
            enableHighAccuracy: highAccuracy,
            maximumAge,
            timeout,
        }),
        [highAccuracy, maximumAge, timeout]
    )

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
                // Ignore
            }
        })()
        return () => {
            cancelled = true
            if (permissionStatusRef.current) {
                try {
                    permissionStatusRef.current.onchange = null
                } catch {}
                permissionStatusRef.current = null
            }
        }
    }, [isSupported, status])

    const handleSuccess = useCallback((pos: GeolocationPosition) => {
        if (!mountedRef.current) return
        setUserCurrentPosition(pos)
        setError(null)
        setStatus('granted')
    }, [])

    const handleError = useCallback((err: GeolocationPositionError) => {
        if (!mountedRef.current) return
        setError(err)
        if (err.code === 1) setStatus('denied')
        else setStatus('error')
    }, [])

    const requestLocation = useCallback(() => {
        if (!isSupported) {
            setStatus('unavailable')
            return
        }
        // If we already have a position or are watching, we might not need to re-request immediately
        // unless we want to force update. For now, let's allow re-requesting if called explicitly.
        // But to avoid redundant calls from multiple components mounting, we should check status.

        // If status is 'requesting', we are already fetching.
        if (status === 'requesting') return

        // If we have a position and it's fresh enough (logic needed?), we could skip.
        // But since requestLocation is explicit, let's proceed but maybe debounce or just let it be.
        // However, standard use is "on mount".
        // If status is 'granted', we have a location.
        if (status === 'granted') return

        setStatus('requesting')
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
    }, [geoOptions, handleError, handleSuccess, isSupported, status])

    const clearNativeWatch = useCallback(() => {
        if (watchIdRef.current != null) {
            try {
                navigator.geolocation.clearWatch(watchIdRef.current)
            } catch {}
            watchIdRef.current = null
        }
    }, [])

    const startNativeWatch = useCallback(() => {
        if (!isSupported) {
            setStatus('unavailable')
            return
        }
        if (watchIdRef.current != null) return
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

    const startWatching = useCallback(() => {
        watchersCountRef.current += 1
        if (watchersCountRef.current === 1) {
            startNativeWatch()
        }
    }, [startNativeWatch])

    const stopWatching = useCallback(() => {
        if (watchersCountRef.current > 0) {
            watchersCountRef.current -= 1
        }
        if (watchersCountRef.current === 0) {
            clearNativeWatch()
        }
    }, [clearNativeWatch])

    // Lifecycle
    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
            clearNativeWatch()
        }
    }, [clearNativeWatch])

    // Reverse geocoding
    useEffect(() => {
        const fetchLocation = async () => {
            if (!coords) return

            const { latitude: lat, longitude: lng } = coords
            const cacheKey = `location_${lat.toFixed(4)}_${lng.toFixed(4)}`

            if (isBrowser) {
                try {
                    const cached = localStorage.getItem(cacheKey)
                    if (cached) {
                        const { location: cachedLocation, timestamp } =
                            JSON.parse(cached)
                        const isValid =
                            timestamp &&
                            Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000
                        if (isValid) {
                            setLocation(cachedLocation)
                            return
                        }
                        localStorage.removeItem(cacheKey)
                    }
                } catch {}
            }

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

                if (isBrowser) {
                    try {
                        localStorage.setItem(
                            cacheKey,
                            JSON.stringify({
                                location: locationString,
                                timestamp: Date.now(),
                            })
                        )
                    } catch {}
                }
            } catch (err) {
                console.error('Error fetching location:', err)
            } finally {
                setIsLoadingLocation(false)
            }
        }

        fetchLocation()
    }, [coords, isBrowser])

    const value = useMemo(
        () => ({
            userCurrentPosition,
            coords,
            status,
            permission,
            isSupported,
            error,
            requestLocation,
            startWatching,
            stopWatching,
            userDidAllowLocation,
            setUserDidAllowLocation,
            location,
            isLoadingLocation,
        }),
        [
            userCurrentPosition,
            coords,
            status,
            permission,
            isSupported,
            error,
            requestLocation,
            startWatching,
            stopWatching,
            userDidAllowLocation,
            setUserDidAllowLocation,
            location,
            isLoadingLocation,
        ]
    )

    return (
        <UserGeolocationContext.Provider value={value}>
            {children}
        </UserGeolocationContext.Provider>
    )
}
