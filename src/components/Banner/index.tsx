'use client'

import { JSX, ReactNode } from 'react'
import { bannerStyles } from './styles'
import { Button } from '../Button'
import { XCircleIcon } from '@phosphor-icons/react/dist/ssr'

interface BannerProps {
    title: string
    message?: JSX.Element | string
    actionLabel?: string
    actionIcon?: ReactNode
    secondaryAction?: ReactNode
    icon?: ReactNode
    action?: () => void
    onClose?: () => void
}

export function Banner({
    title,
    message,
    actionLabel,
    icon,
    actionIcon,
    action,
    onClose,
}: BannerProps) {
    return (
        <div className={bannerStyles()}>
            <div>
                {icon && <div>{icon}</div>}
                <div>
                    <h2>{title}</h2>
                    {message}
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
