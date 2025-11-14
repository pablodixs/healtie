import { css } from '../../../styled-system/css'

export const titleContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: '.75rem',
    minHeight: '3.1875rem',

    '& svg': {
        fontSize: '1.5rem',
    },

    '& strong': {
        fontWeight: 550,
        letterSpacing: '-0.0375em',
        fontSize: '1.5rem',
        textAlign: 'right',
        lineHeight: '100%',
    },

    '& span': {
        textAlign: 'right',
    },
})

export const descriptionContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '.25rem',
    color: 'neutral.400',
    fontSize: '0.75rem',
    fontWeight: 450,
    userSelect: 'none',
})

export const barFill = css({
    position: 'absolute',
    height: '100%',
    background: 'greenHightlight',
    borderRadius: '4px',
    zIndex: 2,
})

export const barContainer = css({
    width: '100%    ',
    height: '20px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
})

export const barBackground = css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage:
        'repeating-linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 10.5px)',
})
