import {
    HospitalIcon,
    HouseSimpleIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react/dist/ssr'
import { NavbarLink } from './NavbarLink'
import { Button } from '../Button'
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
            <NavbarLink href="/">Entrar</NavbarLink>
            <Button variant="secondary">Criar conta</Button>
        </nav>
    )
}

const navbarItemsContainer = css({
    width: '100%',
    display: {
        md: 'flex',
        base: 'none',
    },
    flexDirection: { md: 'row', base: 'column' },
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '0 auto',
})
