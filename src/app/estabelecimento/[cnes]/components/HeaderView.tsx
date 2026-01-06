import { css } from '../../../../../styled-system/css'
import {
    CarIcon,
    ChatCircleIcon,
    ClockCountdownIcon,
    MapPinSimpleAreaIcon,
    MapTrifoldIcon,
    SpeedometerIcon,
} from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { Heading, Paragraph } from '@/components/Typography'
import { EstablishmentIcon } from '@/components/EstablishmentIcon'

import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { Link } from '@/components/Link'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { useRouter } from 'next/navigation'
import { useMapContext } from '@/context/MapContext'

interface HeaderViewProps {
    establishment: EstablishmentResponse | undefined
    setIsReportModalOpen: (isOpen: boolean) => void
}

export function HeaderView({
    establishment,
    setIsReportModalOpen,
}: HeaderViewProps) {
    const { coords } = useUserGeolocation({
        immediate: true,
    })
    const router = useRouter()
    const { setSelectedEstablishment } = useMapContext()

    if (!establishment) return null

    const distanceToEstablishment = coords
        ? calculateDistance(
              establishment.coordinates.latitude,
              establishment.coordinates.longitude,
              coords.latitude,
              coords.longitude
          )
        : null

    const handleViewMap = () => {
        setSelectedEstablishment({
            cnes: establishment.cnes,
            geolocation: {
                latitude: establishment.coordinates.latitude,
                longitude: establishment.coordinates.longitude,
            },
            name: establishment.name,
            type: establishment.type || '',
        })
        router.push(
            `/mapa?establishment=${establishment.cnes}&from=search-page`
        )
    }

    return (
        <section>
            <div>
                <EstablishmentIcon
                    decoration
                    size="large"
                    square
                    type={
                        establishment.type as
                            | 'Hospital Geral'
                            | 'Unidade Básica de Saúde'
                            | 'Unidade de Pronto Atendimento'
                    }
                />
                <Heading style={{ marginTop: '1rem' }}>
                    {establishment.name}
                </Heading>
                {establishment.description && (
                    <Paragraph subtle size="subheadline">
                        {establishment.description}
                    </Paragraph>
                )}
                <section className={establishmentInfoContainer}>
                    <span>
                        {establishment.type} em{' '}
                        {establishment.address?.district},{' '}
                        {establishment.address?.city}
                    </span>
                    <span>&bull;</span>
                    <span className={openSpanStyle}>
                        <ClockCountdownIcon size={18} />
                        Aberto agora
                    </span>
                    {distanceToEstablishment && (
                        <>
                            <span>&bull;</span>
                            <span className={distanceSpanStyle}>
                                <MapPinSimpleAreaIcon size={18} />A{' '}
                                {formatDistance(distanceToEstablishment)} de
                                distância
                            </span>
                        </>
                    )}
                </section>
            </div>
            <div className={toolbarContainer}>
                {/* <Button
                    onClick={() => setIsIAmHereModalOpen(true)}
                    variant="secondary"
                >
                    <MapPinAreaIcon weight="bold" size={20} /> Estou Aqui
                </Button> */}
                <Button
                    variant="bordered"
                    onClick={() => setIsReportModalOpen(true)}
                >
                    <SpeedometerIcon size={20} /> Reportar
                </Button>
                <Button onClick={handleViewMap} variant="bordered">
                    <MapTrifoldIcon size={20} /> Ver no Mapa
                </Button>
                <Link
                    target="_blank"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${establishment.coordinates?.latitude},${establishment.coordinates.longitude}`}
                    variant="bordered"
                    size="sm"
                >
                    <CarIcon size={20} /> Rotas
                </Link>
                <Button variant="bordered">
                    <ChatCircleIcon size={20} /> Comentar
                </Button>
            </div>
        </section>
    )
}

const establishmentInfoContainer = css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '.5rem',
    color: 'neutral.500',
    fontSize: '0.875rem',
    marginY: '1rem',
})

const openSpanStyle = css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: 'green.600',
})

const distanceSpanStyle = css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    marginY: '1rem',
})

const toolbarContainer = css({
    display: 'flex',
    flexDir: {
        base: 'column',
        md: 'row',
    },
    gap: '.5rem',
    marginBottom: '2rem',

    '& button': {
        width: {
            md: 'inherit',
            base: '100%',
        },
    },
})
