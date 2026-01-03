'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, stagger } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { css } from '../../../styled-system/css'

import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import { Heading } from '@/components/Typography/Heading'

const allowedFilters = ['HOSPITAL', 'UPA', 'UBS'] as const
type AllowedFilter = (typeof allowedFilters)[number]
function isAllowedFilter(value: string | null): value is AllowedFilter {
    return !!value && allowedFilters.includes(value as AllowedFilter)
}
import { NoResultsEmptyState } from './components/NoResultsEmpytState'
import { Paragraph } from '@/components/Typography/Paragraph'
import { NearEstablishmentsBanner } from '@/components/NearEstablishmentsBanner'
import { Banner } from '@/components/Banner'
import {
    ArrowUpRightIcon,
    CaretRightIcon,
    CircleNotchIcon,
    MapPinIcon,
    QuestionIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentPointResponse } from '@/interfaces/Establishment'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import Link from 'next/link'
import {
    calculateDistance,
    formatDistance,
} from '@/utils/functions/calculateDistance'
import { useUserGeolocation } from '@/hooks/geolocation/useUserGeolocation'
import {
    AmbulanceIcon,
    ArrowsDownUpIcon,
    CaretDownIcon,
    CrosshairIcon,
    FirstAidIcon,
    HospitalIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react'
import { markerContainer } from '@/components/Map/maker.styles'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_HEALTIE_API_URL

interface SuggestionResponse {
    cnes: number
    name: string
    type: string
}

const suggestionsContainer = {
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
            when: 'beforeChildren',
            delayChildren: stagger(0.1),
        },
    },
    hidden: {
        opacity: 0,
        filter: 'blur(2px)',
        y: -10,
        transition: {
            when: 'afterChildren',
            delayChildren: stagger(0.1),
        },
    },
} as const

