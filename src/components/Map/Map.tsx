'use client'

import {
    GearIcon,
    GpsIcon,
    MinusIcon,
    PlusIcon,
    XIcon,
} from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Map, { ScaleControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

import { css } from '../../../styled-system/css'

import { Toggle } from '@/components/Toggle'
import { Button } from '@/components/Button'
import { MapMarker } from '@/components/Map'
import { Paragraph } from '@/components/Typography/Paragraph'
import { toolbarContainer } from '@/components/Map/styles'

import { establishments } from '@/utils/unidades.json'
import { TokenMissingState } from './EmptyStates/TokenMissingState'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
    longitude: -47.9292,
    latitude: -15.7801,
    zoom: 11,
}

export function MapComponent() {
    const mapRef = useRef<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const [isExpanded, setIsExpanded] = useState(false)
    const [showLabels, setShowLabels] = useState(true)

    const handleZoomIn = () => {
        if (mapRef.current) {
            mapRef.current.zoomIn()
        }
    }

    const handleZoomOut = () => {
        if (mapRef.current) {
            mapRef.current.zoomOut()
        }
    }

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
                    <motion.div
                        layout
                        transition={{
                            layout: {
                                type: 'spring',
                                stiffness: 170,
                                damping: 19,
                            },
                        }}
                        style={{
                            backdropFilter: 'blur(10px)',
                        }}
                        className={css({
                            zIndex: 1,
                            position: 'absolute',
                            top: 'header',
                            right: '1.5rem',
                            padding: isExpanded ? '.5rem 1rem' : '0.25rem',
                            backgroundColor: isExpanded
                                ? 'rgba(255, 255, 255, 0.8)'
                                : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: isExpanded ? '24px' : '9999px',
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
                            display: 'flex',
                            overflow: 'hidden',
                            alignItems: 'center',
                            transition: 'backgroundColor 0.2s ease',
                        })}
                    >
                        <AnimatePresence mode="popLayout">
                            {isExpanded ? (
                                <motion.div
                                    key="expanded-content"
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: 'blur(6px)',
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        filter: 'blur(6px)',
                                    }}
                                    className={css({
                                        display: 'flex',
                                        flexDir: 'column',
                                        alignItems: 'flex-start',
                                        minWidth: '300px',
                                    })}
                                >
                                    {isExpanded && (
                                        <>
                                            <header
                                                className={css({
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                })}
                                            >
                                                <Paragraph bolder>
                                                    Preferências do Mapa
                                                </Paragraph>
                                                <Button
                                                    onClick={() =>
                                                        setIsExpanded(false)
                                                    }
                                                    iconButton
                                                    variant="ghost"
                                                >
                                                    <XIcon />
                                                </Button>
                                            </header>
                                            <Toggle
                                                label="Mostrar nome das unidades"
                                                checked={showLabels}
                                                onChange={setShowLabels}
                                            />
                                        </>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="collapsed-buttons"
                                    layout
                                    initial={{
                                        opacity: 0,
                                        filter: 'blur(6px)',
                                        transition: { delay: 0.2 },
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                    }}
                                    exit={{
                                        opacity: 0,
                                        filter: 'blur(6px)',
                                    }}
                                    className={css({
                                        display: 'flex',
                                        flexDir: 'column',
                                    })}
                                >
                                    <Button
                                        iconButton
                                        variant="text"
                                        onClick={() => setIsExpanded(true)}
                                    >
                                        <GearIcon size={18} />
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <div
                        style={{
                            backdropFilter: 'blur(10px)',
                        }}
                        className={toolbarContainer}
                    >
                        <Button variant="text" iconButton size="large">
                            <GpsIcon size={18} weight="bold" />
                        </Button>
                        <Button
                            variant="text"
                            iconButton
                            size="large"
                            onClick={handleZoomIn}
                        >
                            <PlusIcon size={18} weight="bold" />
                        </Button>
                        <Button
                            variant="text"
                            iconButton
                            size="large"
                            onClick={handleZoomOut}
                        >
                            <MinusIcon size={18} weight="bold" />
                        </Button>
                    </div>
                    <Map
                        ref={mapRef}
                        onError={(e) => {
                            console.error('Map error:', e.error)
                        }}
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
