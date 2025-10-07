'use client'

import { useRouter } from 'next/navigation'
import { Marker } from 'react-map-gl/mapbox'
import { AnimatePresence, motion } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react'

import { Establishment } from '@/interfaces/Establishment'

import { labelStyles, markerContainer } from './maker.styles'
import { useMapContext } from '@/context/MapContext'

interface MapMarkerProps {
    longitude: number
    latitude: number
    establishmentProps?: Establishment
    showLabel?: boolean
    delay?: boolean
    expanded?: boolean
}

export function MapMarker({
    longitude,
    latitude,
    establishmentProps,
    showLabel = true,
    delay = false,
    expanded = false,
}: MapMarkerProps) {
    const router = useRouter()
    const { setSelectedEstablishment, selectedEstablishment } = useMapContext()

    if (!establishmentProps) return null

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="center"
            onClick={() => {
                router.push(`/mapa?establishment=${establishmentProps.cnes}`)
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
                            transition={{ delay: delay ? 0.75 : 0 }}
                            className={markerContainer({
                                type: establishmentProps.abb as
                                    | 'HOSPITAL'
                                    | 'UBS'
                                    | 'UPA',
                            })}
                        >
                            {establishmentProps.abb === 'HOSPITAL' && (
                                <HospitalIcon weight="fill" />
                            )}
                            {establishmentProps.abb === 'UBS' && (
                                <FirstAidIcon weight="fill" />
                            )}
                            {establishmentProps.abb === 'UPA' && (
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
                    <motion.div
                        initial={{ scale: 0, transformOrigin: 'bottom center' }}
                        animate={{ scale: 1, transformOrigin: 'bottom center' }}
                        exit={{ scale: 0, transformOrigin: 'bottom center' }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className={markerContainer({
                            type: establishmentProps.abb as
                                | 'HOSPITAL'
                                | 'UBS'
                                | 'UPA',
                        })}
                    >
                        {establishmentProps.abb === 'HOSPITAL' && (
                            <HospitalIcon weight="fill" />
                        )}
                        {establishmentProps.abb === 'UBS' && (
                            <FirstAidIcon weight="fill" />
                        )}
                        {establishmentProps.abb === 'UPA' && (
                            <AmbulanceIcon weight="fill" />
                        )}
                        <AnimatePresence>
                            {showLabel && (
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
                )}
            </AnimatePresence>
        </Marker>
    )
}
