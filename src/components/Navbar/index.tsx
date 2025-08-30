'use client'

import { navbarContainer } from './styles'
import { NavbarItems } from './NavbarItems'
import { LayoutStack } from '../Stacks'

export function Navbar() {
    return (
        <LayoutStack className={navbarContainer}>
            <section className="sidebar">
                <NavbarItems />
            </section>
        </LayoutStack>
    )
}
