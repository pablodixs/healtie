'use client'

import {
    ArrowUpRightIcon,
    CircleNotchIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { css } from '../../../styled-system/css'

import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Link as CustomLink } from '@/components/Link'

import { EstablishmentPointResponse } from '@/interfaces/Establishment'
import useSWR from 'swr'
import { fetcher } from '@/lib/swrFetcher'
import { MapMarkerDecoration } from '@/components/Map/MapMarkerDecoration'
import { Subheading } from '@/components/Typography'

const FILTER_OPTIONS = {
    HOSPITAL: { label: 'hospitais' },
    UPA: { label: 'UPAs' },
    UBS: { label: 'postos de saúde' },
    null: { label: 'todo o Healtie' },
}

export function HeroSearchContainer() {
    const [debounced, setDebounced] = useState('')
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false)
    const [filterValue, setFilterValue] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const { data, isLoading, error } = useSWR<EstablishmentPointResponse[]>(
        debounced && debounced.length >= 3
            ? `https://healtie.app/v1/establishment/search?q=${encodeURIComponent(
                  debounced
              )}${filterValue ? `&filter=${encodeURIComponent(filterValue)}` : ''}&limit=5`
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
        }
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounced(searchValue)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchValue, filterValue])

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setSearchValue('')
            setIsSearchBarFocused(false)
        }
    }

    return (
        <div className={heroContainer}>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: 1,
                    textAlign: 'center',
                })}
            >
                <AnimatePresence initial={false}>
                    {!isSearchBarFocused && searchValue.length === 0 && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                                filter: 'blur(16px)',
                                y: 30,
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                filter: 'blur(0px)',
                                y: 0,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                filter: 'blur(16px)',
                                y: 30,
                            }}
                            transition={{ duration: 0.2 }}
                            style={{ marginBottom: '1rem' }}
                        >
                            <Link
                                title="Campanha Nacional de Vacinação"
                                href={'/campanhas/N202510001'}
                            >
                                <Image
                                    src={'/pictures/doodles/2025_november.png'}
                                    alt=""
                                    width={800}
                                    height={320}
                                    quality={100}
                                    draggable={false}
                                    priority
                                />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
                <HeroSearchBar
                    showFilterOptions={isSearchBarFocused || searchValue != ''}
                    filterValue={filterValue}
                    onFilterChange={setFilterValue}
                    isInputFocused={isSearchBarFocused}
                    onInputFocusChange={setIsSearchBarFocused}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <AnimatePresence>
                    {(searchValue !== '' || isSearchBarFocused) && (
                        <>
                            {searchValue.length === 0 && isSearchBarFocused ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transition: {
                                            delay: 0.5,
                                        },
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                >
                                    <Paragraph centered subtle>
                                        Digite na barra de busca por hospitais,
                                        UPAs e postos de saúde.
                                    </Paragraph>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                    }}
                                    className={resultsContainer}
                                >
                                    <header>
                                        <Paragraph>
                                            Buscando por{' '}
                                            {
                                                FILTER_OPTIONS[
                                                    filterValue as keyof typeof FILTER_OPTIONS
                                                ]?.label
                                            }
                                        </Paragraph>
                                        <Paragraph subtle>
                                            {(data && data.length) || 0}{' '}
                                            resultados
                                        </Paragraph>
                                    </header>
                                    <div className="results_list">
                                        {data?.map((establishment) => (
                                            <Link
                                                href={`/estabelecimento/${establishment.cnes}`}
                                                key={establishment.cnes}
                                                className={css({
                                                    width: '100%',
                                                    borderRadius: '12px',
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    gap: '.75rem',
                                                    textAlign: 'left',
                                                    mb: '.75rem',
                                                    padding: '.75rem',
                                                    _hover: {
                                                        background:
                                                            'neutral.100',
                                                    },
                                                })}
                                            >
                                                <MapMarkerDecoration
                                                    establishmentType={
                                                        establishment.type as
                                                            | 'Unidade Básica de Saúde'
                                                            | 'Hospital Geral'
                                                            | 'Unidade de Pronto Atendimento'
                                                    }
                                                />
                                                <div
                                                    className={css({ flex: 1 })}
                                                >
                                                    <b
                                                        className={css({
                                                            fontWeight: 500,
                                                        })}
                                                    >
                                                        {establishment.name}
                                                    </b>
                                                </div>
                                            </Link>
                                        ))}
                                        {isLoading && (
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
                                        )}
                                        {error && !isLoading && (
                                            <div>
                                                <Subheading>
                                                    Não encontramos nada...
                                                </Subheading>
                                                <Paragraph subtle centered>
                                                    Verifique os termos da
                                                    pesquisa e tente novamente.
                                                </Paragraph>
                                            </div>
                                        )}
                                    </div>
                                    <footer>
                                        <CustomLink
                                            href={
                                                `/buscar?q=${searchValue}` +
                                                (filterValue
                                                    ? `&filter=${filterValue}`
                                                    : '')
                                            }
                                            variant="text"
                                        >
                                            Ver todos os resultados{' '}
                                            <ArrowUpRightIcon />
                                        </CustomLink>
                                    </footer>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
            <SearchTags />
        </div>
    )
}

const heroContainer = css({
    height: 'calc(100dvh - 6.25rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',

    '& img': {
        base: {
            width: 'auto',
            maxWidth: '600px',
        },
        md: {
            width: '800px',
            height: 'auto',
        },
    },
})

const resultsContainer = css({
    width: '100%',
    height: '100%',
    maxHeight: '500px',
    display: 'flex',
    flexDirection: 'column',

    '& header': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
    },

    '& .results_list': {
        flex: 1,
        overflowY: 'auto',
    },

    '& footer': {
        borderTop: '1px solid',
        borderColor: 'background',
    },
})
