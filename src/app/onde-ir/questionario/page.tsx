import { BackButton } from '@/components/Button/BackButton'
import { Quiz } from './components/Quiz'

import { css } from '../../../../styled-system/css'
import { Paragraph } from '@/components/Typography/Paragraph'
import { InfoIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/Button'

export default function Page() {
    return (
        <div>
            <header
                className={css({
                    position: 'sticky',
                    top: 'header',
                    zIndex: 10,
                    padding: { base: '1rem', md: '0 0 .5rem 0' },
                    backgroundColor: 'white',
                })}
            >
                <BackButton />
            </header>
            <main
                className={css({
                    mt: '2rem',
                    display: { base: 'flex', md: 'grid' },
                    flexDirection: 'column',
                    gridTemplateColumns: '1fr 200px',
                    gap: '1rem',
                    padding: { base: '1rem', md: '0 0 1rem 0' },
                })}
            >
                <Quiz />
                <div>
                    <InfoIcon />
                    <Paragraph size="caption">
                        Este questionário é para ajudá-lo a encontrar o melhor
                        local para atendimento. Portanto ele não substitui uma
                        avaliação médica.
                    </Paragraph>
                    <Button variant="subtle">Reportar erro</Button>
                </div>
            </main>
        </div>
    )
}
