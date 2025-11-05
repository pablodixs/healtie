import { Marker } from 'react-map-gl/mapbox'
import { css } from '../../../styled-system/css'

interface UserMarkerProps {
    userLocation: {
        longitude: number
        latitude: number
    }
}

export function MapUserMarker({ userLocation }: UserMarkerProps) {
    return (
        <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
        >
            <div className={markerContainer}>
                <div></div>
            </div>
        </Marker>
    )
}

const markerContainer = css({
    backgroundColor: '#fff',
    borderRadius: '50%',
    aspectRatio: '1 / 1',
    width: '1.75rem',
    height: '1.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
    position: 'relative',

    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '50%',
        backgroundColor: '#70e000',
        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        zIndex: -1,
    },

    '& div': {
        backgroundColor: '#70e000',
        borderRadius: '50%',
        aspectRatio: '1 / 1',
        width: '1.25rem',
        height: '1.25rem',
        animation: 'running',
    },
})
