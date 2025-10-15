import { css } from '../../../styled-system/css'
import { Paragraph } from '../Typography'

export function AllowLocationDialog() {
    return (
        <dialog className={dialogContainer} open>
            <h1 className={headingStyle}>Permitir localização</h1>
            <Paragraph>
                Precisamos da sua permissão para acessar sua localização.
            </Paragraph>
        </dialog>
    )
}

const dialogContainer = css({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '1rem',
    borderRadius: '1.5rem',
    zIndex: 10000,
    width: '90%',
    backgroundColor: 'neutral.50',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
})

const headingStyle = css({
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginTop: '0.25rem',
})

const footerStyle = css({
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '1rem',
})
