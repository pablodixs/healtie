import { InputHTMLAttributes } from 'react'
import { css } from '../../../styled-system/css'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>

export function SearchBar({ ...props }: SearchBarProps) {
    return (
        <div className={searchBarContainer}>
            <button>
                <MagnifyingGlassIcon />
            </button>
            <input {...props} type="search" autoComplete="false" />
        </div>
    )
}

const searchBarContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    bgColor: 'background',
    borderRadius: 'full',
    padding: '.25rem',

    '& input': {
        fontWeight: 500,
        fontSize: '0.9375rem',
        marginRight: '0.5rem',
        lineHeight: 1,

        _focus: {
            outline: 'none',
        },
    },

    '& button': {
        padding: '.5rem',
        cursor: 'pointer',
        borderRadius: 'full',
        color: 'primary',

        '& svg': {
            fontSize: '1.125rem',
        },

        _hover: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
    },
})
