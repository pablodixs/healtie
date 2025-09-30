import { Metadata } from 'next'
import { MapComponent } from './components/Map'
import { css } from '../../../styled-system/css'

export const metadata: Metadata = {
    title: 'Mapa - Healtie',
    description: '',
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className={mainContainer}>
            <section className={styles}>{children}</section>
            <MapComponent />
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
