'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { css } from '../../../styled-system/css'

import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'
import { Subheading } from '@/components/Typography/Subheading'
import { Paragraph } from '@/components/Typography/Paragraph'

import data from '@/utils/unidades.json'
import { Link } from '@/components/Link'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import { MapTrifoldIcon } from '@phosphor-icons/react'
import { Divider } from '@/components/Divider'

const FILTER_OPTIONS = {
    HOSPITAL: { label: 'hospitais' },
    UPA: { label: 'UPAs' },
    UBS: { label: 'postos de saúde' },
    null: { label: 'todo o Healtie' },
}

export function HeroSearchContainer() {
    const router = useRouter()

    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false)
    const [filterValue, setFilterValue] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [filteredEstablishments, setFilteredEstablishments] = useState<
        typeof data | null
    >(null)

    // Executar busca automaticamente quando searchValue ou filterValue mudar
    useEffect(() => {
        const handleFilterEstablishments = () => {
            const filtered = data.establishments.filter((establishment) => {
                const matchesFilter =
                    filterValue === null || establishment.abb === filterValue
                const matchesSearch = establishment.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                return matchesFilter && matchesSearch
            })
            setFilteredEstablishments({ establishments: filtered })
        }

        if (searchValue.length > 0 || filterValue !== null) {
            handleFilterEstablishments()
        } else {
            setFilteredEstablishments(null)
        }
    }, [searchValue, filterValue])

    function handleSearchAction() {
        router.push(
            `/buscar?q=${searchValue}` +
                (filterValue ? `&filter=${filterValue}` : '')
        )
    }

    const handleFilterEstablishments = () => {
        const filtered = data.establishments.filter((establishment) => {
            const matchesFilter =
                filterValue === null || establishment.abb === filterValue
            const matchesSearch = establishment.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            return matchesFilter && matchesSearch
        })
        setFilteredEstablishments({ establishments: filtered })
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleFilterEstablishments()
        }
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
                        >
                            <Link
                                title="Campanha Nacional de Vacinação"
                                href={'/campanhas/N202510001'}
                                variant="asChild"
                            >
                                <Image
                                    src={'/pictures/doodle.png'}
                                    alt=""
                                    width={800}
                                    height={320}
                                    quality={100}
                                    draggable={false}
                                    priority
                                />
                            </Link>
                            <Subheading
                                centered
                                style={{ marginBottom: '1rem' }}
                            >
                                Seu guia na saúde pública do Distrito Federal
                            </Subheading>
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
                    searchAction={handleSearchAction}
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
                                            {filteredEstablishments
                                                ?.establishments.length ||
                                                0}{' '}
                                            resultados
                                        </Paragraph>
                                    </header>
                                    <div className="results_list">
                                        {filteredEstablishments?.establishments.map(
                                            (establishment) => (
                                                <div key={establishment.cnes}>
                                                    <div
                                                        className={
                                                            establishmentItem
                                                        }
                                                    >
                                                        <Link
                                                            variant="asChild"
                                                            href={`/estabelecimento/${establishment.cnes}`}
                                                        >
                                                            <h1>
                                                                {
                                                                    establishment.name
                                                                }
                                                            </h1>
                                                            <span>
                                                                {
                                                                    establishment.district
                                                                }
                                                                ,{' '}
                                                                {
                                                                    establishment.city
                                                                }
                                                            </span>
                                                        </Link>
                                                        <Link
                                                            variant="textSubtle"
                                                            href={`/mapa?establishment=${establishment.cnes}&lat=${establishment.location.latitude}&long=${establishment.location.longitude}&from=search-page`}
                                                        >
                                                            <MapTrifoldIcon />{' '}
                                                            Ver no Mapa
                                                        </Link>
                                                    </div>
                                                    <Divider />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <footer>
                                        <Link
                                            href={
                                                `/buscar?q=${searchValue}` +
                                                (filteredEstablishments
                                                    ?.establishments.length
                                                    ? `&filter=${filterValue}`
                                                    : '')
                                            }
                                            variant="text"
                                        >
                                            Ver todos os resultados{' '}
                                            <ArrowUpRightIcon />
                                        </Link>
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

const establishmentItem = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',

    '& span': {
        fontSize: '0.875rem',
        color: 'gray.500',
    },
})
