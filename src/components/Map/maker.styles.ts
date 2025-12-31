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
            'Hospital Geral': {
                background:
                    'linear-gradient(to bottom, #AE35FF 0%, #9900FF 100%)',
            },
            'Unidade Básica de Saúde': {
                background:
                    'linear-gradient(to bottom, #43ADFF 0%, #0090FF 100%)',
            },
            'Unidade de Pronto Atendimento': {
                background:
                    'linear-gradient(to bottom, #FF6A30 0%, #FF5310 100%)',
            },
        },
        size: {
            default: {},
            xs: {
                width: '1.125rem',
                height: '1.125rem',
                border: '1px solid white',

                '& svg': {
                    fontSize: '0.75rem',
                },
            },
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
        square: {
            true: {
                borderRadius: '50%',
                boxShadow: 'inherit',
                border: 'inherit',
            },
        },
        compacted: {
            true: {
                width: '14px',
                height: '14px',
                transition: 'all 0.3s ease-in-out',

                _hover: {
                    width: '42px',
                    height: '42px',
                    transition: 'all 0.3s  cubic-bezier(0.47,0,0.1,1.42)',

                    '& svg': {
                        transition: 'all 0.3s  cubic-bezier(0.47,0,0.1,1.42)',
                        scale: 1,
                    },
                },

                '& svg': {
                    transition: 'all 0.3s  cubic-bezier(0.47,0,0.1,1.42)',
                    scale: 0,
                },
            },
            false: {},
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
    // maxWidth: '30ch',
})
