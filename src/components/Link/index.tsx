import { ComponentProps } from 'react'
import NextLink from 'next/link'
import { cva } from '../../../styled-system/css'

type LinkProps = ComponentProps<typeof NextLink> & {
    variant?: 'text' | 'primary' | 'asChild' | 'subtle' | 'textSubtle'
    fullWidth?: boolean
    onlyIcon?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export function Link({
    variant,
    fullWidth = false,
    onlyIcon = false,
    size = 'md',
    ...props
}: LinkProps) {
    return (
        <NextLink
            className={linkStyle({
                variant,
                fullWidth,
                onlyIcon,
                size,
            })}
            {...props}
        >
            {props.children}
        </NextLink>
    )
}

const linkStyle = cva({
    base: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: 'full',
        fontWeight: '500',
        lineHeight: 'short',
        transition: 'all 0.2s cubic-bezier(.47,1.64,.41,.8)',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary',
        color: 'white',
        gap: '.75rem',
        padding: '.5rem 1rem',

        '& svg': {
            fontSize: '1.125rem',
        },

        _hover: {
            scale: 1.025,
            backgroundColor: '#202020',
        },

        _active: {
            scale: 0.975,
        },
    },
    variants: {
        variant: {
            primary: {
                backgroundColor: 'tint',
            },
            text: {
                backgroundColor: 'transparent',
                color: 'tint',
                padding: 'inherit',
                gap: '.25rem',
                borderRadius: 0,

                _hover: {
                    scale: 1,
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                },
            },
            textSubtle: {
                backgroundColor: 'transparent',
                color: 'primary',
                padding: 'inherit',
                gap: '.25rem',
                borderRadius: 0,

                _hover: {
                    scale: 1,
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                },
            },
            asChild: {
                backgroundColor: 'inherit',
                color: 'inherit',
                fontSize: 'inherit',
                display: 'block',
                fontWeight: 'inherit',
                padding: 'inherit',

                _hover: {
                    backgroundColor: 'inherit',
                    scale: 'inherit',
                    opacity: '0.75',
                },
            },
            subtle: {
                backgroundColor: 'cream',
                color: 'primary',

                _hover: {
                    backgroundColor: 'cream',
                    color: 'inherit',
                },
            },
        },
        size: {
            sm: { fontSize: '0.875rem' },
            md: {
                fontSize: '1rem',
            },
            lg: { fontSize: '1.125rem' },
        },
        fullWidth: {
            true: {
                width: '100%',
                flex: 1,
            },
        },
        onlyIcon: {
            true: {
                minWidth: '42px',
                padding: '.5rem',
                aspectRatio: 'square',
            },
        },
    },
})
