'use client'

import { BackButton } from '@/components/Button/BackButton'
import { Heading } from '@/components/Typography'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import {
    MapPinIcon,
    SlidersHorizontalIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { NavigationTabItem, NavigationTabs } from '@/components/NavigationTabs'
import { NearbyEstablishment } from '@/components/NearEstablishmentsBanner'
import { useMemo } from 'react'
import { calculateDistance } from '@/utils/functions/calculateDistance'
import { establishments } from '@/utils/unidades.json'
import { EstablishmentResultItem } from '../components/EstablishmentResultItem'
import { Button } from '@/components/Button'

export default function Page() {
    const { coords, location, isLoadingLocation } = useUserGeolocation()

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
            .filter((establishment) => establishment.distance <= 50)
            .sort((a, b) => a.distance - b.distance)
    }, [coords])

    return (
        <main>
            <BackButton />
            <section
                className={css({
                    marginY: '1rem',
                })}
            >
                <Heading>Próximos de mim</Heading>
                <section
                    className={css({
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    })}
                >
                    <div
                        className={css({
                            display: 'flex',
                            gap: '.25rem',
                            alignItems: 'center',
                            color: 'tint',
                            borderRadius: '9999px',
                            width: 'fit-content',
                            lineHeight: '1',
                        })}
                    >
                        <MapPinIcon size={18} />{' '}
                        <span>
                            {isLoadingLocation
                                ? 'Carregando sua localização...'
                                : location}
                        </span>
                    </div>
                    <Button variant="subtle">
                        <SlidersHorizontalIcon /> Filtrar
                    </Button>
                </section>
            </section>
            <NavigationTabs>
                <NavigationTabItem
                    title="Tudo"
                    badge={String(establishmentsWithDistance.length)}
                    selectedTab
                />
                <NavigationTabItem title="Unidades Básicas de Saúde" />
                <NavigationTabItem title="Unidades de Pronto Atendimento" />
                <NavigationTabItem title="Hospitais" />
            </NavigationTabs>
            <section>
                {establishmentsWithDistance.length > 0 &&
                    establishmentsWithDistance.map((establishment) => (
                        <EstablishmentResultItem
                            key={establishment.cnes}
                            establishment={establishment}
                        />
                    ))}
            </section>
        </main>
    )
}
