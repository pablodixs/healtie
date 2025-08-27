import {
    HospitalIcon,
    HouseSimpleIcon,
    MapTrifoldIcon,
    PathIcon,
} from '@phosphor-icons/react/dist/ssr'
import { NavbarLink } from './NavbarLink'
import { navbarContainer } from './styles'
import { SearchBar } from './SearchBar'
import { Button } from '../Button'

export function Navbar() {
    return (
        <section className={navbarContainer}>
            <div className="logo-search">
                <h1>Healtie</h1>
                <SearchBar placeholder="Buscar" />
            </div>
            <nav>
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
                <Button>Criar conta</Button>
            </nav>
        </section>
    )
}
