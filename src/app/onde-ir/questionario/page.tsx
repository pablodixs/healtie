import { BackButton } from '@/components/Button/BackButton'
import { Quiz } from './components/Quiz'

import { stack } from '../../../../styled-system/patterns'
import { css } from '../../../../styled-system/css'
import { Paragraph } from '@/components/Typography/Paragraph'

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
                    gridTemplateColumns: '1fr 300px',
                    gap: '1rem',
                    paddingRight: { base: 'inherit', md: '1rem' },
                    padding: { base: '1rem', md: '0' },
                })}
            >
                <Quiz />
                <div>
                    <Paragraph size="caption">
                        Este questionário é para ajudá-lo a encontrar o melhor
                        local para atendimento. Portanto ele não substitui uma
                        avaliação médica.
                    </Paragraph>
                </div>
            </main>
        </div>
    )
}