const suggestionsOptions = {
    visible: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
    },
    hidden: {
        y: '-100%',
        opacity: 0,
        filter: 'blur(2px)',
    },
    exit: {
        y: 0,
        opacity: 0,
        filter: 'blur(2px)',
    },
}

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)
    const initialQuery = searchParams.get('q') || ''
    const [debounced, setDebounced] = useState('')
    const [localQuery, setLocalQuery] = useState(initialQuery)
    const { coords } = useUserGeolocation()

    const [suggestions, setSuggestions] = useState<SuggestionResponse[] | null>(
        null
    )

    const query = searchParams.get('q') || ''
    const rawFilterParam = searchParams.get('filter')
    const filterParam = isAllowedFilter(rawFilterParam) ? rawFilterParam : null
    const [inputFocused, setInputFocused] = useState<boolean | undefined>(
        undefined
    )

    useEffect(() => {
        setLocalQuery(query)
    }, [query])

    useEffect(() => {
        setEstablishmentFilter(filterParam)
    }, [filterParam])

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setLocalQuery(e.target.value)
        },
        []
    )

    useEffect(() => {
        const controller = new AbortController()

        if (!localQuery) {
            setSuggestions(null)
            return () => controller.abort()
        }

        const timeoutId = setTimeout(() => {
            axios
                .get<SuggestionResponse[]>(
                    `http://localhost:8080/v1/establishment/search/suggestions?q=${encodeURIComponent(
                        localQuery
                    )}${coords ? `&lat=${coords.latitude}&lon=${coords.longitude}` : ''}`,
                    { signal: controller.signal }
                )
                .then((response) => {
                    setSuggestions(response.data)
                })
                .catch(() => {
                    setSuggestions(null)
                })
        }, 300)

        return () => {
            clearTimeout(timeoutId)
            controller.abort()
        }
    }, [localQuery, coords])

    const handleFilterChange = useCallback(
        (
            newFilter: string | null | ((prev: string | null) => string | null)
        ) => {
            if (typeof newFilter === 'function') {
                setEstablishmentFilter((prev) => newFilter(prev))
            } else {
                setEstablishmentFilter(newFilter)
            }
        },
        []
    )

    const { data, isLoading, error } = useSWR<EstablishmentPointResponse[]>(
        debounced && debounced.length >= 3
            ? `${API_URL}/establishment/search?q=${encodeURIComponent(
                  debounced
              )}${
                  establishmentFilter
                      ? `&t=${encodeURIComponent(establishmentFilter)}`
                      : ''
              }`
            : null,
        fetcher
    )

    const handleSearch = () => {
        router.replace(
            `/buscar?q=${encodeURIComponent(localQuery)}${
                establishmentFilter
                    ? `&filter=${encodeURIComponent(establishmentFilter)}`
                    : ''
            }`,
            { scroll: false }
        )
        setDebounced(localQuery)
    }

    return (
        <main
            className={css({
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                minHeight: '95dvh',
            })}
        >
            <div
                className={css({
                    display: 'none',
                    alignItems: 'center',
                    gap: '1ch',
                })}
            >
                <Heading>Buscar</Heading>
            </div>
            <div className={css({ position: 'relative' })}>
                <HeroSearchBar
                    showFilterOptions
                    filterValue={establishmentFilter}
                    onFilterChange={handleFilterChange}
                    autoFocus
                    value={localQuery}
                    onChange={(e) => handleChange(e)}
                    searchAction={handleSearch}
                    isInputFocused={inputFocused}
                    onInputFocusChange={() => setInputFocused(!inputFocused)}
                />
                <AnimatePresence>
                    {localQuery && inputFocused && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{
                                type: 'spring',
                            }}
                            variants={suggestionsContainer}
                            className={css({
                                position: 'absolute',
                                top: '4rem',
                                zIndex: 50,
                                width: '100%',
                                maxWidth: '800px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                gap: '.5rem',

                                _after: {
                                    content: "''",
                                    position: 'absolute',
                                    bottom: '-2rem',
                                    left: '-2rem',
                                    right: '-2rem',
                                    width: '100%',
                                    height: '100%',
                                    bg: 'rgba(255, 255, 255, 0.8)',
                                    zIndex: -1,
                                    filter: 'blur(20px)',
                                    backdropBlur: '20px',
                                },

                                '& button': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1ch',
                                    padding: '0.5rem 0.75rem',
                                    bg: 'white',
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    textWrap: 'nowrap',
                                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
                                },
                            })}
                        >
                            <button
                                onClick={handleSearch}
                                className={css({ zIndex: 51 })}
                            >
                                <MagnifyingGlassIcon weight="bold" />
                                <span>
                                    Buscar por{' '}
                                    <b
                                        className={css({
                                            fontWeight: 500,
                                        })}
                                    >
                                        &quot;{localQuery}&quot;
                                    </b>
                                </span>
                            </button>
                            <AnimatePresence mode="wait">
                                {suggestions &&
                                    suggestions.map((suggestion) => (
                                        <motion.button
                                            onClick={() =>
                                                router.push(
                                                    `/estabelecimento/${suggestion.cnes}`
                                                )
                                            }
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{
                                                duration: 0.4,
                                                type: 'spring',
                                            }}
                                            variants={suggestionsOptions}
                                            key={suggestion.cnes}
                                        >
                                            {
                                                <div
                                                    className={markerContainer({
                                                        type: suggestion.type as
                                                            | 'Hospital Geral'
                                                            | 'Unidade Básica de Saúde'
                                                            | 'Unidade de Pronto Atendimento',
                                                        size: 'xs',
                                                        square: true,
                                                    })}
                                                >
                                                    {suggestion.type ===
                                                        'Hospital Geral' && (
                                                        <HospitalIcon weight="fill" />
                                                    )}
                                                    {suggestion.type ===
                                                        'Unidade Básica de Saúde' && (
                                                        <FirstAidIcon weight="fill" />
                                                    )}
                                                    {suggestion.type ===
                                                        'Unidade de Pronto Atendimento' && (
                                                        <AmbulanceIcon weight="fill" />
                                                    )}
                                                </div>
                                            }
                                            {suggestion.name}
                                            <ArrowUpRightIcon weight="bold" />
                                        </motion.button>
                                    ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence mode="sync">
                {data && data.length > 0 ? (
                    <motion.div
                        className={css({
                            width: '100%',
                            maxWidth: '1280px',
                            padding: {
                                md: '0 1rem',
                                base: '1rem',
                            },
                        })}
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div
                            className={css({
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center',
                            })}
                        >
                            <Button variant="bordered">
                                <CrosshairIcon /> Seu local <CaretDownIcon />
                            </Button>
                            <Button variant="bordered">
                                <ArrowsDownUpIcon /> Mais próximos{' '}
                                <CaretDownIcon />
                            </Button>
                            <Paragraph size="caption" subtle>
                                {data.length} resultados
                            </Paragraph>
                        </div>
                        <Divider margin="compact" />
                        <div
                            className={css({
                                alignItems: 'flex-start',
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: '1rem',
                            })}
                        >
                            {data.map((establishment, index) => (
                                <Link
                                    href={`/estabelecimento/${establishment.cnes}`}
                                    key={establishment.cnes}
                                    className={css({
                                        paddingY: '1rem',
                                        width: '100%',
                                        gap: '.25rem',
                                        borderBottom: '1px solid',
                                        borderColor: 'neutral.50',

                                        _hover: {
                                            '& b': {
                                                color: 'oklch(0.543 0.196 252.7)',
                                                textDecoration: 'underline',
                                                textDecorationColor:
                                                    'oklch(0.950 0.024 252.7)',
                                                textDecorationThickness: '2px',
                                                textUnderlineOffset: '3px',
                                            },
                                        },
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '0.75rem',
                                            alignItems: 'center',
                                        })}
                                    >
                                        <span
                                            className={css({
                                                display: 'flex',
                                                gap: '0.5rem',
                                                alignItems: 'center',
                                                marginBottom: '0.25rem',
                                            })}
                                        >
                                            <div
                                                className={markerContainer({
                                                    type: establishment.type as
                                                        | 'Hospital Geral'
                                                        | 'Unidade Básica de Saúde'
                                                        | 'Unidade de Pronto Atendimento',
                                                    size: 'xs',
                                                    square: true,
                                                })}
                                            >
                                                {establishment.type ===
                                                    'Hospital Geral' && (
                                                    <HospitalIcon weight="fill" />
                                                )}
                                                {establishment.type ===
                                                    'Unidade Básica de Saúde' && (
                                                    <FirstAidIcon weight="fill" />
                                                )}
                                                {establishment.type ===
                                                    'Unidade de Pronto Atendimento' && (
                                                    <AmbulanceIcon weight="fill" />
                                                )}
                                            </div>
                                            <Paragraph
                                                size="caption"
                                                marginCompact
                                            >
                                                {establishment.type}
                                            </Paragraph>
                                        </span>
                                    </div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        })}
                                    >
                                        <div
                                            className={css({
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                            })}
                                        >
                                            <b
                                                className={css({
                                                    fontWeight: 500,
                                                    fontSize: '1.125rem',
                                                    color: 'oklch(0.643 0.196 252.7)',
                                                })}
                                            >
                                                {establishment.name}
                                            </b>
                                            {coords && (
                                                <div
                                                    className={css({
                                                        display: 'flex',
                                                        gap: '0.25rem',
                                                        alignItems: 'center',
                                                        marginTop: '0.25rem',
                                                    })}
                                                >
                                                    <span
                                                        className={css({
                                                            fontSize:
                                                                '0.875rem',
                                                            color: 'green.600',
                                                        })}
                                                    >
                                                        A{' '}
                                                        {formatDistance(
                                                            calculateDistance(
                                                                coords?.latitude,
                                                                coords?.longitude,
                                                                establishment
                                                                    .geolocation
                                                                    ?.latitude,
                                                                establishment
                                                                    .geolocation
                                                                    ?.longitude
                                                            )
                                                        )}{' '}
                                                        de distância
                                                    </span>
                                                    {index === 0 && (
                                                        <div
                                                            className={css({
                                                                padding:
                                                                    '4px 8px',
                                                                backgroundColor:
                                                                    'green.50',
                                                                fontSize:
                                                                    '0.875rem',
                                                                lineHeight: '1',
                                                                marginY:
                                                                    '0.25rem',
                                                                borderRadius:
                                                                    '9999px',
                                                                color: 'green.700',
                                                                fontWeight: 500,
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                                gap: '0.25rem',
                                                            })}
                                                        >
                                                            <MapPinIcon weight="bold" />
                                                            <p>
                                                                Mais próximo de
                                                                você
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={css({
                                                display: 'flex',
                                                gap: '1rem',
                                                alignItems: 'center',
                                            })}
                                        >
                                            <Button
                                                variant="bordered"
                                                iconButton
                                            >
                                                <MapTrifoldIcon />
                                            </Button>
                                            <Button
                                                variant="bordered"
                                                iconButton
                                            >
                                                <CaretRightIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <Banner
                                icon={<QuestionIcon />}
                                title="Não sabe onde ir?"
                                message={
                                    'Com o Onde Ir você sabe qual o melhor estabelecimento pra você a partir dos seus sintomas.'
                                }
                            />
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <NoResultsEmptyState query={localQuery} />
                    </motion.div>
                ) : isLoading ? (
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        })}
                    >
                        <CircleNotchIcon
                            className={css({
                                animation: 'spin',
                                color: 'neutral.300',
                            })}
                            weight="bold"
                            size={32}
                        />
                    </div>
                ) : (
                    <motion.div
                        exit={{ opacity: 0 }}
                        transition={{ delay: 1 }}
                        className={css({
                            width: '100%',
                            maxWidth: '800px',
                            position: 'relative',
                        })}
                    >
                        <NearEstablishmentsBanner />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
