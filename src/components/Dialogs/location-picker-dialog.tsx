'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
    LockIcon,
    CrosshairIcon,
    CaretLeftIcon,
    ArrowRightIcon,
    CircleNotchIcon,
    XCircleIcon,
} from '@phosphor-icons/react'

import { css } from '../../../styled-system/css'
import { Button } from '../Button'
import { Paragraph, Subheading } from '../Typography'
import {
    dialogStyles,
    footerStyles,
    imageStyles,
    overlay,
    privacyAdvice,
    selectionWrapper,
} from './styles'

import { useSelectedCity } from '@/hooks/useSelectedCity'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import { Banner } from '../Banner'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'

const availableStates = [
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Goiás', value: 'GO' },
]

const availableCitiesByState: Record<
    string,
    { label: string; value: string }[]
> = {
    DF: [{ label: 'Brasília', value: 'Brasília' }],
    GO: [
        {
            label: 'Santo Antônio do Descoberto',
            value: 'Santo Antônio do Descoberto',
        },
    ],
}

interface LocationPickerDialogProps {
    onClose: () => void
    value: boolean
}

type states = 'splashscreen' | 'city' | 'geolocation'

export function LocationPickerDialog({
    onClose,
    value,
}: LocationPickerDialogProps) {
    const [viewType, setViewType] = useState<states>('splashscreen')

    useEffect(() => {
        if (value) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [value])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={overlay}
        >
            <motion.div
                initial={{ y: '50dvh' }}
                animate={{ y: 0 }}
                exit={{ scale: 0.85, y: 0 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0 }}
                key={'location-picker'}
                className={dialogStyles}
            >
                <Image
                    src={'/images/location-prompt-image.png'}
                    alt=""
                    width={600}
                    height={230}
                    quality={100}
                    className={imageStyles}
                />
                <div>
                    <AnimatePresence mode="wait">
                        {viewType === 'splashscreen' && (
                            <Splashscreen setViewType={setViewType} />
                        )}
                        {viewType === 'city' && (
                            <CityPicker
                                onChange={() => setViewType('splashscreen')}
                                onDismiss={onClose}
                            />
                        )}
                        {viewType === 'geolocation' && (
                            <GeolocationPicker
                                onDismiss={onClose}
                                onChange={() => setViewType('splashscreen')}
                                onCityChoose={() => setViewType('city')}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <footer className={footerStyles}>
                    <span className={privacyAdvice}>
                        <LockIcon weight="fill" />
                        <p>
                            Não armazenamos sua localização em nossos
                            servidores. <Link href={''}>Saiba mais...</Link>
                        </p>
                    </span>
                    <Button onClick={onClose} variant="subtle">
                        Agora não
                    </Button>
                </footer>
            </motion.div>
        </motion.div>
    )
}

const Splashscreen = ({
    setViewType,
}: {
    setViewType: Dispatch<SetStateAction<states>>
}) => {
    const { requestLocation } = useUserGeolocation()

    return (
        <motion.div
            key={'location'}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
            <Subheading centered>Permita o uso da sua localização</Subheading>
            <Paragraph centered>
                Ao saber sua localização, podemos mostrar com mais relevância os
                estabelecimentos próximos a você.
            </Paragraph>
            <div className={selectionWrapper}>
                <Button
                    onClick={() => {
                        requestLocation()
                        setViewType('geolocation')
                    }}
                    size="large"
                    fullWidth
                >
                    <CrosshairIcon weight="bold" size={18} /> Usar minha
                    localização
                </Button>
                <Button onClick={() => setViewType('city')} variant="text">
                    Ou selecione a sua UF manualmente
                </Button>
            </div>
        </motion.div>
    )
}

const GeolocationPicker = ({
    onChange,
    onDismiss,
    onCityChoose,
}: {
    onChange: () => void
    onDismiss: () => void
    onCityChoose: () => void
}) => {
    const { status } = useUserGeolocation()

    if (status === 'idle' || status === 'requesting')
        return (
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    my: '2rem',
                })}
            >
                <CircleNotchIcon
                    className={css({
                        animation: 'spin',
                    })}
                    weight="bold"
                    size={24}
                />
            </div>
        )

    return (
        <motion.div
            key={'geolocation'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
            <Button
                iconButton
                variant="subtle"
                title="Voltar"
                onClick={onChange}
            >
                <CaretLeftIcon weight="bold" />
            </Button>
            {status === 'prompt' && (
                <>
                    <Subheading centered>
                        Permita uso da localização no seu navegador
                    </Subheading>
                    <div
                        className={css({
                            color: 'neutral.500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1ch',
                            my: '2rem',
                        })}
                    >
                        <CircleNotchIcon
                            className={css({
                                animation: 'spin',
                            })}
                            weight="bold"
                            size={24}
                        />
                        Aguardando permissão...
                    </div>
                </>
            )}
            {status === 'granted' && (
                <>
                    <Banner
                        size="sm"
                        variant="success"
                        title="Você autorizou acesso à sua localização."
                        icon={<CheckCircleIcon weight="fill" />}
                        style={{ margin: '1rem 0' }}
                    />
                    <Subheading centered>Localizamos você</Subheading>
                    <Paragraph centered>
                        Encontramos sua localização como{' '}
                        <strong>Brasília - DF</strong>. Caso esteja correto,
                        você pode fechar este diálogo e explorar os
                        estabelecimentos próximos a você.
                    </Paragraph>
                    <Button
                        style={{ margin: '1rem 0' }}
                        fullWidth
                        onClick={onDismiss}
                    >
                        Tudo certo!
                    </Button>
                </>
            )}
            {status === 'denied' && (
                <>
                    <Banner
                        size="sm"
                        variant="error"
                        title="Você não autorizou acesso à sua localização."
                        message={
                            'Você pode alterar nas configurações do seu navegador.'
                        }
                        icon={<XCircleIcon weight="fill" />}
                        style={{ margin: '1rem 0' }}
                    />
                    <div
                        className={css({
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                            my: '2rem',
                        })}
                    >
                        <Button onClick={() => onCityChoose()} fullWidth>
                            Inserir cidade manualmente
                        </Button>
                        <Button
                            onClick={onDismiss}
                            variant="bordered"
                            fullWidth
                        >
                            Fechar
                        </Button>
                    </div>
                </>
            )}
        </motion.div>
    )
}

