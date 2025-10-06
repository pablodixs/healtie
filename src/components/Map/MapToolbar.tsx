import { GpsIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '../Button'
import { toolbarContainer } from './styles'

interface MapToolbarProps {
    mapRef: React.RefObject<mapboxgl.Map | null>
}

export function MapToolbar({ mapRef }: MapToolbarProps) {
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

    return (
        <div
            style={{
                backdropFilter: 'blur(10px)',
            }}
            className={toolbarContainer}
        >
            <Button variant="text" iconButton size="large">
                <GpsIcon size={18} weight="bold" />
            </Button>
            <Button
                variant="text"
                iconButton
                size="large"
                onClick={handleZoomIn}
            >
                <PlusIcon size={18} weight="bold" />
            </Button>
            <Button
                variant="text"
                iconButton
                size="large"
                onClick={handleZoomOut}
            >
                <MinusIcon size={18} weight="bold" />
            </Button>
        </div>
    )
}
