'use client'

import { HTMLAttributes, JSX, ReactNode } from 'react'
import { bannerStyles } from './styles'
import { Button } from '../Button'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
    title: string
    message?: JSX.Element | string
    actionLabel?: string
    actionIcon?: ReactNode
    secondaryAction?: ReactNode
    variant?: 'info' | 'success' | 'error'
    size?: 'sm' | 'md'
    icon?: ReactNode
    action?: () => void
    onClose?: () => void
}

export function Banner({
    variant = 'info',
    size = 'md',
    title,
    message,
    actionLabel,
    icon,
    actionIcon,
    action,
    onClose,
    ...props
}: BannerProps) {
    return (
        <div className={bannerStyles({ variant, size })} {...props}>
            <div>
                {icon && <div>{icon}</div>}
                <div>
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>
            </div>
            <div>
                {action && actionLabel && (
                    <Button variant="primary" onClick={action}>
                        {actionIcon && actionIcon}
                        {actionLabel}
                    </Button>
                )}
                {onClose && (
                    <Button variant="text" onClick={onClose}>
                        <XCircleIcon /> Fechar
                    </Button>
                )}
            </div>
        </div>
    )
}
