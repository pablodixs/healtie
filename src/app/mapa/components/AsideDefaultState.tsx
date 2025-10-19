'use client'

import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { AnimatedMainContainer } from './AnimatedMainContainer'
import { AsideNearEstablishments } from './AsideNearEstablishment'

export function AsideDefault() {
    const { coords, permission, location } = useUserGeolocation()

    if (permission === 'granted' && coords)
        return (
            <AnimatedMainContainer key="near-establishments-aside">
                <AsideNearEstablishments location={location} coords={coords} />
            </AnimatedMainContainer>
        )

    return (
        <AnimatedMainContainer key="default-aside">
            <span>
                Busque por estabelecimentos, serviços ou locais. Ou use o mapa.
            </span>
        </AnimatedMainContainer>
    )
}
