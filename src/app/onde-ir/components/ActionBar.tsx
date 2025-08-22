import { Button } from '@/components/Button'
import { ArrowRightIcon, CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'

export function ActionBar() {
    return (
        <section className={actionBarContainer}>
            <Button variant="secondary">
                Abrir questionário <ArrowRightIcon />
            </Button>
            <Button variant="subtle">
                Saiba mais <CaretDownIcon />
            </Button>
        </section>
    )
}

const actionBarContainer = css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center ',
    gap: '1rem',
    padding: '1rem 0',
})
