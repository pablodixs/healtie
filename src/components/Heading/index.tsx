import { HTMLAttributes } from 'react'
import { cva } from '../../../styled-system/css'

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export function Heading({ children, ...props }: HeadingProps) {
    return (
        <h1 className={headingStyles()} {...props}>
            {children}
        </h1>
    )
}

const headingStyles = cva({
    base: {
        fontSize: '2rem',
        color: 'primary',
        fontWeight: '550',
        lineHeight: 'short',
        letterSpacing: 'tight',
    },
})
