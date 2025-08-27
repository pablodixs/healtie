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
import { Logo } from '../Logo'
import { MobileNav } from './MobileNav'
import { NavbarItems } from './NavbarItems'

export function Navbar() {
    return (
        <section className={navbarContainer}>
            <div className="logo-search">
                <Logo />
                <SearchBar placeholder="Buscar" />
                <MobileNav />
            </div>
            <NavbarItems />
        </section>
    )
}
