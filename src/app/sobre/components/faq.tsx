import { Subheading } from '@/components/Typography'
import { css } from '../../../../styled-system/css'
import { FAQOption } from './faq-option'

const faqQuestions = [
    {
        question: 'Onde o Healtie está disponível?',
        answer: 'No momento, o Healtie está disponível apenas no Distrito Federal e entorno. Estamos trabalhando para expandir nosso alcance para outras regiões em breve.',
    },
    {
        question:
            'Alguns dados estão incorretos ou imprecisos. O que está acontecendo?',
        answer: 'O Healtie ainda está em fase de desenvolvimento e aprimoramento. Estamos constantemente atualizando nossas informações para garantir a precisão dos dados fornecidos. Agradecemos seu feedback e estamos trabalhando para melhorar a qualidade das informações.',
    },
    {
        question: 'De onde o Healtie obtém as informações?',
        answer: 'O Healtie obtém suas informações de estabelecimentos de fontes oficiais, principalmente o DATASUS. Os Status dos Estabelecimentos são obtidos através de crowdsourcing (os usuários do Healtie reportam como foi sua passagem pelos estabelecimentos) através do nosso sistema de feedback. Nosso objetivo é garantir que os dados fornecidos sejam confiáveis e atualizados.',
    },
    {
        question: 'O Healtie foi desenvolvido pelo governo?',
        answer: 'Não, o Healtie é um projeto universitário desenvolvido por uma equipe de estudantes da Universidade Católica de Brasília para ajudar a democratizar as informações sobre os estabelecimentos de saúde. Embora não seja um projeto governamental, buscamos colaborar com instituições de saúde para garantir a qualidade e a relevância das informações fornecidas.',
    },
]

export function FAQ() {
    return (
        <section
            className={css({
                marginTop: '10rem',
                marginBottom: '3rem',
            })}
        >
            <Subheading size="xl" centered style={{ paddingBottom: '4rem' }}>
                Perguntas? Temos as respostas.
            </Subheading>
            {faqQuestions.map(({ question, answer }) => (
                <FAQOption key={question} question={question} answer={answer} />
            ))}
        </section>
    )
}
