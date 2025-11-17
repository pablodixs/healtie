'use client'

import { InputHTMLAttributes } from 'react'
import {
    CircleNotchIcon,
    FadersIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../styled-system/css'

import { Tooltip } from '../Tooltip'
import { AnimatePresence, motion } from 'motion/react'

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    isLoading?: boolean
}

export function SearchBar({ isLoading, ...props }: SearchBarProps) {
    return (
        <div className={searchBarContainer}>
            <Tooltip content="Buscar" placement="bottom">
                <button>
                    <MagnifyingGlassIcon weight="bold" />
                </button>
            </Tooltip>
            <input {...props} type="search" autoComplete="false" />
            <Tooltip
                content={isLoading ? 'Carregando...' : 'Filtrar'}
                placement="bottom"
            >
                <button>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    filter: 'blur(2px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    filter: 'blur(2px)',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <CircleNotchIcon
                                    className={css({
                                        animation: 'spin',
                                        color: 'neutral.500',
                                    })}
                                    size={18}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="filter"
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    filter: 'blur(2px)',
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.8,
                                    filter: 'blur(2px)',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <FadersIcon />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </Tooltip>
        </div>
    )
}

const searchBarContainer = css({
    display: {
        md: 'flex',
        base: 'none',
    },
    alignItems: 'center',
    gap: '0.25rem',
    bgColor: 'rgba(246,247,249, 0.9)',
    borderRadius: 'full',
    padding: '.25rem',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
    flex: 1,

    '& input': {
        fontWeight: 500,
        fontSize: '0.9375rem',
        marginRight: '0.5rem',
        lineHeight: 1,
        flex: 1,

        _focus: {
            outline: 'none',
        },
    },

    '& button': {
        padding: '.5rem',
        cursor: 'pointer',
        borderRadius: 'full',
        color: 'primary',
        transition: 'all ease 0.2s',
        aspectRatio: '1 / 1',

        '& svg': {
            fontSize: '1.125rem',
        },

        _hover: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
    },
})
