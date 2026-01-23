'use client'

import { useRouter } from 'next/navigation'
import { Marker } from 'react-map-gl/mapbox'
import { AnimatePresence, motion } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react'

import { EstablishmentPointResponse } from '@/interfaces/Establishment'

import { labelStyles, markerContainer } from './maker.styles'
import { useMapContext } from '@/context/MapContext'
import { Tooltip } from '../Tooltip'
import { useState, memo } from 'react'

interface MapMarkerProps {
    establishmentProps: EstablishmentPointResponse
    mapZoom: number
}

export const MapMarker = memo(
    function MapMarker({ establishmentProps, mapZoom }: MapMarkerProps) {
        const router = useRouter()
        const [expanded] = useState(false)
        const { setSelectedEstablishment, selectedEstablishment } =
            useMapContext()

        if (!establishmentProps) return null

        return (
            <Marker
                longitude={establishmentProps.geolocation.longitude}
                latitude={establishmentProps.geolocation.latitude}
                anchor="center"
                onClick={() => {
                    router.push(
                        `/mapa?establishment=${establishmentProps.cnes}`
                    )
                    setSelectedEstablishment(establishmentProps)
                }}
            >
                <AnimatePresence mode="wait">
                    {selectedEstablishment?.cnes === establishmentProps.cnes ||
                    expanded ? (
                        <div
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <motion.div
                                initial={{
                                    scale: 0,
                                }}
                                animate={{
                                    scale: [0, 1.5],
                                    rotate: [0, 10, -10, 5, 0],
                                    transformOrigin: 'center bottom',
                                }}
                                exit={{
                                    scale: 0,
                                }}
                                className={markerContainer({
                                    type: establishmentProps.type as
                                        | 'Hospital Geral'
                                        | 'Unidade Básica de Saúde'
                                        | 'Unidade de Pronto Atendimento',
                                })}
                            >
                                {establishmentProps.type ===
                                    'Hospital Geral' && (
                                    <HospitalIcon weight="fill" />
                                )}
                                {establishmentProps.type ===
                                    'Unidade Básica de Saúde' && (
                                    <FirstAidIcon weight="fill" />
                                )}
                                {establishmentProps.type ===
                                    'Unidade de Pronto Atendimento' && (
                                    <AmbulanceIcon weight="fill" />
                                )}
                            </motion.div>
                            <AnimatePresence>
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={labelStyles}
                                >
                                    {establishmentProps.name}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Tooltip
                            content={establishmentProps.name}
                            isVisible={mapZoom < 12 ? undefined : false}
                        >
                            <motion.div
                                initial={{
                                    scale: 0,
                                    transformOrigin: 'bottom center',
                                }}
                                animate={{
                                    scale: 1,
                                    transformOrigin: 'bottom center',
                                }}
                                exit={{
                                    scale: 0,
                                    transformOrigin: 'bottom center',
                                }}
                                transition={{ duration: 0.3, type: 'spring' }}
                                className={markerContainer({
                                    type: establishmentProps.type as
                                        | 'Hospital Geral'
                                        | 'Unidade Básica de Saúde'
                                        | 'Unidade de Pronto Atendimento',
                                    compacted: mapZoom <= 12 ? true : false,
                                })}
                            >
                                {establishmentProps.type ===
                                    'Hospital Geral' && (
                                    <HospitalIcon weight="fill" />
                                )}
                                {establishmentProps.type ===
                                    'Unidade Básica de Saúde' && (
                                    <FirstAidIcon weight="fill" />
                                )}
                                {establishmentProps.type ===
                                    'Unidade de Pronto Atendimento' && (
                                    <AmbulanceIcon weight="fill" />
                                )}
                                <AnimatePresence>
                                    {mapZoom > 12 && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className={labelStyles}
                                        >
                                            {establishmentProps.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Tooltip>
                    )}
                </AnimatePresence>
            </Marker>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.establishmentProps !== nextProps.establishmentProps) {
            return false
        }

        // We only need to re-render if the zoom level crosses the threshold that changes the UI.
        // The thresholds used in the component are < 12 (visibility) and <= 12 (compacted).
        const prevCompact = prevProps.mapZoom <= 12
        const nextCompact = nextProps.mapZoom <= 12
        const prevVisible = prevProps.mapZoom < 12
        const nextVisible = nextProps.mapZoom < 12

        return prevCompact === nextCompact && prevVisible === nextVisible
    }
)
