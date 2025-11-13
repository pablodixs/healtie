import { TimerIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'

export function WaitTimeIndicator() {
    return (
        <div>
            <header className={titleContainer}>
                <div
                    className={css({
                        display: 'flex',
                        gap: '.5rem',
                        alignItems: 'center',
                        fontWeight: 500,
                    })}
                >
                    <TimerIcon />
                    <p>Tempo de Espera Médio</p>
                </div>
                <div
                    className={css({
                        display: 'flex',
                        flexDir: 'column',
                        alignItems: 'flex-end',
                    })}
                >
                    <strong>Alto</strong>
                    <span
                        className={css({
                            fontSize: '0.875rem',
                            color: 'neutral.500',
                        })}
                    >
                        Cerca de 2 horas
                    </span>
                </div>
            </header>
            <div className={barContainer}>
                <div
                    className={barFill}
                    style={{ background: 'red', width: '80%' }}
                />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>Baixo</span>
                <span>Alto</span>
            </footer>
        </div>
    )
}
