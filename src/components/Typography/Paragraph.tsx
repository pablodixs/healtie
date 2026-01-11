import { HTMLAttributes, ReactNode } from 'react'

import { cva } from '../../../styled-system/css'

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode
    subtle?: boolean
    centered?: boolean
    size?: 'subheadline' | 'body' | 'caption'
    bolder?: boolean
    compact?: boolean
    marginCompact?: boolean
    variant?: 'default' | 'highlighted' | 'danger'
}

export function Paragraph({
    children,
    subtle,
    centered,
    size = 'body',
    bolder,
    compact,
    marginCompact,
    variant = 'default',
    ...props
}: ParagraphProps) {
    return (
        <p
            className={paragraphStyles({
                subtle,
                centered,
                size,
                bolder,
                compact,
                marginCompact,
                variant,
            })}
            {...props}
        >
            {children}
        </p>
    )
}

const paragraphStyles = cva({
    base: {
        fontSize: '1rem',
        color: 'primary',
        lineHeight: 'normal',
        margin: '.75rem 0',
        textWrap: 'pretty',

        '& b': {
            fontWeight: 500,
        },
    },
    variants: {
        subtle: {
            true: {
                color: 'neutral.500',
            },
        },
        centered: {
            true: {
                textAlign: 'center',
            },
        },
        bolder: {
            true: {
                fontWeight: 500,
            },
        },
        size: {
            subheadline: {
                fontSize: '1.125rem',
                lineHeight: 'short',
                letterSpacing: '-0.01em',
            },
            body: {
                fontSize: '1rem',
                lineHeight: 'normal',
            },
            caption: {
                fontSize: '0.875rem',
                lineHeight: 'normal',
            },
        },
        compact: {
            true: {
                maxWidth: '70ch',
            },
        },
        marginCompact: {
            true: {
                margin: '.25rem 0',
            },
        },
        variant: {
            highlighted: {
                color: 'tint',
            },
            default: {},
            danger: {
                color: 'red.600',
            },
        },
    },
})
