'use client'

import { useState } from 'react'
import { Marker } from 'react-map-gl/mapbox'
import { AnimatePresence, motion } from 'motion/react'

import { css, cva } from '../../../styled-system/css'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react'

export interface Establishment {
    cnes: number
    name: string
    full_name: string
    address: string
    district: string
    city: string
    state: string
    zip_code: string
    abb: string
    type: 'ubs' | 'hospital' | 'upa'
    phone: string
    location: {
        longitude: number
        latitude: number
    }
}

interface MapMarkerProps {
    longitude: number
    latitude: number
    establishmentProps?: Establishment
    showLabel?: boolean
}

export function MapMarker({
    longitude,
    latitude,
    establishmentProps,
    showLabel = true,
}: MapMarkerProps) {
    const [isMarkerDetailsOpen, setIsMarkerDetailsOpen] = useState(false)

    if (!establishmentProps) return null

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="center"
            onClick={() => setIsMarkerDetailsOpen(!isMarkerDetailsOpen)}
        >
            <AnimatePresence mode="wait">
                {isMarkerDetailsOpen ? (
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
                                style={{ fontSize: '14px' }}
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

const markerContainer = cva({
    base: {
        background: 'linear-gradient(0deg, #91afc9ff 0%, #D5EBFE 100%)',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'md',
        border: '2px solid white',
        cursor: 'pointer',
        position: 'relative',

        '& svg': {
            fontSize: '1.5rem',
            color: 'white',
        },

        '& img': {
            scale: '1.25',
        },

        '& span': {
            position: 'absolute',
            bottom: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            textShadow: `-1px -1px 0 #ffffffff,
                    1px -1px 0 #ffffffff,
                    -1px 1px 0 #ffffffff,
                    1px 1px 0 #ffffffff,
                    -2px 0px 0 #ffffffff,
                    2px 0px 0 #ffffffff,
                    0px -2px 0 #ffffffff,
                    0px 2px 0 #ffffffff`,
            fontWeight: 600,
            color: '#202020',
            textAlign: 'center',
            fontSize: '0.75rem',
            width: 'max-content',
        },
    },
    variants: {
        type: {
            HOSPITAL: {
                background:
                    'linear-gradient(to bottom, #AE35FF 0%, #9900FF 100%)',
            },
            UBS: {
                background:
                    'linear-gradient(to bottom, #43ADFF 0%, #0090FF 100%)',
            },
            UPA: {
                background:
                    'linear-gradient(to bottom, #FF6A30 0%, #FF5310 100%)',
            },
        },
    },
})

const labelStyles = css({
    position: 'absolute',
    bottom: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    textShadow: `-1px -1px 0 #ffffffff,
                    1px -1px 0 #ffffffff,
                    -1px 1px 0 #ffffffff,
                    1px 1px 0 #ffffffff,
                    -2px 0px 0 #ffffffff,
                    2px 0px 0 #ffffffff,
                    0px -2px 0 #ffffffff,
                    0px 2px 0 #ffffffff`,
    fontWeight: 600,
    color: '#202020',
    textAlign: 'center',
    fontSize: '0.75rem',
    width: 'max-content',
})
