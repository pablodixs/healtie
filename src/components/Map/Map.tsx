'use client'

import Map, { ScaleControl } from 'react-map-gl/mapbox'
import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import 'mapbox-gl/dist/mapbox-gl.css'

import {
    MapMarker,
    AuxToolbar,
    MapToolbar,
    TokenMissingState,
} from '@/components/Map'

import { establishments } from '@/utils/unidades.json'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
    longitude: -47.9292,
    latitude: -15.7801,
    zoom: 11,
}

export function MapComponent() {
    const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [showLabels, setShowLabels] = useState(true)

    return (
        <motion.section
            style={{
                width: '100%',
                height: '100%',
            }}
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5 }}
        >
            {MAPBOX_TOKEN ? (
                <main
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <AuxToolbar
                        showLabels={showLabels}
                        onToggleLabels={setShowLabels}
                    />
                    <MapToolbar mapRef={mapRef} />
                    <Map
                        ref={mapRef}
                        initialViewState={INITIAL_VIEW_STATE}
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
                                <MapMarker
                                    key={establishment.cnes}
                                    longitude={establishment.location.longitude}
                                    latitude={establishment.location.latitude}
                                    establishmentProps={{
                                        ...establishment,
                                        type: establishment.type as
                                            | 'ubs'
                                            | 'hospital'
                                            | 'upa',
                                    }}
                                    showLabel={showLabels}
                                />
                            ))}
                        <ScaleControl />
                    </Map>
                </main>
            ) : (
                <TokenMissingState />
            )}
        </motion.section>
    )
}
