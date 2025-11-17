'use client'

import Map, { ScaleControl } from 'react-map-gl/mapbox'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import 'mapbox-gl/dist/mapbox-gl.css'

import { MapMarker, MapToolbar, TokenMissingState } from '@/components/Map'

import { useMapView } from '@/hooks/useMapView'
import { useMapContext } from '@/context/MapContext'
import { useSearchParams } from 'next/navigation'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { MapUserMarker } from './MapUserMarker'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { EstablishmentPointResponse } from '@/interfaces/Establishment'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
    longitude: -47.9292,
    latitude: -15.7801,
    zoom: 11,
}

interface BoundingBox {
    minLat: number
    minLon: number
    maxLat: number
    maxLon: number
}

export function MapComponent() {
    const param = useSearchParams()
    const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const { selectedEstablishment } = useMapContext()
    const { coords } = useUserGeolocation()
    const latitudeParam = param.get('lat')
    const longitudeParam = param.get('long')

    const parsedLat = latitudeParam ? parseFloat(latitudeParam) : undefined
    const parsedLon = longitudeParam ? parseFloat(longitudeParam) : undefined
    const urlHasValidCoords =
        typeof parsedLat === 'number' &&
        !isNaN(parsedLat) &&
        typeof parsedLon === 'number' &&
        !isNaN(parsedLon)

    const initialView = useMemo(() => {
        if (urlHasValidCoords) {
            return {
                latitude: parsedLat as number,
                longitude: parsedLon as number,
                zoom: 15,
            }
        }

        return INITIAL_VIEW_STATE
    }, [urlHasValidCoords, parsedLat, parsedLon])

    const [bbox, setBbox] = useState<BoundingBox | null>(null)
    const [cachedEstablishments, setCachedEstablishments] = useState<
        EstablishmentPointResponse[]
    >([])

    const { data } = useSWR<EstablishmentPointResponse[]>(
        bbox
            ? `https://healtie.app/v1/establishment/bbox?minLat=${bbox.minLat}&maxLat=${bbox.maxLat}&minLong=${bbox.minLon}&maxLong=${bbox.maxLon}`
            : null,
        fetcher,
        { revalidateOnFocus: false, keepPreviousData: true }
    )

    const { viewState, setViewState } = useMapView(initialView)

    const handleMove = useCallback(
        (evt: {
            viewState: { longitude: number; latitude: number; zoom: number }
        }) => {
            setViewState({
                longitude: evt.viewState.longitude,
                latitude: evt.viewState.latitude,
                zoom: evt.viewState.zoom,
            })
        },
        [setViewState]
    )

    const handleViewportSync = useCallback(() => {
        const mapInstance = mapRef.current?.getMap?.()
        if (!mapInstance) return

        const newBBox = getBoundingBox(mapInstance)
        if (!newBBox) return

        setBbox(newBBox)
    }, [])

    useEffect(() => {
        if (!bbox) return

        setCachedEstablishments((previous) => {
            const filtered = previous.filter((establishment) =>
                establishment?.geolocation
                    ? isInsideBoundingBox(establishment.geolocation, bbox)
                    : false
            )

            if (!data) return filtered

            const deduped = new globalThis.Map<
                number,
                EstablishmentPointResponse
            >(
                filtered.map((establishment) => [
                    establishment.cnes,
                    establishment,
                ])
            )

            data.forEach((establishment) => {
                if (!establishment?.geolocation) return
                if (!isInsideBoundingBox(establishment.geolocation, bbox))
                    return
                deduped.set(establishment.cnes, establishment)
            })

            return Array.from(deduped.values())
        })
    }, [bbox, data])

    useEffect(() => {
        if (!selectedEstablishment?.geolocation || !mapRef.current) return

        const map = mapRef.current.getMap()

        map.flyTo({
            center: [
                selectedEstablishment.geolocation.longitude,
                selectedEstablishment.geolocation.latitude,
            ],
            zoom: 16,
            duration: 1000,
        })
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
                    <MapToolbar mapRef={mapRef} />
                    <Map
                        ref={mapRef}
                        {...viewState}
                        onMove={handleMove}
                        style={{
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                        }}
                        onMoveEnd={handleViewportSync}
                        onLoad={handleViewportSync}
                        mapStyle="mapbox://styles/pablodixs/cmdrihemn00qs01s2dlgp3lp7"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        {cachedEstablishments &&
                            cachedEstablishments.map(
                                (e: EstablishmentPointResponse) => {
                                    return (
                                        <MapMarker
                                            key={e.cnes}
                                            establishmentProps={e}
                                            mapZoom={viewState.zoom}
                                        />
                                    )
                                }
                            )}
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBoundingBox(map: any): BoundingBox | null {
    if (!map) return null

    const bounds = map.getBounds()
    return {
        minLat: bounds.getSouth(),
        minLon: bounds.getWest(),
        maxLat: bounds.getNorth(),
        maxLon: bounds.getEast(),
    }
}

function isInsideBoundingBox(
    point: { latitude: number; longitude: number },
    bbox: BoundingBox
): boolean {
    const { minLon, minLat, maxLon, maxLat } = bbox

    return (
        point.longitude >= minLon &&
        point.longitude <= maxLon &&
        point.latitude >= minLat &&
        point.latitude <= maxLat
    )
}
