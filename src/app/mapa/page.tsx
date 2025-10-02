'use client'

import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { ArrowClockwiseIcon } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/Button'
import { SearchBar } from '@/components/Navbar/SearchBar'
import { Paragraph } from '@/components/Typography/Paragraph'
import { GpsFixIcon, GpsSlashIcon } from '@phosphor-icons/react'
import { contentContainer, searchBarContainer } from './styles'
import { ProgressiveBlur } from '@/components/ProgressiveBlur'
import { AnimatePresence, motion } from 'motion/react'

export default function Page() {
    const [userAllowedLocation, setUserAllowedLocation] = useState<
        null | boolean
    >(null)

    return (
        <main>
            <section className={searchBarContainer}>
                <SearchBar placeholder="Buscar unidades de saúde" />
                <ProgressiveBlur />
            </section>
            <div className={contentContainer}>
                <AnimatePresence initial={false}>
                    {userAllowedLocation === null && (
                        <LocationPrompt
                            setUserAllowedLocation={setUserAllowedLocation}
                        />
                    )}
                    {userAllowedLocation === true && <NearbyHeader />}
                    {userAllowedLocation === false && <LocationDenied />}
                </AnimatePresence>
            </div>
        </main>
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
