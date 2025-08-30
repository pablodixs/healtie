import {
    HospitalIcon,
    HouseSimpleIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react/dist/ssr'
import { NavbarLink } from './NavbarLink'
import { css } from '../../../styled-system/css'

export function NavbarItems() {
    return (
        <nav className={navbarItemsContainer}>
            <NavbarLink href="/">
                <HouseSimpleIcon /> Página Inicial
            </NavbarLink>
            <NavbarLink href="/">
                <MapTrifoldIcon /> Mapa
            </NavbarLink>
            <NavbarLink href="/">
                <HospitalIcon /> Estabelecimentos
            </NavbarLink>
            <NavbarLink href="/onde-ir">
                <PathIcon /> Onde Ir
            </NavbarLink>
            <span className="vr" />
        </nav>
    )
}

const navbarItemsContainer = css({
    display: 'flex',
    flexDirection: { base: 'row', md: 'column' },
    gap: '1rem',
    margin: '0 auto',
})
