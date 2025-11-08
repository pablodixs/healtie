import { Quiz } from './components/Quiz'

import { css } from '../../../../styled-system/css'
import { InfoIcon } from '@phosphor-icons/react/dist/ssr'
import { Banner } from '@/components/Banner'

export default function Page() {
    return (
        <div>
            <main
                className={css({
                    mt: 'expandedHeader',
                })}
            >
                <Quiz />
                <Banner
                    style={{ marginTop: '1rem' }}
                    title="Informações Importantes"
                    message={
                        'Este questionário é para ajudá-lo a encontrar o melhor local para atendimento. Portanto ele não substitui uma avaliação médica.'
                    }
                    icon={<InfoIcon />}
                    actionLabel="Reportar erro"
                />
            </main>
        </div>
    )
}
