export interface OptionQuestion {
    label: string
    description: string
    imageUrl?: string
    value: string
}

export interface Question {
    id: number
    question: string
    options: OptionQuestion[]
}

export const whereToGoQuestions: Question[] = [
    {
        id: 1,
        question: 'Você está com algum destes sintomas?',
        options: [
            {
                label: 'Falta de ar forte',
                description:
                    'Sensação intensa de falta de ar, dificuldade para respirar ou respirar muito rápido, mesmo em repouso.',
                value: 'hospital',
                imageUrl: '/images/questions/falta_de_ar.png',
            },
            {
                label: 'Dor no peito ou desmaio',
                description:
                    'Dor ou pressão no peito, palpitações, sensação de aperto ou episódios de desmaio ou quase desmaio.',
                value: 'hospital',
                imageUrl: '/images/questions/dor_no_peito.png',
            },
            {
                label: 'Sangramento que não para',
                description:
                    'Sangramento intenso ou que não estanca após alguns minutos de compressão, em qualquer parte do corpo.',
                value: 'hospital',
                imageUrl: '/images/questions/sangramento.png',
            },
            {
                label: 'Nenhum destes',
                description:
                    'Você não está com nenhum desses sintomas graves no momento.',
                value: 'next',
                imageUrl: '/images/questions/next.png',
            },
        ],
    },
    {
        id: 2,
        question: 'Algum destes sintomas está acontecendo com você?',
        options: [
            {
                label: 'Febre alta que não baixa',
                description:
                    'Febre persistente, mesmo após tomar antitérmico, ou que não cede há várias horas.',
                value: 'upa',
                imageUrl: '/images/questions/febre.png',
            },
            {
                label: 'Vômitos sem parar',
                description:
                    'Vômitos contínuos, sem conseguir manter líquidos ou alimentos no estômago.',
                value: 'upa',
                imageUrl: '/images/questions/vomitos.png',
            },
            {
                label: 'Dor forte que não melhora',
                description:
                    'Dor intensa que não alivia com repouso ou medicamentos comuns.',
                value: 'upa',
                imageUrl: '/images/questions/dor.png',
            },
            {
                label: 'Nenhum destes',
                description:
                    'Você não está apresentando nenhum desses sintomas no momento.',
                value: 'next',
                imageUrl: '/images/questions/next.png',
            },
        ],
    },
    {
        id: 3,
        question: 'Você precisa de algum desses serviços?',
        options: [
            {
                label: 'Consulta de rotina ou receita médica',
                description:
                    'Atendimento para consultas regulares ou emissão de receitas médicas.',
                value: 'ubs',
                imageUrl: '/images/questions/consulta_rotina.png',
            },
            {
                label: 'Vacina ou exame de rotina',
                description:
                    'Aplicação de vacinas ou realização de exames preventivos.',
                value: 'ubs',
                imageUrl: '/images/questions/vacinas.png',
            },
            {
                label: 'Sintomas leves como resfriado',
                description:
                    'Orientações e cuidados para sintomas leves, como tosse, coriza ou mal-estar.',
                value: 'ubs',
                imageUrl: '/images/questions/resfriado.png',
            },
            {
                label: 'Nenhum destes',
                description:
                    'Você não está precisando de nenhum desses serviços.',
                value: 'next',
                imageUrl: '/images/questions/next.png',
            },
        ],
    },
]
