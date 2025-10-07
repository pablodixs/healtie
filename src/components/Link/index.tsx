import { ComponentProps } from 'react'
import NextLink from 'next/link'
import { cva } from '../../../styled-system/css'

type LinkProps = ComponentProps<typeof NextLink> & {
    variant?: 'text' | 'primary' | 'asChild'
}

export function Link(props: LinkProps) {
    return (
        <NextLink className={linkStyle({ variant: props.variant })} {...props}>
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
            scale: 1.05,
            backgroundColor: '#202020',
        },
    },
    variants: {
        variant: {
            primary: {
                backgroundColor: 'tint',
            },
            text: {
                backgroundColor: 'transparent',
                color: 'primary',

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
        },
    },
})
