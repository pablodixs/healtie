import {
    MagnifyingGlassIcon,
    MapTrifoldIcon,
    CompassIcon,
    HouseIcon,
} from '@phosphor-icons/react/dist/ssr'

export const NAV_LINKS = [
    { href: '/', label: 'Início', Icon: HouseIcon, key: 'home' },
    { href: '/mapa', label: 'Mapa', Icon: MapTrifoldIcon, key: 'map' },
    { href: '/onde-ir', label: 'Onde ir', Icon: CompassIcon, key: 'where' },
    {
        href: '/buscar',
        label: 'Buscar',
        Icon: MagnifyingGlassIcon,
        key: 'search',
    },
]
