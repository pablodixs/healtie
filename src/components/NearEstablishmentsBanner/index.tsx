'use client'

import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { AskLocationBanner } from '../AskLocationBanner'
import { Paragraph } from '../Typography'
import { useEffect, useMemo, useState } from 'react'
import { css } from '../../../styled-system/css'

import { establishments } from '@/utils/unidades.json'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import type { Establishment } from '@/interfaces/Establishment'
import { AnimatePresence, motion } from 'motion/react'

export function NearEstablishmentsBanner() {
    const { coords, userDidAllowLocation, requestLocation } =
        useUserGeolocation()
    const [location, setLocation] = useState<string | null>(null)
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)

    useEffect(() => {
        const fetchLocation = async () => {
            if (!coords) return
            setIsLoadingLocation(true)
            const { latitude: lat, longitude: lng } = coords
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            )
            const data = await res.json()
            const city =
                data.address.city || data.address.town || data.address.village
            const state = data.address.state
            setLocation(`${city}, ${state}`)
            setIsLoadingLocation(false)
        }

        fetchLocation()
    }, [coords])

    type NearbyEstablishment = Establishment & { distance: number }

    const establishmentsWithDistance: NearbyEstablishment[] = useMemo(() => {
        if (!coords) return []

        return establishments
            .map<NearbyEstablishment>((establishment) => {
                const distance = calculateDistance(
                    coords.latitude,
                    coords.longitude,
                    establishment.location.latitude,
                    establishment.location.longitude
                )

                return {
                    ...establishment,
                    distance,
                }
            })
            .filter((establishment) => establishment.distance <= 10)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5)
    }, [coords])

    return (
        <div>
            {!userDidAllowLocation && (
                <AskLocationBanner requestLocation={requestLocation} />
            )}
            {coords && (
                <>
                    <AnimatePresence>
                        {isLoadingLocation ? (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    filter: 'blur(4px)',
                                }}
                            >
                                Carregando...
                            </motion.p>
                        ) : (
                            <motion.p
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                    filter: 'blur(4px)',
                                }}
                            >
                                Você está em{' '}
                                <span
                                    className={css({
                                        fontWeight: 500,
                                        color: 'tint',
                                    })}
                                >
                                    {location}
                                </span>
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <div>
                        {establishmentsWithDistance.length > 0 &&
                            establishmentsWithDistance.map((establishment) => (
                                <Paragraph key={establishment.cnes}>
                                    {establishment.name} -{' '}
                                    {formatDistance(establishment.distance)}
                                </Paragraph>
                            ))}
                    </div>
                </>
            )}
        </div>
    )
}
