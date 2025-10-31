import { css, cva } from '../../../styled-system/css'

export const markerContainer = cva({
    base: {
        background: 'linear-gradient(0deg, #91afc9ff 0%, #D5EBFE 100%)',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'md',
        border: '2px solid white',
        cursor: 'pointer',
        position: 'relative',

        '& svg': {
            fontSize: '1.5rem',
            color: 'white',
        },

        '& img': {
            scale: '1.25',
        },
    },
    variants: {
        type: {
            HOSPITAL: {
                background:
                    'linear-gradient(to bottom, #AE35FF 0%, #9900FF 100%)',
            },
            UBS: {
                background:
                    'linear-gradient(to bottom, #43ADFF 0%, #0090FF 100%)',
            },
            UPA: {
                background:
                    'linear-gradient(to bottom, #FF6A30 0%, #FF5310 100%)',
            },
        },
        size: {
            default: {},
            small: {
                width: '36px',
                height: '36px',
                border: '2px solid white',

                '& svg': {
                    fontSize: '1.25rem',
                },
            },
            large: {
                width: '64px',
                height: '64px',
                border: '3px solid white',
                cursor: 'default',

                '& svg': {
                    fontSize: '2rem',
                },
            },
        },
    },
})

export const labelStyles = css({
    position: 'absolute',
    bottom: '-50%',
    left: '50%',
    transform: 'translateX(-50%)',
    textShadow: `-1px -1px 0 #ffffffff,
                    1px -1px 0 #ffffffff,
                    -1px 1px 0 #ffffffff,
                    1px 1px 0 #ffffffff,
                    -2px 0px 0 #ffffffff,
                    2px 0px 0 #ffffffff,
                    0px -2px 0 #ffffffff,
                    0px 2px 0 #ffffffff`,
    fontWeight: 600,
    color: '#202020',
    textAlign: 'center',
    fontSize: '0.75rem',
    width: 'max-content',
    maxWidth: '30ch',
})
