import { cva } from '../../../styled-system/css'

export const buttonStyles = cva({
    base: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: 'full',
        fontWeight: '500',
        lineHeight: 'short',
        transition: 'background-color 0.2s ease',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.75rem',

        '& svg': {
            fontSize: '1.125rem',
        },
    },
    variants: {
        variant: {
            primary: {
                backgroundColor: 'tint',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'blue.600',
                },
            },
            secondary: {
                backgroundColor: 'primary',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#151515',
                },
            },
            subtle: {
                backgroundColor: 'cream',
                color: '#151515',
            },
            text: {
                backgroundColor: 'transparent',
                color: 'primary',
                padding: 0,
                transition: 'all ease 150ms',

                _hover: {
                    color: '#202020',
                },
            },
        },
        size: {
            small: {
                fontSize: 'xs',
                padding: '0.5rem 0.75rem',
            },
            medium: {
                padding: {
                    lg: '0.5rem 1rem',
                    base: '0.75rem 1rem',
                },
            },
            large: {
                padding: '1rem 1.5rem',
            },
        },
    },
})
