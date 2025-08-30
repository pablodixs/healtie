import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { Button } from '@/components/Button'

export function HeroSearchBar() {
    return (
        <div className={heroSearchBarContainer}>
            <div className={searchBarContainer}>
                <input
                    type="text"
                    placeholder="Busque por unidades de saúde, cidade ou serviços..."
                />
                <Button variant="secondary">
                    <MagnifyingGlassIcon size={24} weight="bold" />
                </Button>
            </div>
        </div>
    )
}

const heroSearchBarContainer = css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
})

const searchBarContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem 1rem',
    backgroundColor: 'background',
    padding: '.5rem',
    borderRadius: 'full',
    minWidth: { base: '100%', md: '700px' },
    paddingLeft: '1.5rem',

    '& input': {
        flex: 1,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        lineHeight: '1rem',
    },

    '& button': {
        backgroundColor: 'primary',
        color: 'white',
        padding: '.75rem',
        borderRadius: 'full',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',

        _hover: {
            backgroundColor: '#202020',
        },
    },
})
