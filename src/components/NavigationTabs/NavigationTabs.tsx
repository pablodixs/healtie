import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

interface NavigationTabsProps {
    children: ReactNode
}

export function NavigationTabs({ children }: NavigationTabsProps) {
    return <section className={navigationTabsContainer}>{children}</section>
}

const navigationTabsContainer = css({
    display: 'flex',
    marginY: '1rem',
    gap: '2rem',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
})
