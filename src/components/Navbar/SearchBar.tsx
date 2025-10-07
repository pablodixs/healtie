import { InputHTMLAttributes } from 'react'
import { FadersIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../styled-system/css'

import { Tooltip } from '../Tooltip'

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBar({ ...props }: SearchBarProps) {
    return (
        <div className={searchBarContainer}>
            <Tooltip content="Buscar" placement="bottom">
                <button>
                    <MagnifyingGlassIcon weight="bold" />
                </button>
            </Tooltip>
            <input {...props} type="search" autoComplete="false" />
            <Tooltip content="Filtrar" placement="bottom">
                <button>
                    <FadersIcon />
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

        '& svg': {
            fontSize: '1.125rem',
        },

        _hover: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
    },
})
