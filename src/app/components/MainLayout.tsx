import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

import { Navbar } from '@/components/Navbar'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={mainLayoutContainer}>
            <Navbar />
            <div className={contentContainer}>{children}</div>
        </div>
    )
}

const mainLayoutContainer = css({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    backgroundColor: 'white',
    minHeight: '100vh',
    width: '100%',
    padding: '0.5rem',
})

const contentContainer = css({
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: 'white',
    width: '100%',
    maxHeight: 'calc(100vh - 1rem)',
    overflowY: 'auto',
})
