'use client'

import Map, { ScaleControl } from 'react-map-gl/mapbox'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import 'mapbox-gl/dist/mapbox-gl.css'

import {
    MapMarker,
    AuxToolbar,
    MapToolbar,
    TokenMissingState,
} from '@/components/Map'

import { establishments } from '@/utils/unidades.json'
import { useMapView } from '@/hooks/useMapView'
import { useMapContext } from '@/context/MapContext'
import { useSearchParams } from 'next/navigation'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { MapUserMarker } from './MapUserMarker'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
    longitude: -47.9292,
    latitude: -15.7801,
    zoom: 11,
}

export function MapComponent() {
    const param = useSearchParams()
    const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [showLabels, setShowLabels] = useState(true)
    const { selectedEstablishment, setSelectedEstablishment } = useMapContext()
    const { coords } = useUserGeolocation()
    const latitudeParam = param.get('lat')
    const longitudeParam = param.get('long')
    const fromSearchPage = param.get('from') === 'search-page'

    const parsedLat = latitudeParam ? parseFloat(latitudeParam) : undefined
    const parsedLon = longitudeParam ? parseFloat(longitudeParam) : undefined
    const urlHasValidCoords =
        typeof parsedLat === 'number' &&
        !isNaN(parsedLat) &&
        typeof parsedLon === 'number' &&
        !isNaN(parsedLon)

    const initialView = urlHasValidCoords
        ? {
              latitude: parsedLat as number,
              longitude: parsedLon as number,
              zoom: 15,
          }
        : INITIAL_VIEW_STATE

    const { viewState, setViewState } = useMapView(initialView)

    useEffect(() => {
        if (!urlHasValidCoords) return
        const newState = {
            latitude: parsedLat as number,
            longitude: parsedLon as number,
            zoom: 15,
        }
        setViewState(newState)
        if (mapRef.current) {
            const map = mapRef.current.getMap()
            map.once('load', () => {
                map.flyTo({
                    center: [newState.longitude, newState.latitude],
                    zoom: newState.zoom,
                    duration: 800,
                })
            })
            if (map.isStyleLoaded()) {
                map.flyTo({
                    center: [newState.longitude, newState.latitude],
                    zoom: newState.zoom,
                    duration: 800,
                })
            }
        }

        if (setSelectedEstablishment) {
            const targetLon = newState.longitude
            const targetLat = newState.latitude

            const distance = (aLon: number, aLat: number) =>
                Math.sqrt(
                    Math.pow(aLon - targetLon, 2) +
                        Math.pow(aLat - targetLat, 2)
                )

            let closest = null as (typeof establishments)[number] | null
            let closestDist = Number.POSITIVE_INFINITY
            for (const est of establishments) {
                if (
                    est.location &&
                    typeof est.location.longitude === 'number' &&
                    typeof est.location.latitude === 'number'
                ) {
                    const d = distance(
                        est.location.longitude,
                        est.location.latitude
                    )
                    if (d < closestDist) {
                        closestDist = d
                        closest = est
                    }
                }
            }

            if (closest && closestDist < 0.0007) {
                setSelectedEstablishment({
                    ...closest,
                    type: closest.type as 'ubs' | 'hospital' | 'upa',
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (selectedEstablishment && mapRef.current) {
            const map = mapRef.current.getMap()

            map.flyTo({
                center: [
                    selectedEstablishment.location.longitude,
                    selectedEstablishment.location.latitude,
                ],
                zoom: 16,
                duration: 1000,
            })
        }
    }, [selectedEstablishment])

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
                        {...viewState}
                        onMove={(evt) =>
                            setViewState({
                                longitude: evt.viewState.longitude,
                                latitude: evt.viewState.latitude,
                                zoom: evt.viewState.zoom,
                            })
                        }
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
                                    delay={fromSearchPage}
                                    mapZoom={viewState.zoom}
                                />
                            ))}
                        {coords && (
                            <MapUserMarker
                                userLocation={{
                                    longitude: coords.longitude,
                                    latitude: coords.latitude,
                                }}
                            />
                        )}
                        <ScaleControl />
                    </Map>
                </main>
            ) : (
                <TokenMissingState />
            )}
        </motion.section>
    )
}
