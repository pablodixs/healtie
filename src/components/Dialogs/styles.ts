import { css } from '../../../styled-system/css'

export const dialogStyles = css({
    zIndex: 5001,
    padding: '1rem',
    borderRadius: '24px',
    minWidth: { base: '90%', md: '500px' },
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'white',
    overflow: 'hidden',
})

export const imageStyles = css({
    borderRadius: '12px',
    mb: '1rem',
})

export const footerStyles = css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '1rem',
    lineHeight: '90%',
})

export const privacyAdvice = css({
    display: 'flex',
    alignItems: 'center',
    gap: '.5ch',
    fontSize: '0.75rem',
    color: 'neutral.500',

    '& svg': {
        fontSize: '1rem',
    },

    '& a': {
        color: 'tint',
        textUnderlineOffset: '3px',

        _hover: {
            textDecoration: 'underline',
        },
    },
})

export const selectionWrapper = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    my: '2rem',

    '& select': {
        flex: 1,
        padding: '0.75rem 1rem',
        borderRadius: '9999px',
        backgroundColor: 'neutral.100',
        fontWeight: 500,
    },

    '& span': {
        color: 'neutral.500',
    },
})

export const overlay = css({
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    position: 'fixed',
    inset: 0,
    zIndex: 5000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    backdropFilter: 'blur(2px)',
})
