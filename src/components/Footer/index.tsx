import { HeartIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import { Divider } from '../Divider'

export function Footer() {
    return (
        <div className={footerContainer}>
            <Divider />
            <section>
                <p>&copy; 2025 Scriptles</p>
                <p>
                    Feito com{' '}
                    <HeartIcon weight="fill" color="#FF3938" size={18} /> em
                    Brasília, Brasil
                </p>
            </section>
        </div>
    )
}

const footerContainer = css({
    width: '100%',
    padding: '1rem 0',
    paddingRight: '1rem',
    fontSize: '0.875rem',

    '& p': {
        color: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        gap: '.25rem',
        alignItems: 'initial',
    },

    '& a': {
        color: 'rgba(0, 0, 0, 0.5)',

        _hover: {
            textDecoration: 'underline',
        },
    },

    '& section': {
        width: '100%',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
    },
})
