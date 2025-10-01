'use client'

import { useState } from 'react'
import { Marker } from 'react-map-gl/mapbox'
import { AnimatePresence, motion } from 'motion/react'
import { FirstAidIcon } from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../styled-system/css'

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
    type: string
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
}

export function MapMarker({
    longitude,
    latitude,
    establishmentProps,
}: MapMarkerProps) {
    const [isMarkerDetailsOpen, setIsMarkerDetailsOpen] = useState(false)

    return (
        <Marker
            longitude={longitude}
            latitude={latitude}
            anchor="center"
            onClick={() => setIsMarkerDetailsOpen(!isMarkerDetailsOpen)}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                        scale: isMarkerDetailsOpen ? 1.1 : 1,
                    }}
                    exit={{ scale: 1 }}
                    transition={{ duration: 0.3, type: 'spring' }}
                    className={markerContainer}
                >
                    <FirstAidIcon weight="fill" />
                    <span>{establishmentProps?.name}</span>
                </motion.div>
            </AnimatePresence>
        </Marker>
    )
}

const markerContainer = css({
    background: 'linear-gradient(to bottom, #67bbff 0%, #018DFF 100%)',
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
})
