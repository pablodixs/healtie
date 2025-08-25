import { HTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from './styles'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'subtle' | 'text'
    size?: 'small' | 'medium' | 'large'
}

export function Button({
    children,
    variant = 'primary',
    size = 'medium',
    ...props
}: ButtonProps) {
    return (
        <button className={buttonStyles({ variant, size })} {...props}>
            {children}
        </button>
    )
}
