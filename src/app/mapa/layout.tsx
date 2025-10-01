import { Metadata } from 'next'

import { css } from '../../../styled-system/css'

import { MapComponent } from './components/Map'
import { Logo } from '@/components/Logo'

export const metadata: Metadata = {
    title: 'Mapa - Healtie',
    description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={mainContainer}>
            <section className={styles}>{children}</section>
            <MapComponent />
            <div
                className={css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'background',
                    zIndex: -1,
                })}
            >
                <Logo style={{ scale: 1.5, opacity: 0.25 }} />
            </div>
        </main>
    )
}

const mainContainer = css({
    position: 'relative',
    height: '100dvh',
})

const styles = css({
    position: 'absolute',
    top: 'header',
    left: 0,
    width: '30%',
    zIndex: 1,
    backgroundColor: 'white',
    boxShadow: 'xl',
    marginLeft: '1rem',
    padding: '1rem',
    borderRadius: '32px',
})
