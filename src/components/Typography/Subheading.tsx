import { HTMLAttributes, ReactNode } from 'react'
import { cva } from '../../../styled-system/css'

interface SubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
    centered?: boolean
    children: ReactNode
}

export function Subheading({ children, centered, ...props }: SubheadingProps) {
    return (
        <h1 className={subHeadingStyles({ centered })} {...props}>
            {children}
        </h1>
    )
}

const subHeadingStyles = cva({
    base: {
        fontSize: {
            md: '1.75rem',
            base: '1.5rem',
        },
        color: '#151515',
        fontWeight: '550',
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
