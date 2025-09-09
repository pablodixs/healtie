'use client'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { css } from '../../../styled-system/css'

import { establishments } from '@/utils/unidades.json'

const MAPBOX_TOKEN =
    'pk.eyJ1IjoicGFibG9kaXhzIiwiYSI6ImNsYW1zdmthczBpZTkzcHFyenFlYTA0c2MifQ.c0XGIUa0j5yFhX1m6Oypig'

export default function Page() {
    console.log('Total establishments:', establishments.length)
    console.log('First establishment:', establishments[0])

    return (
        <main className={mainContainer}>
            <Map
                initialViewState={{
                    longitude: -48.0,
                    latitude: -15.8,
                    zoom: 10,
                }}
                style={{
                    width: '100%',
                    height: '90dvh',
                    aspectRatio: '1/1',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
                mapStyle="mapbox://styles/pablodixs/cmdrihemn00qs01s2dlgp3lp7"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {establishments
                    .filter(
                        (establishment) =>
                            establishment.location &&
                            typeof establishment.location.longitude ===
                                'number' &&
                            typeof establishment.location.latitude ===
                                'number' &&
                            !isNaN(establishment.location.longitude) &&
                            !isNaN(establishment.location.latitude)
                    )
                    .map((establishment) => (
                        <Marker
                            key={establishment.cnes}
                            longitude={establishment.location.longitude}
                            latitude={establishment.location.latitude}
                            anchor="center"
                        >
                            <div
                                style={{
                                    backgroundColor: '#ef4444',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    cursor: 'pointer',
                                }}
                                title={establishment.name}
                            />
                        </Marker>
                    ))}
            </Map>
        </main>
    )
}

const mainContainer = css({
    paddingRight: '1rem',
    paddingLeft: '1rem',
    paddingTop: '1rem',
    width: '100%',
    minHeight: '90dvh',
})
