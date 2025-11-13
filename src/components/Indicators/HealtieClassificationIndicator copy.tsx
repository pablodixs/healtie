import { GaugeIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import {
    titleContainer,
    barContainer,
    barFill,
    barBackground,
    descriptionContainer,
} from './styles'

export function HealtieClassificationIndicator() {
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
                    <GaugeIcon />
                    <p>Classificação do Healtie </p>
                </div>
                <strong>90</strong>
            </header>
            <div className={barContainer}>
                <div className={barFill} style={{ width: '90%' }} />
                <div className={barBackground} />
            </div>
            <footer className={descriptionContainer}>
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
                <span>60</span>
                <span>70</span>
                <span>80</span>
                <span>90</span>
                <span>100</span>
            </footer>
        </div>
    )
}
