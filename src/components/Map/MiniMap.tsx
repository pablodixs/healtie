import Map from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapMarker } from './MapMarker'
import { css } from '../../../styled-system/css'
import { Establishment } from '@/interfaces/Establishment'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const mapContainerStyle = {
    height: '200px',
    width: '100%',
    aspectRatio: '1/1',
    flex: 1,
} as const

interface CompactMapProps {
    data: Establishment
}

export function MiniMap({ data }: CompactMapProps) {
    return (
        <div className={mapContainer}>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                style={mapContainerStyle}
                viewState={{
                    longitude: data.location.longitude,
                    latitude: data.location.latitude,
                    zoom: 17,
                    bearing: 0,
                    pitch: 0,
                    width: 400,
                    height: 200,
                    padding: { top: 0, bottom: 0, left: 0, right: 0 },
                }}
                cursor="default"
                mapStyle="mapbox://styles/pablodixs/cmdrihemn00qs01s2dlgp3lp7"
            >
                <MapMarker
                    latitude={data.location.latitude}
                    longitude={data.location.longitude}
                    establishmentProps={data}
                    expanded
                    delay
                />
            </Map>
        </div>
    )
}

const mapContainer = css({
    height: '200px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '12px',
    mb: '1.5rem',
})
