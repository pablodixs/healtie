import { css } from '../../../styled-system/css'

export const toolbarContainer = css({
    zIndex: 1,
    position: 'absolute',
    bottom: { md: '1.5rem', base: '70%' },
    right: '1.5rem',
    display: 'flex',
    flexDirection: {
        md: 'row',
        base: 'column',
    },
    gap: '0.5rem',
    padding: '0.25rem',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '9999px',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
})
