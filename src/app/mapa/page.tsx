'use client'

import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { Paragraph } from '@/components/Typography/Paragraph'
import { GpsFixIcon, GpsSlashIcon, XIcon } from '@phosphor-icons/react'
import { contentContainer, searchBarContainer, styles } from './styles'
import { AnimatePresence, motion } from 'motion/react'

import { establishments } from '@/utils/unidades.json'
import { Subheading } from '@/components/Typography/Subheading'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMapContext } from '@/context/MapContext'
import { style } from 'motion/react-client'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'

export default function Page() {
    const router = useRouter()
    const param = useSearchParams()
    const { setSelectedEstablishment } = useMapContext()
    const [userAllowedLocation, setUserAllowedLocation] = useState<
        null | boolean
    >(null)
    const data = establishments.find(
        (establishment) =>
            establishment.cnes === Number(param.get('establishment'))
    )

    return (
        <>
            <div
                className={css({
                    position: 'absolute',
                    top: 'header',
                    left: 0,
                    width: '30%',
                    maxWidth: '400px',
                    zIndex: 5,
                    marginLeft: '1rem',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    minHeight: '74px',
                })}
            >
                <section className={searchBarContainer}>
                    <SearchBar placeholder="Buscar unidades de saúde" />
                    <ProgressiveBlur />
                </section>
            </div>
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
                            <header>
                                <span>{data.type}</span>
                                <Button
                                    onClick={() => {
                                        router.push('/mapa')
                                        setSelectedEstablishment(null)
                                    }}
                                    iconButton
                                >
                                    <XIcon />
                                </Button>
                            </header>
                            <Subheading centered>{data.full_name}</Subheading>
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
        </>
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