const CityPicker = ({
    onChange,
    onDismiss,
}: {
    onChange: () => void
    onDismiss: () => void
}) => {
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const { setCity } = useSelectedCity()

    function handleSetCity(city: string | null) {
        setCity(city)
        onDismiss()
    }

    return (
        <motion.div
            key={'city'}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
            <Button
                iconButton
                variant="subtle"
                title="Voltar"
                onClick={onChange}
            >
                <CaretLeftIcon weight="bold" />
            </Button>
            <Subheading centered>Selecione seu município</Subheading>
            <div
                className={css({
                    pt: '1rem',
                    '& label': {
                        color: 'neutral.500',
                        fontSize: '0.875rem',
                        ml: '1rem',
                    },
                })}
            >
                <label htmlFor="uf-select">Unidade Federativa</label>
                <select
                    className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        mb: '1rem',
                        backgroundColor: 'neutral.100',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '9999px',
                        fontWeight: 500,
                        color: 'primary',
                    })}
                    onChange={(e) => setSelectedState(e.target.value)}
                >
                    <option value="" disabled selected>
                        Selecione sua UF
                    </option>
                    {availableStates.map((state) => (
                        <option key={state.value} value={state.value}>
                            {state.label}
                        </option>
                    ))}
                </select>
                <AnimatePresence>
                    {selectedState && (
                        <motion.div
                            initial={{
                                scale: 0.95,
                                opacity: 0,
                                filter: 'blur(10px)',
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                filter: 'blur(0px)',
                            }}
                            exit={{
                                scale: 0.95,
                                opacity: 0,
                                filter: 'blur(10px)',
                            }}
                            transition={{
                                type: 'spring',
                                bounce: 0,
                                duration: 0.4,
                            }}
                        >
                            <label htmlFor="city-select">Município</label>
                            <select
                                className={css({
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: '1rem',
                                    backgroundColor: 'neutral.100',
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '9999px',
                                    fontWeight: 500,
                                    color: 'primary',
                                })}
                                onChange={(e) =>
                                    setSelectedCity(e.target.value)
                                }
                            >
                                <option value="" disabled selected>
                                    Selecione o município
                                </option>
                                {availableCitiesByState[selectedState].map(
                                    (city) => (
                                        <option
                                            key={city.value}
                                            value={city.value}
                                        >
                                            {city.label}
                                        </option>
                                    )
                                )}
                            </select>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: '1rem',
                    gap: '1rem',
                })}
            >
                <Button
                    onClick={() => handleSetCity(selectedCity)}
                    aria-disabled={!selectedState || !selectedCity}
                >
                    Confirmar
                </Button>
                <Link
                    className={css({
                        display: 'flex',
                        gap: '1ch',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        color: 'neutral.500',

                        _hover: {
                            color: 'tint',
                        },
                    })}
                    href={'/regioes'}
                >
                    Ver cidades disponíveis <ArrowRightIcon size={14} />
                </Link>
            </div>
        </motion.div>
    )
}
