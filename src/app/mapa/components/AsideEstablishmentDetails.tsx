import Image from 'next/image'
import {
    BuildingIcon,
    MapPinAreaIcon,
    MapPinIcon,
    PhoneIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react/dist/ssr'

import { AsideToolbar } from './AsideToolbar'
import { AnimatedMainContainer } from './MainContainer'
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
    indicatorsContainerStyles,
    detailsContainerStyles,
    detailParagraphStyles,
} from './styles'

interface AsideEstablishmentDetailsProps {
    selectedEstablishmentData: Establishment
}

export function AsideEstablishmentDetails({
    selectedEstablishmentData,
}: AsideEstablishmentDetailsProps) {
    return (
        <AnimatedMainContainer>
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
            <div>
                <span className={locationParagraphStyles}>
                    {selectedEstablishmentData.district},{' '}
                    {selectedEstablishmentData.city} -{' '}
                    {selectedEstablishmentData.state} &bull;{' '}
                    <span className={'highlight'}>Aberto agora</span>
                </span>
            </div>
            <section className={actionsContainerStyles}>
                <Button fullWidth>
                    <MapPinAreaIcon /> Estou Aqui
                </Button>
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
            <section>
                <h2 className={indicatorsContainerStyles}>
                    Sem dados suficientes da Situação do Estabelecimento
                </h2>
            </section>
            <section className={detailsContainerStyles}>
                <span>Dados do Estabelecimento</span>
                <span className={detailParagraphStyles}>
                    <PhoneIcon size={18} /> Telefone:{' '}
                    {selectedEstablishmentData.phone}
                </span>
                <span className={detailParagraphStyles}>
                    <MapPinIcon size={18} /> Endereço:{' '}
                    {selectedEstablishmentData.address},{' '}
                    {selectedEstablishmentData.district} -{' '}
                    {selectedEstablishmentData.city},{' '}
                    {selectedEstablishmentData.state}
                </span>

                <span className={detailParagraphStyles}>
                    <BuildingIcon size={18} /> CNES:{' '}
                    {selectedEstablishmentData.cnes}
                </span>
                <div>
                    <Divider margin="compact" />
                    <Link href={'#'} variant="textSubtle" size="sm">
                        <WarningCircleIcon /> Informar erro
                    </Link>
                </div>
            </section>
        </AnimatedMainContainer>
    )
}
