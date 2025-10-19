'use client'

import Image from 'next/image'
import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import {
    ArrowLeftIcon,
    BuildingIcon,
    DotsThreeIcon,
    GpsFixIcon,
    GpsSlashIcon,
    MapPinAreaIcon,
    MapPinIcon,
    PhoneIcon,
    WarningCircleIcon,
    XIcon,
} from '@phosphor-icons/react'

import { contentContainer, styles } from './styles'

import { Link } from '@/components/Link'
import { Button } from '@/components/Button'
import { Tooltip } from '@/components/Tooltip'
import { Divider } from '@/components/Divider'
import { Paragraph } from '@/components/Typography/Paragraph'

import { establishments } from '@/utils/unidades.json'
import { AsideToolbar } from './components/AsideToolbar'

export default function Page() {
    const param = useSearchParams()
    const [userAllowedLocation, setUserAllowedLocation] = useState<
        null | boolean
    >(null)

    const data = establishments.find(
        (establishment) =>
            establishment.cnes === Number(param.get('establishment'))
    )

    return (
        <motion.section
            layout
            transition={{
                layout: {
                    type: 'spring',
                    stiffness: 170,
                    damping: 19,
                },
            }}
            className={styles}
        >
            <AnimatePresence mode="popLayout">
                {data ? (
                    <motion.div
                        layout
                        key={'establishment-details'}
                        initial={{
                            opacity: 0,
                            filter: 'blur(10px)',
                            y: 50,
                        }}
                        animate={{ opacity: 1, filter: 'blur(0)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', y: 50 }}
                        className={contentContainer}
                    >
                        <AsideToolbar data={data} />
                        <div>
                            <Image
                                src={'/pictures/establishment_ubs.png'}
                                alt={data.full_name}
                                width={400}
                                height={100}
                                quality={100}
                                draggable={false}
                                className={css({
                                    width: '100%',
                                    height: '100px',
                                    borderRadius: '12px',
                                    marginTop: '1rem',
                                    objectFit: 'cover',
                                    aspectRatio: '16/9',
                                })}
                            />
                        </div>
                        <h1
                            className={css({
                                fontSize: '1.5rem',
                                lineHeight: '120%',
                                fontWeight: 550,
                                color: 'primary',
                                marginTop: '1rem',
                                letterSpacing: '-0.025em',
                            })}
                        >
                            {data.full_name}
                        </h1>
                        <div>
                            <span
                                className={css({
                                    color: 'gray.400',
                                    fontSize: '0.875rem',
                                })}
                            >
                                {data.district}, {data.city} - {data.state}{' '}
                                &bull;{' '}
                                <span
                                    className={css({
                                        color: 'green.600',
                                        fontWeight: 450,
                                    })}
                                >
                                    Aberto agora
                                </span>
                            </span>
                        </div>
                        <section
                            className={css({
                                marginY: '1rem',
                                display: 'flex',
                                gap: '.5rem',
                            })}
                        >
                            <Button fullWidth>
                                <MapPinAreaIcon /> Estou Aqui
                            </Button>
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
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${data.location.latitude},${data.location.longitude}`}
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
                            <h2
                                className={css({
                                    fontSize: '1.125rem',
                                    lineHeight: '125%',
                                    fontWeight: 500,
                                    color: 'gray.500',
                                    marginY: '2.5rem',
                                    letterSpacing: '-0.025em',
                                    textAlign: 'center',
                                })}
                            >
                                Sem dados suficientes da Situação do
                                Estabelecimento
                            </h2>
                        </section>
                        <section
                            className={css({
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                marginTop: '1rem',
                                fontSize: '0.875rem',
                            })}
                        >
                            <span>Dados do Estabelecimento</span>
                            <span
                                className={css({
                                    color: 'gray.400',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                })}
                            >
                                <PhoneIcon size={18} /> Telefone: {data.phone}
                            </span>
                            <span
                                className={css({
                                    color: 'gray.400',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                })}
                            >
                                <MapPinIcon size={18} /> Endereço:{' '}
                                {data.address}, {data.district} - {data.city},{' '}
                                {data.state}
                            </span>

                            <span
                                className={css({
                                    color: 'gray.400',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                })}
                            >
                                <BuildingIcon size={18} /> CNES: {data.cnes}
                            </span>
                            <div>
                                <Divider margin="compact" />
                                <Link href={'#'} variant="textSubtle" size="sm">
                                    <WarningCircleIcon /> Informar erro
                                </Link>
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.main
                        key={'nearby-header'}
                        layout
                        initial={{
                            opacity: 0,
                            filter: 'blur(10px)',
                            y: 50,
                        }}
                        animate={{ opacity: 1, filter: 'blur(0)', y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', y: 50 }}
                    >
                        <div className={contentContainer}>
                            <AnimatePresence>
                                {userAllowedLocation === null && (
                                    <LocationPrompt
                                        setUserAllowedLocation={
                                            setUserAllowedLocation
                                        }
                                    />
                                )}
                                {userAllowedLocation === true && (
                                    <NearbyHeader />
                                )}
                                {userAllowedLocation === false && (
                                    <LocationDenied />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.main>
                )}
            </AnimatePresence>
        </motion.section>
    )
}

const LocationPrompt = ({
    setUserAllowedLocation,
}: {
    setUserAllowedLocation: React.Dispatch<React.SetStateAction<null | boolean>>
}) => (
    <motion.div
        key={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}
    >
        <Paragraph>
            Autorize o uso da localização para encontrar unidades de saúde
            próximas a você.
        </Paragraph>
        <Button onClick={() => setUserAllowedLocation(true)}>
            <GpsFixIcon /> Autorizar localização
        </Button>
        <Button variant="text" onClick={() => setUserAllowedLocation(false)}>
            <GpsSlashIcon /> Não autorizar localização
        </Button>
    </motion.div>
)

const NearbyHeader = () => (
    <motion.div
        key={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}
    >
        <header className={headerStyles}>
            <Paragraph bolder size="subheadline">
                Próximo de você
            </Paragraph>
            <div>
                <Button iconButton variant="subtle">
                    <ArrowClockwiseIcon weight="bold" />
                </Button>
            </div>
        </header>
    </motion.div>
)

const LocationDenied = () => (
    <motion.div
        key={3}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}
    >
        <Paragraph subtle centered size="subheadline">
            Você não autorizou o uso da sua localização.
        </Paragraph>
    </motion.div>
)

const headerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    alignItems: 'center',

    '& h1': {
        fontSize: '1.125rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
    },
})
