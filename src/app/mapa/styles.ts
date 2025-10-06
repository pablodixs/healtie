import { css } from '../../../styled-system/css'

export const mainContainer = css({
    position: 'relative',
    height: '100vh',
})

export const styles = css({
    position: 'absolute',
    top: 'header',
    left: 0,
    width: '30%',
    maxWidth: '400px',
    maxHeight: 'calc(90dvh - 1rem)',
    zIndex: 1,
    backgroundColor: 'white',
    boxShadow: '0 0 0 1px rgba(0,0,0,0.05)',
    marginLeft: '1rem',
    borderRadius: '32px',
    overflow: 'hidden',
})

export const contentContainer = css({
    maxH: 'calc(90dvh - 6rem)',
    height: '100%',
    overflowY: 'auto',
    overflow: 'hidden',
    padding: '1rem',
    position: 'relative',
    pt: 'calc(42px + 1rem)',
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
