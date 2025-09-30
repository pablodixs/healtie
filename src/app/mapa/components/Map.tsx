'use client'

import { motion } from 'motion/react'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

import { establishments } from '@/utils/unidades.json'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export function MapComponent() {
    return (
        <motion.section
            style={{
                width: '100%',
                height: '100%',
            }}
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.45 }}
        >
            <Map
                initialViewState={{
                    longitude: -48.0,
                    latitude: -15.8,
                    zoom: 11,
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
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
        </motion.section>
    )
}
