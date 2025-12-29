import { css, cva } from '../../../styled-system/css'

export const inputStyles = cva({
    base: {
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        transition: 'all 0.1s ease-in-out',
        marginBottom: '1rem',
        backgroundColor: 'neutral.100',
        outline: '0px solid',
        outlineColor: 'transparent',
        fontWeight: 500,
        color: 'primary',
        appearance: 'none',

        _focus: {
            outline: '2px solid',
            outlineOffset: '2px',
            outlineColor: 'oklch(0.796 0.105 252.7)',
            backgroundColor: 'oklch(0.950 0.024 252.7)',
        },

        _hover: {
            '&:not(:focus)': {
                outline: '2px solid',
                outlineOffset: '2px',
                outlineColor: 'oklch(0.950 0.024 252.7)',
            },
        },
    },
    variants: {
        fullWidth: {
            true: { width: '100%' },
        },
        size: {
            md: {},
            lg: {
                padding: '0.75rem 1.5rem',
                fontSize: '1.125rem',
                lineHeight: '1.75rem',
            },
        },
    },
})

export const selectStyles = css({
    padding: '0.5rem 1rem',
    paddingRight: '2rem',
    borderRadius: '9999px',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    transition: 'all 0.1s ease-in-out',
    marginBottom: '1rem',
    backgroundColor: 'neutral.100',
    outline: '0px solid',
    outlineColor: 'transparent',
    fontWeight: 500,
    appearance: 'none',
    cursor: 'pointer',
    color: 'primary',
    backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%233498db' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'%3E%3C/path%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '1.125rem',

    _hover: {
        '&:not(:focus)': {
            outline: '2px solid',
            outlineOffset: '2px',
            outlineColor: 'oklch(0.950 0.024 252.7)',
        },

        _disabled: {
            outline: '0',
            outlineOffset: '0',
            outlineColor: 'transparent',
        },
    },

    _focus: {
        outline: '2px solid',
        outlineOffset: '2px',
        outlineColor: 'oklch(0.796 0.105 252.7)',
        backgroundColor: 'oklch(0.950 0.024 252.7)',
    },

    _disabled: {
        cursor: 'not-allowed',
        backgroundColor: 'neutral.200',
        color: 'neutral.700',

        _active: {
            scale: 1,
        },
    },
})
