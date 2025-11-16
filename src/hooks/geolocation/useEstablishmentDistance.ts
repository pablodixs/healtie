'use client'

import { useMemo } from 'react'
import { useUserGeolocation } from './useUserGeolocation'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import { Coordinates } from '@/interfaces/EstablishmentAPIResponse'

interface EstablishmentCoords {
    latitude: number
    longitude: number
}

interface UseEstablishmentDistanceOptions {
    /**
     * Coordenadas do estabelecimento
     */
    establishmentCoords: Coordinates | null | undefined
    /**
     * Se true, retorna a distância formatada (ex: "1.5 km" ou "500 m")
     * Se false, retorna a distância em quilômetros como número
     * @default true
     */
    formatted?: boolean
}

interface UseEstablishmentDistanceReturn {
    /**
     * Distância calculada em quilômetros
     */
    distance: number | null
    /**
     * Distância formatada para exibição (ex: "1.5 km" ou "500 m")
     */
    formattedDistance: string | null
    /**
     * Indica se a localização do usuário está disponível
     */
    hasUserLocation: boolean
    /**
     * Indica se a localização do usuário está sendo carregada
     */
    isLoadingUserLocation: boolean
    /**
     * Coordenadas do usuário
     */
    userCoords: Coordinates | null
}

/**
 * Hook para calcular a distância entre o usuário e um estabelecimento
 *
 * @example
 * ```tsx
 * const { distance, formattedDistance, hasUserLocation } = useEstablishmentDistance({
 *   establishmentCoords: {
 *     latitude: -23.5505,
 *     longitude: -46.6333
 *   }
 * })
 *
 * if (!hasUserLocation) {
 *   return <p>Localização não disponível</p>
 * }
 *
 * return <p>Distância: {formattedDistance}</p>
 * ```
 */
export function useEstablishmentDistance({
    coordinates,
    formatted = true,
}: UseEstablishmentDistanceOptions): UseEstablishmentDistanceReturn {
    const { coords, status } = useUserGeolocation()

    const hasUserLocation = !!coords
    const isLoadingUserLocation = status === 'requesting' || status === 'prompt'

    const distance = useMemo(() => {
        if (!coords || !establishmentCoords) {
            return null
        }

        return calculateDistance(
            coords.latitude,
            coords.longitude,
            establishmentCoords.latitude,
            establishmentCoords.longitude
        )
    }, [coords, establishmentCoords])

    const formattedDistance = useMemo(() => {
        if (distance === null) {
            return null
        }

        return formatted ? formatDistance(distance) : `${distance} km`
    }, [distance, formatted])

    return {
        distance,
        formattedDistance,
        hasUserLocation,
        isLoadingUserLocation,
        userCoords: coords,
    }
}
