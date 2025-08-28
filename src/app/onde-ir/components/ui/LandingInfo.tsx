import { Paragraph } from '@/components/Typography/Paragraph'
import { css } from '../../../../../styled-system/css'
import { CollapsibleInfo } from '../CollapsibleInfo'

export function LandingInfo() {
    return (
        <section className={landingInfoContainer}>
            <h2>Por que devo saber onde ir?</h2>
            <Paragraph>
                O GPT‑5 é mais inteligente em todos os parâmetros, oferecendo
                respostas mais úteis em matemática, ciências, finanças, direito
                e muito mais. É como ter uma equipe de especialistas à
                disposição para tudo que você quer saber.
            </Paragraph>
            <div>
                <CollapsibleInfo
                    title="Descubra para onde ir sem precisar sair de casa"
                    content="Descubra para onde ir sem precisar sair de casa."
                />
                <CollapsibleInfo
                    title="Ajuda a direcionar cada pessoa para o local certo"
                    content=""
                />
                <CollapsibleInfo
                    title="Evita filas e aglomerações"
                    content="Com a triagem, você chega no lugar certo de primeira"
                />
            </div>
        </section>
    )
}

// <div>
//     Responda algumas perguntas simples. Veja para onde deve ir:
//     Hospital, UPA ou UBS. Vá preparado com as informações certas.
// </div>
// <div>
//     “Todas as respostas são anônimas.” “Os dados não são
//     compartilhados.” “As orientações seguem protocolos do SUS.”
// </div>

const landingInfoContainer = css({
    bgColor: 'background',
    padding: '1rem',

    '& h2': {
        fontSize: '1.875rem',
        fontWeight: '550',
        marginBottom: '1rem',
        letterSpacing: 'tight',
        color: '#151515',
    },
})
