'use client'

import { useEstablishmentDistance } from '@/hooks/geolocation/useEstablishmentDistance'

interface EstablishmentDistanceLabelProps {
    establishmentCoords: {
        latitude: number
        longitude: number
    }
}

export function EstablishmentDistanceLabel({
    establishmentCoords,
}: EstablishmentDistanceLabelProps) {
    const { formattedDistance, hasUserLocation } = useEstablishmentDistance({
        establishmentCoords,
    })

    if (!hasUserLocation || !formattedDistance) return null

    return <p>{formattedDistance}</p>
}
