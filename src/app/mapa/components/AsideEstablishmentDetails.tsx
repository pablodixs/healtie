'use client'

import Image from 'next/image'
import {
    MapPinAreaIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react/dist/ssr'

import { AsideToolbar } from './AsideToolbar'
import { AnimatedMainContainer } from './AnimatedMainContainer'
import { Link } from '@/components/Link'
import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'
import { Divider } from '@/components/Divider'

import {
    featureImageStyles,
    titleStyles,
    locationParagraphStyles,
    actionsContainerStyles,
    detailsContainerStyles,
    compactDetailsContainer,
} from './styles'
import { EstablishmentDistanceLabel } from '@/components/DistanceLabel'
import { DetailItem } from '@/app/estabelecimento/[id]/components/DetailsAsideView'
import { useEstablishmentDistance } from '@/hooks/geolocation/useEstablishmentDistance'
import { useState } from 'react'
import { Portal } from '@/components/Portal'
import { IAmHereDialog } from '@/components/IAmHererDialog'
import useSWR from 'swr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { fetcher } from '@/lib/swrFetcher'
import { ErrorState } from './states/ErrorState'
import { Paragraph } from '@/components/Typography'
import { LoadingState } from './states/LoadingState'

interface AsideEstablishmentDetailsProps {
    selectedEstablishmentCnes: number | string
}

export function AsideEstablishmentDetails({
    selectedEstablishmentCnes,
}: AsideEstablishmentDetailsProps) {
    const { data, isLoading } = useSWR<EstablishmentResponse>(
        `https://https://healtie-bh7zc.ondigitalocean.app/v1/establishment/${selectedEstablishmentCnes}`,
        fetcher
    )

    const [isIAmHereDialogOpen, setIsIAmHereDialogOpen] = useState(false)

    const { distance } = useEstablishmentDistance({
        establishmentCoords: data?.coordinates,
    })

    if (isLoading)
        return (
            <AnimatedMainContainer key={'loading'}>
                <LoadingState />
            </AnimatedMainContainer>
        )

    if (!data)
        return (
            <AnimatedMainContainer key={'error'}>
                <ErrorState />
            </AnimatedMainContainer>
        )

    return (
        <AnimatedMainContainer key="establishment-details">
            <AsideToolbar data={data} />
            <Image
                src={'/pictures/establishment_ubs.png'}
                alt={data.name}
                width={400}
                height={100}
                quality={100}
                draggable={false}
                className={featureImageStyles}
            />
            <h1 className={titleStyles}>{data.name}</h1>
            <div className={compactDetailsContainer}>
                <span className={locationParagraphStyles}>
                    {data.address?.district}, {data.address?.city} -{' '}
                    {data.address?.state}
                </span>
                <EstablishmentDistanceLabel
                    latitude={data.coordinates.latitude}
                    longitude={data.coordinates.longitude}
                />
                <span className={'highlight'}>Aberto agora</span>
            </div>
            <section className={actionsContainerStyles}>
                {distance !== null && distance < 0.15 && (
                    <Button
                        fullWidth
                        onClick={() => setIsIAmHereDialogOpen(true)}
                    >
                        <MapPinAreaIcon /> Estou Aqui
                    </Button>
                )}
                <Link
                    href={`/estabelecimento/${data.cnes}`}
                    fullWidth
                    variant="subtle"
                >
                    Ver mais
                </Link>
                <Tooltip content="Ver rotas no Google Maps">
                    <Link
                        onlyIcon
                        variant="subtle"
                        target="_blank"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${data.coordinates.latitude},${data.coordinates.longitude}`}
                    >
                        <Image
                            src={'/pictures/google_maps_icon.png'}
                            alt="Ícone do Google Maps "
                            width={14}
                            height={14}
                        />
                    </Link>
                </Tooltip>
            </section>
            {/* <section>
                <h2 className={indicatorsContainerStyles}>
                    Sem dados suficientes da Situação do Estabelecimento
                </h2>
            </section> */}
            <section className={detailsContainerStyles}>
                <span>Dados do Estabelecimento</span>
                <DetailItem
                    title="Telefone"
                    value={data.phone || 'Não informado'}
                />
                <DetailItem title="Endereço" value={data.address?.address} />
                <DetailItem title="CNES" value={data.cnes.toString()} />
                <div>
                    <Divider margin="compact" />
                    <Link href={'#'} variant="textSubtle" size="sm">
                        <WarningCircleIcon /> Informar erro
                    </Link>
                </div>
            </section>
            <Portal>
                {isIAmHereDialogOpen && (
                    <IAmHereDialog
                        establishment={data}
                        onOpenChange={setIsIAmHereDialogOpen}
                    />
                )}
            </Portal>
        </AnimatedMainContainer>
    )
}
