import { navbarContainer } from './styles'
import { SearchBar } from './SearchBar'
import { Logo } from '../Logo'
import { MobileNav } from './MobileNav'
import { NavbarItems } from './NavbarItems'
import { LayoutStack } from '../Stacks'

export function Navbar() {
    return (
        <LayoutStack className={navbarContainer}>
            <div className="logo-search">
                <Logo />
                <SearchBar placeholder="Buscar" />
                <MobileNav />
            </div>
            <NavbarItems />
        </LayoutStack>
    )
}
