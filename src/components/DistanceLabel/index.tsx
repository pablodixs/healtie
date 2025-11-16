'use client'

import { useEstablishmentDistance } from '@/hooks/geolocation/useEstablishmentDistance'

interface EstablishmentDistanceLabelProps {
    latitude: number
    longitude: number
}

export function EstablishmentDistanceLabel({
    latitude,
    longitude,
}: EstablishmentDistanceLabelProps) {
    const establishmentCoords = { latitude, longitude }
    const { formattedDistance, hasUserLocation } = useEstablishmentDistance({
        establishmentCoords,
    })

    if (!hasUserLocation || !formattedDistance) return null

    return <p>{formattedDistance}</p>
}
