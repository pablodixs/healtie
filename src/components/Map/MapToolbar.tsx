'use client'

import { GpsIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '../Button'
import { toolbarContainer } from './styles'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { Tooltip } from '../Tooltip'

interface MapToolbarProps {
    mapRef: React.RefObject<mapboxgl.Map | null>
}

export function MapToolbar({ mapRef }: MapToolbarProps) {
    const { coords, requestLocation } = useUserGeolocation({
        immediate: false,
        highAccuracy: true,
    })

    const handleZoomIn = () => {
        if (mapRef.current) {
            mapRef.current.zoomIn()
        }
    }

    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.zoomOut()
        }
    }

    const handleShowUserLocation = () => {
        if (coords && mapRef.current) {
            // Centraliza o mapa na localização do usuário
            mapRef.current.flyTo({
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
