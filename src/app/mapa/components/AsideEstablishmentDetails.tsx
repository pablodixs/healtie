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

import { Establishment } from '@/interfaces/Establishment'

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

interface AsideEstablishmentDetailsProps {
    selectedEstablishmentData: Establishment
}

export function AsideEstablishmentDetails({
    selectedEstablishmentData,
}: AsideEstablishmentDetailsProps) {
    const [isIAmHereDialogOpen, setIsIAmHereDialogOpen] = useState(false)
    const { distance } = useEstablishmentDistance({
        establishmentCoords: selectedEstablishmentData.location,
    })

    return (
        <AnimatedMainContainer key="establishment-details">
            <AsideToolbar data={selectedEstablishmentData} />
            <Image
                src={'/pictures/establishment_ubs.png'}
                alt={selectedEstablishmentData.full_name}
                width={400}
                height={100}
                quality={100}
                draggable={false}
                className={featureImageStyles}
            />
            <h1 className={titleStyles}>
                {selectedEstablishmentData.full_name}
            </h1>
            <div className={compactDetailsContainer}>
                <span className={locationParagraphStyles}>
                    {selectedEstablishmentData.district},{' '}
                    {selectedEstablishmentData.city} -{' '}
                    {selectedEstablishmentData.state}
                </span>
                <EstablishmentDistanceLabel
                    establishmentCoords={selectedEstablishmentData.location}
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
                    href={`/estabelecimento/${selectedEstablishmentData.cnes}`}
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
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedEstablishmentData.location.latitude},${selectedEstablishmentData.location.longitude}`}
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
                    value={selectedEstablishmentData.phone}
                />
                <DetailItem
                    title="Endereço"
                    value={`${selectedEstablishmentData.address}`}
                />
                <DetailItem
                    title="CNES"
                    value={selectedEstablishmentData.cnes.toString()}
                />
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
                        establishment={selectedEstablishmentData}
                        onOpenChange={setIsIAmHereDialogOpen}
                    />
                )}
            </Portal>
        </AnimatedMainContainer>
    )
}
