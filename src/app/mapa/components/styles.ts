import { css } from '../../../../styled-system/css'

export const featureImageStyles = css({
    width: '100%',
    height: '100px',
    borderRadius: '12px',
    marginTop: '1rem',
    objectFit: 'cover',
    aspectRatio: '16/9',
})

export const titleStyles = css({
    fontSize: '1.5rem',
    lineHeight: '120%',
    fontWeight: 550,
    color: 'primary',
    marginTop: '1rem',
    letterSpacing: '-0.025em',
})

export const locationParagraphStyles = css({})

export const actionsContainerStyles = css({
    marginY: '1rem',
    display: 'flex',
    gap: '.5rem',
})

export const indicatorsContainerStyles = css({
    fontSize: '1.125rem',
    lineHeight: '125%',
    fontWeight: 500,
    color: 'gray.500',
    marginY: '2.5rem',
    letterSpacing: '-0.025em',
    textAlign: 'center',
})

export const compactDetailsContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '1ch',
    fontSize: '0.875rem',
    color: 'gray.400',

    '& .highlight': {
        color: 'green.600',
        fontWeight: 450,
    },
})

export const detailsContainerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    fontSize: '0.875rem',
})

export const detailParagraphStyles = css({
    color: 'gray.400',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
})
