'use client'

import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

import { Navbar } from '@/components/Navbar'

interface MainLayoutProps {
    children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Navbar />
            <div className={contentContainer}>{children}</div>
        </>
    )
}

const contentContainer = css({
    borderRadius: '8px',
    paddingTop: '5rem',
    backgroundColor: 'white',
    width: '100%',
    minHeight: '100vh',
})
