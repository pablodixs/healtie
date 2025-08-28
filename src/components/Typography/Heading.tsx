import { HTMLAttributes, ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    centered?: boolean
    children: ReactNode
}

export function Heading({ children, centered, ...props }: HeadingProps) {
    return (
        <h1 className={headingStyles({ centered })} {...props}>
            {children}
        </h1>
    )
}

const headingStyles = cva({
    base: {
        fontSize: {
            base: '2rem',
            md: '2.625rem',
        },
        color: '#151515',
        fontWeight: '550    ',
        lineHeight: 'tight',
        letterSpacing: 'tight',
        textWrap: 'balance',
    },
    variants: {
        centered: {
            true: {
                textAlign: 'center',
            },
        },
    },
})
