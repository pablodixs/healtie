import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from './useDebounce'

interface MapViewState {
    longitude: number
    latitude: number
    zoom: number
}

interface UseMapViewReturn {
    viewState: MapViewState
    setViewState: (viewState: MapViewState) => void
    centerOnLocation: (
        longitude: number,
        latitude: number,
        zoom?: number
    ) => void
}

const LAST_LOCATION_KEY = 'healtie_last_map_location'

const getLastLocationFromStorage = (): MapViewState | null => {
    if (typeof window === 'undefined') return null

    try {
        const stored = localStorage.getItem(LAST_LOCATION_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            // Validar se os dados estão no formato correto
            if (
                typeof parsed.longitude === 'number' &&
                typeof parsed.latitude === 'number' &&
                typeof parsed.zoom === 'number'
            ) {
                return parsed
            }
        }
    } catch {
        // Silently handle localStorage errors
    }

    return null
}

const saveLocationToStorage = (viewState: MapViewState): void => {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(viewState))
    } catch {
        // Silently handle localStorage errors (quota exceeded, etc.)
    }
}

export function useMapView(initialViewState: MapViewState): UseMapViewReturn {
    // Tentar carregar a última localização salva, senão usar a inicial
    const getInitialState = (): MapViewState => {
        const lastLocation = getLastLocationFromStorage()
        return lastLocation || initialViewState
    }

    const [viewState, setViewState] = useState<MapViewState>(getInitialState)

    const debouncedViewState = useDebounce(viewState, 300)

    // Salvar automaticamente quando o viewState mudar
    useEffect(() => {
        saveLocationToStorage(debouncedViewState)
    }, [debouncedViewState])

    // Função personalizada para atualizar o viewState
    const updateViewState = useCallback((newViewState: MapViewState) => {
        setViewState(newViewState)
    }, [])

    const centerOnLocation = useCallback(
        (longitude: number, latitude: number, zoom: number = 14) => {
            const newViewState = {
                longitude,
                latitude,
                zoom,
            }
            setViewState(newViewState)
        },
        []
    )

    return {
        viewState,
        setViewState: updateViewState,
        centerOnLocation,
    }
}
