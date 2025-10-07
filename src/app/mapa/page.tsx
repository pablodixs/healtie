'use client'

import Image from 'next/image'
import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    ArrowLeftIcon,
    BuildingIcon,
    DotsThreeIcon,
    GpsFixIcon,
    GpsSlashIcon,
    MapPinAreaIcon,
    MapPinIcon,
    PhoneIcon,
    XIcon,
} from '@phosphor-icons/react'

import { Button } from '@/components/Button'
import { Paragraph } from '@/components/Typography/Paragraph'
import { contentContainer, styles } from './styles'

import { establishments } from '@/utils/unidades.json'
import { useMapContext } from '@/context/MapContext'
import { Link } from '@/components/Link'

export default function Page() {
    const router = useRouter()
    const param = useSearchParams()
    const fromSearchPage = param.get('from') === 'search-page'
    const { setSelectedEstablishment } = useMapContext()
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
                        {fromSearchPage ? (
                            <header
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    color: 'gray.500',
                                    fontWeight: 500,
                                })}
                            >
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        router.back()
                                        setSelectedEstablishment(null)
                                    }}
                                    iconButton
                                >
                                    <ArrowLeftIcon weight="bold" />
                                </Button>
                                <span>{data.type}</span>
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        router.push('/mapa')
                                        setSelectedEstablishment(null)
                                    }}
                                    iconButton
                                >
                                    <XIcon weight="bold" />
                                </Button>
                            </header>
                        ) : (
                            <header
                                className={css({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    color: 'gray.500',
                                    fontWeight: 500,
                                })}
                            >
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        router.push('/mapa')
                                        setSelectedEstablishment(null)
                                    }}
                                    iconButton
                                >
                                    <DotsThreeIcon weight="bold" />
                                </Button>
                                <span>{data.type}</span>
                                <Button
                                    variant="subtle"
                                    onClick={() => {
                                        router.push('/mapa')
                                        setSelectedEstablishment(null)
                                    }}
                                    iconButton
                                >
                                    <XIcon weight="bold" />
                                </Button>
                            </header>
                        )}
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
                                fontSize: '1.375rem',
                                lineHeight: '1lh',
                                fontWeight: 550,
                                color: 'primary',
                                marginTop: '1rem',
                                letterSpacing: '-0.025em',
                            })}
                        >
                            {data.full_name}
                        </h1>
                        <span
                            className={css({
                                color: 'gray.400',
                                fontSize: '0.875rem',
                            })}
                        >
                            {data.district}, {data.city} - {data.state}
                        </span>
                        <section
                            className={css({
                                marginY: '1rem',
                                display: 'flex',
                                gap: '1rem',
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
                            <Button variant="text">Ver no Google Maps</Button>
                            <Button variant="text">Informar erro</Button>
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
