'use client'

import { GpsIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr'
import type { MapRef } from 'react-map-gl/mapbox'
import { Button } from '../Button'
import { toolbarContainer } from './styles'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { Tooltip } from '../Tooltip'

interface MapToolbarProps {
    mapRef: React.RefObject<MapRef | null>
}

export function MapToolbar({ mapRef }: MapToolbarProps) {
    const { coords, requestLocation } = useUserGeolocation({
        immediate: false,
        highAccuracy: true,
    })

    const handleZoomIn = () => {
        const map = mapRef.current?.getMap()
        if (map) {
            map.zoomIn()
        }
    }

    const handleZoomOut = () => {
        const map = mapRef.current?.getMap()
        if (map) {
            map.zoomOut()
        }
    }

    const handleShowUserLocation = () => {
        const map = mapRef.current?.getMap()
        if (coords && map) {
            // Centraliza o mapa na localização do usuário
            map.flyTo({
                center: [coords.longitude, coords.latitude],
                zoom: 15,
                essential: true,
            })
        } else {
            // Se não tiver coordenadas, solicita permissão de localização
            requestLocation()
        }
    }

    return (
        <div
            style={{
                backdropFilter: 'blur(10px)',
            }}
            className={toolbarContainer}
        >
            <Tooltip content="Mostrar sua localização">
                <Button
                    aria-label="Mostrar seu local"
                    variant="text"
                    iconButton
                    size="large"
                    onClick={handleShowUserLocation}
                >
                    <GpsIcon size={18} weight="bold" />
                </Button>
            </Tooltip>
            <Tooltip content="Aumentar zoom">
                <Button
                    variant="text"
                    iconButton
                    size="large"
                    onClick={handleZoomIn}
                >
                    <PlusIcon size={18} weight="bold" />
                </Button>
            </Tooltip>
            <Tooltip content="Diminuir zoom">
                <Button
                    variant="text"
                    iconButton
                    size="large"
                    onClick={handleZoomOut}
                >
                    <MinusIcon size={18} weight="bold" />
                </Button>
            </Tooltip>
        </div>
    )
}
