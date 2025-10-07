import { HTMLAttributes, ReactNode } from 'react'
import { buttonStyles } from './styles'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'subtle' | 'text' | 'ghost'
    size?: 'small' | 'medium' | 'large'
    iconButton?: boolean
    fullWidth?: boolean
}

export function Button({
    children,
    variant = 'primary',
    size = 'medium',
    iconButton = false,
    fullWidth = false,
    ...props
}: ButtonProps) {
    return (
        <button
            className={buttonStyles({ variant, size, iconButton, fullWidth })}
            {...props}
        >
            {children}
        </button>
    )
}
