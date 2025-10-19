import { css } from '../../../styled-system/css'

export const mainContainer = css({
    position: 'relative',
    height: '100vh',
})

export const styles = css({
    position: 'absolute',
    top: {
        md: 'header',
    },
    bottom: {
        base: '4rem',
        md: 'inherit',
    },
    left: 0,
    right: {
        md: 'inherit',
        base: 0,
    },
    width: {
        md: '30%',
        base: '100%',
    },
    maxWidth: {
        md: '400px',
        base: '100%',
    },
    maxHeight: {
        md: 'calc(90dvh - 1rem)',
        base: '50%',
    },
    marginLeft: {
        md: '1rem',
        base: '0',
    },
    pt: {
        md: 'calc(42px + 1rem)',
    },
    minHeight: '74px',
    zIndex: 1,
    backgroundColor: 'white',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
    borderRadius: '32px',
    overflow: 'hidden',
})

export const contentContainer = css({
    maxH: 'calc(90dvh - 6rem)',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '1rem',
    position: 'relative',
    willChange: 'height, transform, opacity',
})

export const searchBarContainer = css({
    padding: '1rem',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    background:
        'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.1) 100%)',
    display: 'flex',
    gap: '.5rem',
})

export const errorStateContainer = css({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'background',
    zIndex: -1,
})
