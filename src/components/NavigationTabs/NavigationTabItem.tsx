import { css } from '../../../styled-system/css'

interface NavigationTabItemProps {
    title: string
    selectedTab?: boolean
    onSelectedChange?: () => void
    badge?: string
}

export function NavigationTabItem({
    title,
    selectedTab,
    onSelectedChange,
    badge,
}: NavigationTabItemProps) {
    return (
        <button
            className={navigationTabItemContainer}
            onClick={onSelectedChange}
            data-selected={selectedTab}
        >
            {title}
            {badge && (
                <span data-selected={selectedTab} className={badgeStyle}>
                    {badge}
                </span>
            )}
        </button>
    )
}

const navigationTabItemContainer = css({
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    fontSize: '0.9375rem',
    fontWeight: '450',
    color: 'neutral.500',
    paddingY: '.75rem',
    cursor: 'pointer',
    borderBottom: '2px solid',
    borderColor: 'transparent',
    transition: 'border-color 0.2s ease-in-out',
    marginBottom: '-1px',

    '&:hover': {
        color: 'primary',
    },

    _selected: {
        color: 'primary',
        borderBottomColor: 'primary',
    },
})

const badgeStyle = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'neutral.100',
    borderRadius: '12px',
    color: 'neutral.600',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '.25rem',
    height: '1.25rem',
    minWidth: '1.25rem',

    _selected: {
        backgroundColor: 'primary',
        color: 'white',
    },
})
