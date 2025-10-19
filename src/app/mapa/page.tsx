'use client'

import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import { GpsFixIcon, GpsSlashIcon } from '@phosphor-icons/react'

import { contentContainer, styles } from './styles'

import { Button } from '@/components/Button'
import { Paragraph } from '@/components/Typography/Paragraph'

import { establishments } from '@/utils/unidades.json'
import { AsideEstablishmentDetails } from './components/AsideEstablishmentDetails'

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
                    <AsideEstablishmentDetails
                        selectedEstablishmentData={data}
                    />
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
