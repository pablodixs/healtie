'use client'

import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, stagger } from 'motion/react'
import {
    AmbulanceIcon,
    ArrowUpRightIcon,
    FirstAidIcon,
    HospitalIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react'

import { css } from '../../../../styled-system/css'

import { SuggestionResponse } from '@/interfaces/SearchSuggestions'

import { markerContainer } from '@/components/Map/maker.styles'

interface SearchSuggestionsProps {
    localQuery: string
    inputFocused: boolean | undefined
    suggestions: SuggestionResponse[] | null
    handleSearch: () => void
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
} as const

export function SearchSuggestions({
    suggestions,
    localQuery,
    inputFocused,
    handleSearch,
}: SearchSuggestionsProps) {
    const router = useRouter()

    return (
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
                    className={suggestionsWrapper}
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
    )
}

const suggestionsWrapper = css({
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
        transition: 'border-color 0.1s',

        _hover: {
            borderColor: 'rgba(0, 0, 0, 0.2)',
        },
    },
})
